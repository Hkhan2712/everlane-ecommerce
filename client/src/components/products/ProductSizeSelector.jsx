import React, { useState } from "react"
import styles from "./ProductSizeSelector.module.css"

const ProductSizeSelector = ({ sizes = ["XS","S","M","L","XL","XXL"], onSelect }) => {
    const [selectedSize, setSelectedSize] = useState(null)

    const handleSelect = (size) => {
        setSelectedSize(size)
        if (onSelect) onSelect(size)
    }

    return (
        <div className={styles.optionGroup}>
            <div className={styles.sizeHeader}>
                <span className={styles.label}>Size</span>
                <a href="#" className={styles.sizeGuide}>Size Guide</a>
            </div>
            <div className={styles.sizes}>
                {sizes.map(size => (
                <button 
                    key={size} 
                    className={`${styles.size} ${selectedSize === size ? styles.active : ""}`}
                    onClick={() => handleSelect(size)}
                >
                    {size}
                </button>
                ))}
            </div>
        </div>
    )
}

export default ProductSizeSelector
