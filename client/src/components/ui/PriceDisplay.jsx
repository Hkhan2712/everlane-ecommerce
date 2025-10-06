// components/ui/PriceDisplay.jsx
import React from "react"

const PriceDisplay = ({ original, sale, currency = "$", className }) => {
    let discount = null
    if (original && sale && Number(original) > Number(sale)) {
        discount = Math.round(((original - sale) / original) * 100)
    }
    
    return (
        <div className={`d-flex flex-column gap-2 justify-content-center align-items-center ${className ?? ""}`}>
            <div className={`d-flex align-items-center`}>
                {original && (
                <span className="text-muted text-decoration-line-through me-2 small">
                {currency}{original}
                </span>
            )}
            <span className="fw-bold">{currency}{sale}</span>
            </div>
            {discount && (
                <span className="badge bg-danger">{discount}% off</span>
            )}
        </div>
    )
}

export default PriceDisplay
