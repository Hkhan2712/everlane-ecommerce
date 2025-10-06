import { useEffect, useState } from "react"
import api from "../../api"
import LoadingOverlay from "../ui/LoadingOverlay"
import Button from "../ui/Button"
import AddressForm from "../cart/AddressForm"
import ConfirmDialog from "../common/ConfirmDialog"

const AddressList = () => {
    const [addresses, setAddresses] = useState([])
    const [loading, setLoading] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [editData, setEditData] = useState(null)
    const [confirmDialog, setConfirmDialog] = useState({ show: false, id: null })

    const fetchAddresses = async () => {
        try {
            setLoading(true)
            const res = await api.get("/address")
            setAddresses(res.data?.data ?? [])
        } catch (err) {
            console.error("Error fetching addresses:", err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAddresses()
    }, [])

    const handleDeleteClick = (id) => {
        setConfirmDialog({ show: true, id })
    }

    const confirmDelete = async () => {
        try {
            await api.delete(`/address/${confirmDialog.id}`)
            setAddresses(addresses.filter((a) => a.id !== confirmDialog.id))
        } catch (err) {
            console.error("Error deleting address:", err)
        } finally {
            setConfirmDialog({ show: false, id: null })
        }
    }

    const handleSubmit = async (formData) => {
        try {
            if (editData) {
                const res = await api.put(`/address/${editData.id}`, formData)
                setAddresses(addresses.map((a) => (a.id === editData.id ? res.data.data : a)))
            } else {
                const res = await api.post("/address", formData)
                setAddresses([...addresses, res.data.data])
            }
            setShowForm(false)
            setEditData(null)
        } catch (err) {
            console.error("Error saving address:", err)
        }
    }
    
    return (
        <div>
            <h4 className="mb-3">Your Addresses</h4>
            {loading && <LoadingOverlay />}

            {!loading && addresses.length === 0 && <p>No address found. Add one!</p>}

            <ul className="list-group mb-3">
                {addresses.map((addr) => (
                    <li key={addr.id} className="list-group-item d-flex justify-content-between align-items-start">
                        <div>
                            <strong>{addr.full_name}</strong> <br />
                            {addr.address}, {addr.ward}, {addr.district}, {addr.province} <br />
                            Phone: {addr.phone} <br />
                            {addr.is_default ? (
                                <span className="badge bg-dark">Default</span>
                            ) : null}
                        </div>
                        <div>
                            <button className="btn btn-sm btn-outline-primary me-2" onClick={() => { setEditData(addr); setShowForm(true) }}>
                                Edit
                            </button>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteClick(addr.id)}>
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {!showForm && (
                <Button className={`p-2 mb-2`} onClick={() => setShowForm(true)}>
                    Add New Address
                </Button>
            )}

            {showForm && (
                <div className="border rounded p-3">
                    <AddressForm
                        initialData={editData}
                        onSubmit={handleSubmit}
                        onCancel={() => {
                            setShowForm(false)
                            setEditData(null)
                        }}
                    />
                </div>
            )}

            <ConfirmDialog
                show={confirmDialog.show}
                title="Confirm Delete"
                message="Are you sure you want to delete this address?"
                onConfirm={confirmDelete}
                onCancel={() => setConfirmDialog(false)}
            />

        </div>
    )
}

export default AddressList