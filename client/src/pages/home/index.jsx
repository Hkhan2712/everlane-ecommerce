import HeroSection from "@/components/home/HeroSection"
import PromoSection from "@/components/home/PromoSection"
import Banner from "@/components/home/Banner"
import TestimonialSlider from "@/components/home/TestimonialSlider"
import FeatureCollection from "@/components/home/FeatureCollection"
import FeaturedProductsSection from "@/components/home/FeaturedProductsSection"
import UserGallerySection from "@/components/home/UserGallerySection"
import HighlightService from "@/components/home/HighlightService"
import CategorySection from "@/components/home/CategorySection"

const products = [
    {
        id: 1,
        image: "/images/product.jpg",
        title: "The Waffle Long-Sleeve Crew",
        price: 60,
    },
    {
        id: 2,
        image: "/images/product.jpg",
        title: "The Bomber Jacket | Uniform",
        price: 148,
    },
    {
        id: 3,
        image: "/images/product.jpg",
        title: "The Modern Slim Jean",
        price: 88,
    },
    {
        id: 4,
        image: "/images/product.jpg",
        title: "The Organic Cotton Crew",
        price: 38,
    },
    {
        id: 5,
        image: "/images/product.jpg",
        title: "The ReNew Transit Backpack",
        price: 78,
    },
    {
        id: 6,
        image: "/images/product.jpg",
        title: "The Perform Legging",
        price: 68,
    },
    {
        id: 7,
        image: "/images/product.jpg",
        title: "The Oversized Blazer",
        price: 175,
    },
];

const features = [
    {
        title: "Our Holiday Gift Picks",
        description: "The best present for everyone on your list.",
        imageUrl: "/images/featured1.jpg",
        linkText: "Read More",
        linkHref: "/delivery",
    },
    {
        title: "Cleaner Fashion",
        description: "See the sustainability efforts behind each of our products.",
        imageUrl: "/images/featured2.jpg",
        linkText: "Learn More",
        linkHref: "/materials",
    },
];

const items = [
    { image: '/images/user1.jpg' },
    { image: '/images/user1.jpg' },
    { image: '/images/user1.jpg' },
    { image: '/images/user1.jpg' },
    { image: '/images/user1.jpg' },
]

const HomePage = () => {
    
    const bannerId = 'marita-kavelashvili-ugnrXk1129g-unsplash_hq2rwx'
    const bgId = 'hero-section_fk9w6a'

    return (
        <>
            <HeroSection publicId={bgId}/>
            <CategorySection title="Shop by Category" apiEndpoint="http://localhost:3000/api/categories"/>
            <PromoSection/>
            <Banner publicId={bannerId}/>
            <FeaturedProductsSection products={products}/>
            <TestimonialSlider/>
            <FeatureCollection items={features}/>
            <UserGallerySection items={items}/>
            <HighlightService/>
        </>
    )
}

export default HomePage