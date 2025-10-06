import { useState } from "react"
import MainNav  from "./MainNav"
import SubNav from "./SubNav"
import TopBar from "./TopBar"
import MegaMenu from "./MegaMenu"

const menuData = {
    Women: {
        highlights: ["New Jackets", "Shirts", "Pants", "Sale Under $50"],
        featured: ["Performance Denim", "Capsule Wardrobe"],
        images: [
            { src: "/images/women1.jpg", title: "The Holiday Outfit Edit" },
            { src: "/images/women2.jpg", title: "Giftable Sweaters" },
        ],
    },
    Men: {
        highlights: [
            "Shop All New Arrivals",
            "The Gift Guide",
            "New Bottoms",
            "New Tops",
            "T-Shirt Bundles",
            "Under $100",
        ],
        featured: [
            "The Holiday Outfit Edit",
            "Giftable Sweaters",
            "Uniform & Capsule",
            "The Performance Chino Shop",
            "Top Rated Men's Clothing",
        ],
        images: [
            { src: "/images/men1.jpg", title: "Performance Denim" },
            { src: "/images/men2.jpg", title: "Capsule Wardrobe" },
        ],
    },
}

export const Header = () => {
    const [activeMenu, setActiveMenu] = useState(null)

    return (
        <header onMouseLeave={() => setActiveMenu(null)}>
            <TopBar/>
            <MainNav onMenuHover={setActiveMenu}/>
            <SubNav/>
            <MegaMenu activeMenu={activeMenu} data={menuData[activeMenu]} />
        </header>
    )
}