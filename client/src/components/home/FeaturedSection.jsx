import ProductSlider from '@/components/common/ProductSlider'

const FeaturedSection = ({ products }) => {
  return (
    <section className="bg-light">
        <ProductSlider products={products} />
    </section>
  )
}

export default FeaturedSection