import styles from './ProductDetail.module.css'
import ProductInfo from '../../components/products/ProductInfo'
import { cloudinaryUrl } from '../../utils/cloudinary'
import { useEffect, useState } from 'react'
import ProductCard from "@/components/common/cards/ProductCard"
import TransparentPricing from '../../components/products/TransparentPricing'
import { PlaneIcon, BoxIcon, BoxSeam, ReceiptIcon, ScissorsIcon } from '../../components/icons'
import { useParams } from 'react-router-dom'
import LoadingOverlay from '../../components/ui/LoadingOverlay'

const ProductDetail = () => {
    const {slug} = useParams()
    const [product, setProduct] = useState(null)
    const [relatedProducts, setRelatedProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
    const fetchProduct = async () => {
        try {
            const res = await fetch(`/api/products/${slug}`)
            const data = await res.json()
            setProduct(data?.data || null)
        } catch (err) {
            console.error("Failed to fetch product:", err)
        } finally {
            setLoading(false)
        }
        }
        fetchProduct()
    }, [slug])

    useEffect(() => {
        const fetchRelatedProducts = async () => {
        try {
            const res = await fetch("/api/products?limit=4")
            const data = await res.json()
            setRelatedProducts(data?.data || [])
        } catch (err) {
            console.error("Failed to fetch related products:", err)
        }
        }
        fetchRelatedProducts()
    }, [])

    if (!product) return <div className="text-center p-5">Product not found</div>
        
    return (
        <>
        {loading ?? <LoadingOverlay />}
        <section className={styles.productDetail}>
        {/* Gallery bên trái */}
        <div 
            className={`${styles.gallery} ${styles[`gallery--count-${product.thumbnails?.length || 0}`]}`}
        >
        {product.thumbnails?.map((publicId, idx) => (
            <div key={idx} className={styles.galleryItem}>
            <img 
                src={cloudinaryUrl(
                publicId, 
                product.thumbnails.length <= 2 ? 800 : 412,
                product.thumbnails.length <= 2 ? 1000 : 508
                )} 
                alt={`${product.name} ${idx}`} 
            />
            </div>
        ))}
        </div>



        {/* Product Info bên phải */}
        <ProductInfo
            id={product.id}
            breadcrumb={["Men", "Shirts"]}
            name={product.name}
            salePrice={product.sale_price}
            originalPrice={product.original_price}
            tags={product.tags}
        />
        {/* Recommend products */}
        </section>
        <section className={styles.recommend}>
            <h3 className="d-flex justify-content-center pb-2">You may also like</h3>
            <div className={`${styles.recommendGrid} d-flex justify-content-center`}>
            {relatedProducts.length > 0 ? (
                relatedProducts.map((item) => (
                <ProductCard key={item.id} {...item} />
                ))
            ) : (
                <>Loading...</>
            )}
            </div>
        </section>
        <TransparentPricing 
            costs={[
                { icon: <BoxIcon width={56} color="currentColor"/>, label: "Materials", amount: 47.96 },
                { icon: <ScissorsIcon width={56} color="currentColor"/>, label: "Hardware", amount: 5.74 },
                { icon: <BoxSeam width={56} color="currentColor"/>, label: "Labor", amount: 13.75 },
                { icon: <ReceiptIcon width={56} color="currentColor"/>, label: "Duties", amount: 8.09 },
                { icon: <PlaneIcon width={56} color="currentColor"/>, label: "Transport", amount: 1.53 },
            ]}
        />
        </>
    )
}

export default ProductDetail