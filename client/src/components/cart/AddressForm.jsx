import React, { useState } from "react"
import Button from "../ui/Button"

const AddressForm = ({ initialData = {}, onSubmit, onCancel }) => {
    const safeData = initialData || {}
    const [form, setForm] = useState({
        full_name: safeData.full_name || "",
        phone: safeData.phone || "",
        province: safeData.province || "",
        district: safeData.district || "",
        ward: safeData.ward || "",
        address: safeData.address || "",
        is_default: safeData.is_default || false,
    })

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(form)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                placeholder="Full Name"
                className="form-control mb-2"
                required
            />
            <input 
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="form-control mb-2"
                required
            />
            <input 
                type="text"
                name="province"
                value={form.province}
                onChange={handleChange}
                placeholder="Province"
                className="form-control mb-2"
                required
            />
            <input 
                type="text"
                name="district"
                value={form.district}
                onChange={handleChange}
                placeholder="District"
                className="form-control mb-2"
                required
            />
            <input 
                type="text"
                name="ward"
                value={form.ward}
                onChange={handleChange}
                placeholder="Ward"
                className="form-control mb-2"
                required
            />
            <input 
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Street Address"
                className="form-control mb-2"
                required
            />
            <div className="form-check mb-2">
                <input
                    type="checkbox"
                    name="is_default"
                    checked={form.is_default}
                    onChange={handleChange}
                    className="form-check-input"
                    id="is_default"
                />
                <label htmlFor="is_default" className="form-check-label">Set as default</label>
            </div>

            <div className="d-flex justify-content-between">
                <Button className={`p-2`} type="submit">Save</Button>
                <Button className={`p-2`} type="button" onClick={onCancel}>Cancel</Button>
            </div>
        </form>
    )
}

export default AddressForm
