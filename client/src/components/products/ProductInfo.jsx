import { LeafIcon, RecycleIcon, StarFillIcon } from "../icons"
import styles from "./ProductInfo.module.css"
import Button from "../ui/Button"
import ProductService from "./ProductService"
import ProductSizeSelector from "./ProductSizeSelector"
import ProductColorSelector from "./ProductColorSelector"
import { useCart } from "../../contexts/CartContext"
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom"

const ProductInfo = ({id, breadcrumb, name, salePrice, originalPrice }) => {
    const {addToCart} = useCart()
    const navigate = useNavigate()
    const user = localStorage.getItem("user")
    const handleAddToCart = async () => {
        if (!user) {
            navigate("/sign-in")
            return
        }
        try {
            await addToCart(id, 1)
        } catch {
            toast.error("Failed To add item to bag")
        }
    }
    return (
        <div className={styles.productInfo}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
            {breadcrumb.join(" / ")}
        </div>

        {/* Name and Price */}
        <div className="d-flex justify-content-between">
            <h1 className={styles.productName}>{name}</h1>
            <div className={styles.price}>
                <span className={styles.original}>${originalPrice}</span>
                <span className={styles.sale}>${salePrice}</span>
            </div>
        </div>

        {/* Rating */}
        <div className={styles.rating}>
            <div className="d-flex gap-1">
                <StarFillIcon width={12} />
                <StarFillIcon width={12} />
                <StarFillIcon width={12} />
                <StarFillIcon width={12} />
                <StarFillIcon width={12} />
            </div>
            <span style={{color: "#888"}}>5.0 (2 Reviews)</span>
        </div>

        <hr />

        {/* Color Options */}
        <ProductColorSelector 
            colors={["#0a2342", "#6b4226", "#d7263d"]}
            onSelect={(color) => console.log("Selected Color: ", color)}
        />

        {/* Size Options */}
        <ProductSizeSelector onSelect={(size) => console.log("Selected size:", size)}/>

        {/* Add To Bag */}
        <Button onClick={handleAddToCart}>ADD TO BAG</Button>
        
        <hr/>
        {/* Service Info */}
        <ProductService />
        <hr />

        {/* Product Description */}
        <div className={styles.description}>
            <h5 className="mb-3 fs-5 text-black">Part shirt, part jacket, all style.</h5>
            <p>
            Meet your new chilly weather staple. The ReWool® Oversized Shirt Jacket has all the classic shirt detailing—collar, cuffs with buttons, and a shirttail hem, along with two front chest flap pockets and on-seam pockets. The sleeves are fully lined for added warmth and it’s made with a GRS-certified recycled Italian Wool and GRS-certified recycled nylon blend. Think cozy, comfy, and oh-so easy to layer. With the goal of increasing the use of recycled materials and reducing the harmful impacts of production, the Global Recycled Standard (GRS) sets requirements for third-party certification of recycled input in products—including chain of custody, social and environmental practices, and chemical restrictions.
            </p>
        </div>
        <hr className="m-0"/>
        <div className="d-flex justify-content-between align-items-center">
            <h5 className="fs-5 text-black">Models</h5>
            <p className="m-0">Model is 6'2", wearing a size M</p>
        </div>
        <hr className="m-0"/>
        <div className="d-flex flex-column">
            <h5 className="fs-5 text-black mb-2">Sustainability</h5>
            <div className="d-flex justify-content-between">
                <div className="d-flex gap-2 align-items-center">
                    <RecycleIcon width={32} color="#888"/>
                    <div className="fs-6">RENEWED MATERIALS</div>
                </div>
                <div className="d-flex gap-2 align-items-center">
                    <LeafIcon width={32} color="#888" />
                    <div className="fs-6">CLEANER CHEMISTRY</div>
                </div>
            </div>
        </div>
        <hr className="m-0"/>
        </div>
    )
}

export default ProductInfo
