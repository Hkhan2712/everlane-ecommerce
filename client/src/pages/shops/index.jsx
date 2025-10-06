import { useEffect, useState } from "react"
import SectionHeader from "@/components/common/SectionHeader"
import ShopCard from "../../components/common/cards/ShopCard"
import CardGrid from "../../components/common/cards/CardGrid"

const Shop = () => {
    const [shops, setShops] = useState([])
    
    const header = {
        title: "Stores", 
        subtitle: !shops.length ? 'Store not found' :`Find one of our ${shops.length} stores nearest you.`}
    const limit = 9
    const apiEndpoint = `http://127.0.0.1:3000/api/stores/limit?limit=${limit}`

    useEffect(() => {
        const fetchShops = async () => {
            try {
                const res = await fetch(apiEndpoint)
                if (!res.ok) throw new Error("Failed to fetch stores")
                const data = await res.json()
                setShops(data.data || [])
            } catch (err) {
                console.error(err)
            }
        }
        fetchShops()
    }, [])
    
    return (
        <>
           <SectionHeader title={header.title} subtitle={header.subtitle}/>
           <CardGrid
                items={shops}
                className="shopGrid"
                renderItem={shop => (
                    <ShopCard
                        city={shop.city}
                        slug={shop.slug}
                        shortAddress={shop.shortAddress}
                        thumbnail={shop.thumbnail}
                    />
                )}
           /> 
        </>
    )
}

export default Shop