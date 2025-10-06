import React, { useState } from "react"
import { toast } from "react-toastify"
import api from "../../api"
import Button from "../ui/Button"

const Checkout = ({ total, items }) => {
    const [method, setMethod] = useState("COD")

    const handleCheckout = async () => {
        try {
        await api.post("/checkout", { method, items })
        toast.success("Ordered successfully!")
        } catch {
        toast.error("Failed to payment")
        }
    }

    return (
        <div className="card p-3 shadow-sm">
        <h5 className="mb-3">Payment</h5>

        <div className="form-check">
            <input
                className="form-check-input"
                type="radio"
                name="payment"
                id="cod"
                value="COD"
                checked={method === "COD"}
                onChange={() => setMethod("COD")}
            />
            <label className="form-check-label" htmlFor="cod">
                Cash on Delivery
            </label>
        </div>

        <div className="form-check">
            <input
                className="form-check-input"
                type="radio"
                name="payment"
                id="online"
                value="ONLINE"
                checked={method === "ONLINE"}
                onChange={() => setMethod("ONLINE")}
                />
                <label className="form-check-label" htmlFor="online">
                Online Payment
                </label>
        </div>

        <Button 
            className={`mt-2`}
            onClick={handleCheckout}
            disabled={items.length === 0}
        >
            Order Now (${total.toLocaleString()})
        </Button>
        </div>
    )
}

export default Checkout
