import styles from './ProductCard.module.css'
import { Link } from "react-router-dom"
import { cloudinaryUrl } from "@/utils/cloudinary"
import SaleBadge from "../../ui/SaleBadge"
import ProductTag from "../../ui/ProductTag"
import Button from '../../ui/Button'
import { useCart } from '../../../contexts/CartContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ProductCard = ({ 
	id,
	name,
	slug,
	original_price,
	thumbnail,

	sale_price,
	tags = [],
	colors = [],
}) => {
	const {addToCart} = useCart()

	const user = localStorage.getItem("user")
	
	const navigate = useNavigate()

	let imageUrl = null;
	
	(thumbnail) ? imageUrl = cloudinaryUrl(thumbnail, 330, 483) : ''
	let discount = null
	if (original_price && sale_price && original_price > sale_price) 
		discount = Math.round(((original_price - sale_price)/ original_price) * 100)

	const handleAddToCart = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (!user) {
            navigate("/sign-in")
            return
        }
		await addToCart(id, 1)
    }

	return (
		<Link to={`/products/${slug}`} className={`product-card ${styles.productCard} text-start position-relative text-decoration-none text-dark`}>
			{/* Discount badge */}
			{discount && <SaleBadge text={`${discount}% off`}/>}

			<div className={styles.imageWrapper}>
				{/* <Link to={`/products/${slug}`} className="text-decoration-none text-dark"> */}
					<img src={imageUrl} alt={name} className="mb-2 img-fluid" />
				{/* </Link> */}

				{/* Overlay component */}
				<div className={styles.overlay}>
					<Button 
						onClick={(e) => {
							e.preventDefault()
							e.stopPropagation()
							console.log("Buy")
						}} 
						className="border-0">
							Buy Now
					</Button>
					<Button 
						onClick={handleAddToCart}
						className="border-0"
						>
					Add To Bag
					</Button>
				</div>
			</div>

			<div className="d-flex justify-content-between align-items-center">
				<h6 className="mb-0 text-truncate">{name}</h6>
				<div className="d-flex align-items-center">
					{original_price && (
						<span className="text-muted text-decoration-line-through me-2 small">
							${original_price}
						</span>
					)}
					<span className="fw-semibold">${sale_price}</span>
				</div>
			</div>

			{tags && tags.length > 0 && (
				<div className="mt-2">
					{tags.map((t, i) => (
						<ProductTag key={i} text={t} />
					))}
				</div>
			)}

			{colors && <div className="small text-muted mt-1">{colors}</div>}

			{colors.length > 0 && (
				<div className="d-flex gap-2 mt-2">
					{colors.map((c, i) => (
						<button
							key={i}
							className="rounded-circle border border-2"
							style={{
								width: "20px",
								height: "20px",
								backgroundColor: c,
							}}
						/>
					))}
				</div>
			)}
		</Link>
	)
}

export default ProductCard
