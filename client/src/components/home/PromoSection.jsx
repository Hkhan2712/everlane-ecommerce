import { cloudinaryUrl } from "../../utils/cloudinary";
import PromoCard from "./PromoCard";

const sizeImg = { w: 430, h: 534}

const imagesId = [
    'promo1_waeykj',
    'promo2_js2css',
    'promo3_ejzfer',
]

const promoItems = [
    {
        title: "New Arrivals",
        imageUrl: cloudinaryUrl(imagesId[0], sizeImg.w, sizeImg.h),
        buttonText: "Shop Now",
        link: "/products",
    },
    {
        title: "Best Seller",
        imageUrl: cloudinaryUrl(imagesId[1], sizeImg.w, sizeImg.h),
        buttonText: "Explore",
        link: "/best-sellers",
    },
    {
        title: "The Holiday Outfits",
        imageUrl: cloudinaryUrl(imagesId[2], sizeImg.w, sizeImg.h),
        buttonText: "Discover",
        link: "/holiday-outfits",
    },
];

const PromoSection = () => {
    return (
        <section className="p-5">
            <div className="row g-4 justify-content-center">
                {promoItems.map((item, index) => (
                    <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center" key={index}>
                        <PromoCard {...item} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PromoSection;
