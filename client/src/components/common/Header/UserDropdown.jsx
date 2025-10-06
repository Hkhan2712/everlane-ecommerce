import React from "react"
import Button from "../../ui/Button"
import { CirclePersonIcon, SignOutIcon, ReceiptIcon } from "../../icons"  

const UserDropdown = ({show, onSignOut}) => {
    if (!show) return null

    return (
        <div 
            className="position-absolute bg-white border rounded shadow-sm"
            style={{ right: 0, top: '100%', minWidth: '180px', zIndex: 1000 }}
        >
            <Button 
                as="link" 
                to="/profile" 
                className="dropdown-item d-flex align-items-center gap-2"
            >
                <CirclePersonIcon width={18} color="currentColor"/> Your profile
            </Button>

            <Button 
                as="link" 
                to="/orders" 
                className="dropdown-item d-flex align-items-center gap-2"
            >
                <ReceiptIcon width={18} color="currentColor"/> Your orders
            </Button>

            <Button 
                onClick={onSignOut} 
                className="dropdown-item d-flex align-items-center gap-2"
            >
                <SignOutIcon width={18} color="currentColor"/> Sign out
            </Button>
        </div>
    )
}

export default UserDropdown