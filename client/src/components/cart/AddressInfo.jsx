import React, { useState } from "react"
import Button from "../ui/Button"
import AddressForm from "./AddressForm"

const AddressInfo = ({ address, onSave }) => {
    const [editing, setEditing] = useState(false)

    const handleSubmit = (formData) => {
        onSave(formData)
        setEditing(false)
    }

    if (!editing) {
        return (
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="mb-3">Shipping Address</h5>
                    {address ? (
                        <p>
                            <b>{address.full_name}</b> ({address.phone}) <br/>
                            {address.address}, {address.ward}, {address.district}, {address.province}
                            {address.is_default ? <span className="badge bg-dark ms-2">Default</span> : null}
                        </p>
                    ) : (
                        <p>No address found</p>
                    )}
                    <Button className="p-2" onClick={() => setEditing(true)}>
                        {address ? "Change" : "Add Address"}
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">{address ? "Edit Address" : "Add Address"}</h5>
                <AddressForm 
                    initialData={address} 
                    onSubmit={handleSubmit} 
                    onCancel={() => setEditing(false)} 
                />
            </div>
        </div>
    )
}

export default AddressInfo
