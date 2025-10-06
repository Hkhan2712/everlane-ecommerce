import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f6f5f7"
        }}>
        <Outlet /> {/* Render AuthPage */}
        </div>
    )
}

export default AuthLayout