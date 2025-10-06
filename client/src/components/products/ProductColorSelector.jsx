import React, { useState } from "react"
import styles from "./ProductColorSelector.module.css"

const ProductColorSelector = ({ colors = [], onSelect }) => {
    const [selectedColor, setSelectedColor] = useState(null)

    const handleSelect = (color) => {
        setSelectedColor(color)
        if (onSelect) onSelect(color)
    }

    return (
        <div className={styles.optionGroup}>
            <span className={styles.label}>Color</span>
            <div className={styles.colors}>
                {colors.map((color, idx) => (
                <button 
                    key={idx}
                    className={`${styles.color} ${selectedColor === color ? styles.active : ""}`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleSelect(color)}
                />
                ))}
            </div>
        </div>
    )
}

export default ProductColorSelector
