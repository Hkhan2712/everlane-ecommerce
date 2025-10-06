import styles from "./ProductOverlay.module.css"
import Button from "./Button"

const ProductOverlay = ({onBuyNow, onAddToBag}) => {
    return (
        <div className={styles.overlay}>
            <Button as="button" onClick={onBuyNow}>Buy Now</Button>
            <Button as="button" onClick={onAddToBag}>Add to Bag</Button>
        </div>
    )
}

export default ProductOverlay