import SectionHeader from "@/components/common/SectionHeader"
import Slider from "@/components/common/Slider/Slider"
import ProductCard from "@/components/common/cards/ProductCard"

const FeaturedProductsSection = ({ products }) => {
  return (
    <section>
      <SectionHeader
        title="Everlane Favorites"
        subtitle="Beautifully Functional. Purposefully Designed. Consciously Crafted."
        containerClass="text-center my-5"
      />
      <Slider
        items={products}
        slidesPerView={4}
        renderItem={(item) => (
            <ProductCard product={item}
            />
        )}
      />
    </section>
  )
}

export default FeaturedProductsSection