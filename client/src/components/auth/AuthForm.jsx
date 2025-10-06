import React, { useState } from "react"
import Button from "../ui/Button"
import { EyeIcon, EyeSlashIcon } from "../icons"
const AuthForm = ({ type = "signIn", onSubmit, loading, error }) => {
    const [state, setState] = useState({ name: "", email: "", password: "" })
    const [showPassword, setShowPassword] = useState(false)

    const handleChange = (e) =>
        setState({ ...state, [e.target.name]: e.target.value })

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(state)
    }

    return (
        <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
            {error && <p className="text-danger">{error}</p>}

            {/* Name field chỉ hiển thị khi signUp */}
            {type === "signUp" && (
                <div className="form-group mb-3 w-100">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Full Name"
                        name="name"
                        value={state.name}
                        onChange={handleChange}
                        required
                    />
                </div>
            )}

            <div className="form-group mb-3 w-100">
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

            <div className="form-group position-relative mb-3 w-100">
                <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    value={state.password}
                    onChange={handleChange}
                    required
                />
                <span
                    style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                    }}
                    onClick={() => setShowPassword((prev) => !prev)}
                >
                    {showPassword ? <EyeIcon width={18} /> : <EyeSlashIcon width={18} />}
                </span>
            </div>

            <Button type="submit" className="border border-dark mt-2 w-100" disabled={loading}>
                {type === "signUp" ? "Sign Up" : "Sign In"}
            </Button>
        </form>
    )
}

export default AuthForm
