import React from "react"
import styles from "./LoadingOverlay.module.css"

const LoadingOverlay = () => {
    return (
        <div className={styles.overlay}>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default LoadingOverlay
