import AccordionFilter from "./AccordionFilter"

const FilterSidebar = ({ count }) => {
    const categories = [
        "Everyone - All Gender Collection",
        "Accessories & Gift Cards",
        "Backpacks, Weekenders & Duffle Bags",
        "Dress Shirts & Button Downs",
        "Hoodies & Sweatshirts",
        "Outerwear",
    ]

    const colors = [
        { name: "Black", code: "#000000" },
        { name: "Blue", code: "#2d5dce" },
        { name: "Brown", code: "#8b5a2b" },
        { name: "Green", code: "#3b6e4b" },
        { name: "Grey", code: "#d1d1d1" },
        { name: "Orange", code: "#e18c2f" },
        { name: "Pink", code: "#f3c1c1" },
        { name: "Red", code: "#c73535" },
        { name: "Tan", code: "#d2b48c" },
    ]

    const sizes = {
        waist: ["36", "38", "40", "42", "44", "46", "48", "50"],
        clothing: ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"],
    }

    return (
        <aside>
            <div className="mb-3">{count} Products</div>
            <div style={{borderBottom: "1px solid #e5e5e5"}}></div>
            <AccordionFilter id="cat" title="Category" type="categories" data={categories} />
            <AccordionFilter id="col" title="Color" type="colors" data={colors} />
            <AccordionFilter id="size" title="Size" type="sizes" data={sizes} />
        </aside>
    )
}

export default FilterSidebar