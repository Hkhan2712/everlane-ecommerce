import { useEffect, useState } from 'react'
import api from '../../api'
import { toast } from 'react-toastify'
import LoadingOverlay from '../ui/LoadingOverlay'
import Button from '../ui/Button'

const PersonalInfo = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
    })   

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true)
                const res = await api.get("/users/profile")
                const data =  res.data?.data ?? res.data
                setForm({
                    name: data.name || "",
                    email: data.email || "",
                    phone: data.phone || ""
                })
            } catch (err) {
                console.error("Error fetching profile:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchProfile()
    }, [])

    const handleChange = (e) => {
        const {name, value} = e.target
        setForm({...form, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault() 
        try {
            setLoading(true)
            await api.put("/users/profile", form)
            toast.success("Profile updated Successfully!")
        } catch (err) {
            console.error("Error updating profile:", err)
            toast.error("Updated failed, please try again")
        } finally {
            setLoading(false)
        }
    } 

    return (
        <div>
            <h4 className="mb-3">Personal Information</h4>
            {loading && <p>Loading...</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={form.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        disabled
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                    />
                </div>
                <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save Changes"}
                </Button>
            </form>
            {loading && <LoadingOverlay />}
        </div>
    )

}

export default PersonalInfo