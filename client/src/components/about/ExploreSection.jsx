import { cloudinaryUrl } from "../../utils/cloudinary"
import Card from "../common/cards/Card"

const ExploreSection = () => {
    const size = { width: 360, height: 230 }
    const items = [
        {
            name: "Our Products",
            imgUrl: cloudinaryUrl(
                "m-ghufanil-muta-ali-hT1R6Z5pY5I-unsplash_zdtug1",
                size.width,
                size.height
            ),
            link: '/shop'
        },
        {
            name: "Our Stores",
            imgUrl: cloudinaryUrl(
                "heidi-fin-2TLREZi7BUg-unsplash_zwtt01",
                size.width,
                size.height
            ),
            link: '/stores'
        },
        {
            name: "Careers",
            imgUrl: cloudinaryUrl(
                "brendan-church-pKeF6Tt3c08-unsplash_erjawp",
                size.width,
                size.height
            ),
            link: '#'
        },
    ]

    return (
        <section className="container text-center py-5">
        <h2 className="fs-4 text-dark fw-normal pt-5">More to Explore</h2>

        <div className="row g-4 pt-3 justify-content-center">
            {items.map((item, i) => (
            <div key={i} className="col-12 col-sm-6 col-lg-4 d-flex justify-content-center">
                <Card name={item.name} imgUrl={item.imgUrl} link={item.link}/>
            </div>
            ))}
        </div>
        </section>
    )
}

export default ExploreSection