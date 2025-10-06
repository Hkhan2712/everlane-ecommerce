import React, { useState, useEffect, useRef } from 'react';
import {
    SearchIcon,
    AccountIcon,
    CartIcon
} from '@/components/icons'
import Cart from '../Cart'
import { useUI } from '@/hooks/useUI'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../ui/Button'
import { BagIcon, CirclePersonIcon, SignOutIcon } from '../../icons'
import { useAuth } from '../../../contexts/AuthContext'
import UserDropdown from './UserDropdown';

const UserActions = () => {
    const {signOut} = useAuth()
    const [showCart, setShowCart] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const [user, setUser] = useState(null)
    const { setIsSearchOpen } = useUI(); 
    const navigate = useNavigate()
    const dropdownRef = useRef(null)

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) setUser(JSON.parse(storedUser))
    }, [])

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropdown(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const toggleCart = () => setShowCart(!showCart)

    const handleSignOut = async () => {
        await signOut()
        setUser(null)
        navigate('/')
    }

    return (
        <div className="d-flex align-items-center gap-3 position-relative">
            <button 
                className="btn p-0 border-0 bg-transparent" 
                aria-label="Search"
                onClick={() => setIsSearchOpen(true)}
            >
                <SearchIcon width="22" />
            </button>

            <button
                className="btn p-0 border-0 bg-transparent"
                aria-label="Cart"
                onClick={toggleCart}
            >
                <CartIcon width="22" />
            </button>
            <Cart show={showCart} onHide={toggleCart} />

            {user ? (
                <div 
                    className="position-relative" 
                    ref={dropdownRef}
                    onMouseEnter={() => setShowDropdown(true)}
                    onMouseLeave={() => setShowDropdown(false)}
                >
                    <button
                        className="btn p-0 border-0 bg-transparent"
                        aria-label="Account" href="/profile"
                    >
                        <AccountIcon width="24" />
                    </button>
                    <UserDropdown show={showDropdown} onSignOut={handleSignOut}/>
                </div>
            ) : (
                <div className="d-flex gap-2">
                    <Button as="link" to="/sign-in">Sign In</Button>
                    <Button as="link" to="/sign-up" className="border border-dark">Sign Up</Button>
                </div>
            )}

        </div>
    )
}

export default UserActions
