import Breadcrumb from "@/components/products/Breadcrumb"
import FilterSidebar from "@/components/products/FilterSidebar"
import ProductCard from "@/components/common/cards/ProductCard"
import CardGrid from "@/components/common/cards/CardGrid"
import { useEffect, useState } from "react"

const ProductList = () => {
    const [products, setProducts] = useState([])
    const [count, setCount] = useState(0)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/products")
                const json = await res.json()
                if (json.success) {
                    setProducts(json.data)
                    setCount(json.meta.total)
                }   
            } catch (err) {
                console.error(err)
            }
        }
        fetchProducts()
    }, [])
    
    return (
        <div className="container-fluid" style={{padding: "1.875rem 5rem 1.875rem 5rem"}}>
            <div className="row">
                {/* Sidebar */}
                <aside className="col-12 col-md-2">
                    <FilterSidebar count={count} />
                </aside>

                {/* Product Grid */}
                <main className="col-12 col-md-10">
                    <CardGrid
                        items={products}
                        renderItem={(p) => <ProductCard key={p.id} {...p} />}
                        className="justify-content-between"
                    />
                </main>
            </div>
        </div>
    )
}

export default ProductList
