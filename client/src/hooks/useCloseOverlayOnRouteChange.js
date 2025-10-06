import { useLocation } from "react-router-dom"
import { useUI } from "./useUI"
import { useEffect } from "react"

const useCloseOverlayOnRouteChange = () => {
    const {setIsSearchOpen} = useUI()
    const location = useLocation()

    useEffect(() => {
        setIsSearchOpen(false)
    }, [location.pathname, setIsSearchOpen])
}

export default useCloseOverlayOnRouteChange