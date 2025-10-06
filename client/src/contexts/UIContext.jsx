import { createContext, useState } from "react";

export const UIContext = createContext()

export const UIProvider = ({children}) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    // new state
    const [activeMenu, setActiveMenu] = useState("Women")

    return (
        <UIContext.Provider value={{ isSearchOpen, setIsSearchOpen, loading, setLoading, activeMenu, setActiveMenu}}>
            {children}
        </UIContext.Provider>
    )
}