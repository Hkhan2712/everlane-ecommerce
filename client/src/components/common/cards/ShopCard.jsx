import { cloudinaryUrl } from "@/utils/cloudinary"
import { Link } from "react-router-dom"

const ShopCard = ({ city, shortAddress, slug, thumbnail }) => {
    const size = { w: 430, h: 280 }
    const imgUrl = cloudinaryUrl(thumbnail, size.w, size.h)

    return (
        <Link to={`/stores/${slug}`} className="text-decoration-none text-dark d-block">
            <img src={imgUrl} alt={slug} className="img-fluid mb-2" />
            <p className="text-uppercase m-0" 
                style={{ fontSize: "10px", lineHeight: "16px", letterSpacing: "1px" }}>
                {city}
            </p>
            <h2 className="m-0 fw-normal" 
                style={{ fontSize: "16px", lineHeight: "24px", letterSpacing: "0.64px" }}>
                {shortAddress}
            </h2>
        </Link>
    )
}

export default ShopCard
