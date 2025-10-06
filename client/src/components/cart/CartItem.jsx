import React from "react"
import { Link } from "react-router-dom"
import styles from './CartItem.module.css'
import { cloudinaryUrl } from "../../utils/cloudinary"
import Button from "../ui/Button"
import { TrashIcon } from "../icons"
import QuantityBar from "./QuantityBar"
import PriceDisplay from "../ui/PriceDisplay"
import { toast } from "react-toastify"

const CartItem = ({ item, onRemove, onIncrease, onDecrease }) => {
    const {
        id, product_name, slug,
        original_price,
        sale_price,
        product_thumbnail,
        tags = [],
        quantity = 1
    } = item

    const imageUrl = cloudinaryUrl(product_thumbnail, 70, 100)
    const handleRemoveItem = async () => {
        try {
            await onRemove(id)
            toast.success("Deleted item from bag successfully!")
        } catch {
            toast.error("Failed To remove item from bag")
        }
    }

    return (
    <div className={`d-flex mb-3 ${styles.cartItem}`}>
        {/* Thumbnail */}
        <Link to={`/products/${slug}`}>
            <img
            src={imageUrl}
            alt={product_name}
            className="me-3 h-100"
            style={{ width: "80px", height: "80px", objectFit: "cover" }}
            />
        </Link>

        {/* Info */}
        <div className="flex-grow-1">
            {/* Top row: name/tags + remove */}
            <div className="d-flex justify-content-between align-items-start mb-2">
            <div>
                <h6 className="mb-1">{product_name}</h6>
                {tags.length > 0 && (
                <div>
                    {tags.map((t, i) => (
                    <span
                        key={i}
                        className="bg-light text-muted me-1"
                        style={{ fontSize: "0.75rem" }}
                    >
                        {t}
                    </span>
                    ))}
                </div>
                )}
            </div>
            <Button style={{padding: ".5rem .5rem"}} className={`border-0`} onClick={handleRemoveItem}>
                <TrashIcon color="currentColor" width={22}/>
            </Button>
            </div>

            {/* Bottom row: price + quantity */}
            <div className="d-flex justify-content-between align-items-center">
            {/* Prices */}
            <PriceDisplay 
                original={original_price}
                sale={sale_price}
            />

            {/* Quantity controls */}
            <QuantityBar quantity={quantity} onDecrease={onDecrease} onIncrease={onIncrease}/>
            </div>
        </div>
    </div>
    )
}

export default CartItem
