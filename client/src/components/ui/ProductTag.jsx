import styles from "./ProductTag.module.css"

const ProductTag = ({ text }) => {
    return (
        <span className={styles.tag}>
            {text}
        </span>
    )
}

export default ProductTag