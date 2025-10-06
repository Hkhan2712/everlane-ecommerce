import React, { useState } from "react"
import styles from "./styles.module.css"
import { FacebookIcon, GoogleIcon, LinkedInIcon, EyeIcon, EyeSlashIcon } from "../../components/icons"
import { Link, useNavigate } from "react-router-dom"
import Button from '@/components/ui/Button'
import { cloudinaryUrl } from "../../utils/cloudinary"
import { useAuth } from "../../contexts/AuthContext"
import LoadingOverlay from "../../components/ui/LoadingOverlay"

const SignUp = () => {
    const [state, setState] = useState({ name: "", email: "", password: "" })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()
    const {signUp} = useAuth()

    const handleChange = (e) => setState({ ...state, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setLoading(true)
        const result = await signUp(state)
        
        if (result.success) {
            navigate("/")
        } else {
            setError(result.message)
        }

        setLoading(false)
    }

    const imageId = "hero-section_fk9w6a"
    const imageUrl = cloudinaryUrl(imageId, 400, 500)

    return (
        <div className={`d-flex justify-content-center align-items-center vh-100 bg-light`}>
            {loading ?? <LoadingOverlay />}
            <div className={styles.container}>
                <div className={`${styles.left} d-flex flex-column justify-content-center align-items-center gap-3`}>
                    <h2 className={styles.title}>Sign Up</h2>

                    <div className={styles.socialContainer}>
                        <Link to="#" className={styles.socialIcon}><FacebookIcon width={16} color=""/></Link>
                        <Link to="#" className={styles.socialIcon}><GoogleIcon width={16} color=""/></Link>
                        <Link to="#" className={styles.socialIcon}><LinkedInIcon width={16} color=""/></Link>
                    </div>

                    <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
                        {error && <p className="text-danger">{error}</p>}
                        <div className={`form-group ${styles.formGroup}`}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                name="name"
                                value={state.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={`form-group ${styles.formGroup}`}>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                name="email"
                                value={state.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={`form-group position-relative ${styles.formGroup}`}>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="password"
                                value={state.password}
                                onChange={handleChange}
                                required
                            />
                            <span 
                                className={styles.passwordToggle}
                                onClick={() => setShowPassword(prev => !prev)}
                                style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", cursor: "pointer" }}
                            >
                                {showPassword ? <EyeIcon width={18}/> : <EyeSlashIcon width={18}/>}
                            </span>
                        </div>
                        <Button 
                            type="submit" 
                            disabled={loading}  
                            className="border border-dark mt-4">
                            Sign Up
                        </Button>
                        <p className="mt-3 small text-center">
                            Already have an account? <Link className="text-black" to="/sign-in">Sign In</Link>
                        </p>
                    </form>
                </div>
                <div className={styles.right}>
                    <img 
                        src={imageUrl}
                        alt="Sign Up illustration" 
                        className={styles.image}
                    />
                </div>
            </div>
        </div>
    )
}

export default SignUp
