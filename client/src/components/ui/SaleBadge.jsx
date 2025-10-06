import React from "react"
import styles from "./SaleBadge.module.css"
const SaleBadge = ({text = "", className=""}) => {
    return (
        <div className={`${styles.badge} ${className}`}>
            {text}
        </div>
    )
}

export default SaleBadge