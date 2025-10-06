import React from "react"
import { createPortal } from "react-dom"
import styles from "./ConfirmDialog.module.css"

const ConfirmDialog = ({ show, title, message, onConfirm, onCancel }) => {
    if (!show) return null

    return createPortal(
        <div className={styles.backdrop}>
            <div className={styles.dialog}>
                {title && (
                    <div className={styles.header}>
                        <h5>{title}</h5>
                        <button className={`btn-close`} onClick={onCancel}></button>
                    </div>
                )}
                <div className={styles.body}>
                    <p>{message}</p>
                </div>
                <div className={styles.footer}>
                    <button className="btn btn-outline-secondary" onClick={onCancel}>
                        Cancel
                    </button>
                    <button className="btn btn-danger" onClick={onConfirm}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>,
        document.body
    )
}

export default ConfirmDialog
