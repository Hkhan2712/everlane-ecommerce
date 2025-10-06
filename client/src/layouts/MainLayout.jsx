// layouts/Layout.jsx
import { Outlet } from "react-router-dom"
import { Header } from "../components/common/Header/Header"
import { Footer } from "../components/common/Footer/Footer"
import SearchOverlay from "../components/common/Search/SearchOverlay"
import { useUI } from "@/hooks/useUI"
import { useEffect, useRef, useState } from "react"
import LoadingOverlay from "../components/common/LoadingOverlay"
import RouteLoadingHandler from "./RouteLoadingHandler"
import useCloseOverlayOnRouteChange from "../hooks/useCloseOverlayOnRouteChange"

export const MainLayout = () => {
    const { isSearchOpen, loading } = useUI()
    const headerRef = useRef(null)
    const [headerHeight, setHeaderHeight] = useState(0)

    useCloseOverlayOnRouteChange()

    useEffect(() => {
        if (headerRef.current) {
            setHeaderHeight(headerRef.current.getBoundingClientRect().height)
        }
        const handleResize = () => {
        if (headerRef.current)
            setHeaderHeight(headerRef.current.getBoundingClientRect().height)
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <>
            <div ref={headerRef}>
                <Header />
            </div>

            <main>
                <Outlet /> {/* render children */}
            </main>

            <Footer />

            {/* Search Overlay */}
            {isSearchOpen && <SearchOverlay topOffset={headerHeight} />}

            {/* Route Loading Handler */}
            <RouteLoadingHandler />

            {/* Preloading Overlay */}
            {loading && <LoadingOverlay />}
        </>
    )
}