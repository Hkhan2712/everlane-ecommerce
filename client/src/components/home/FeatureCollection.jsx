import FeaturedCard from "../common/cards/FeaturedCard";

const FeatureCollection = ({ items = [] }) => (
    <section className="container pb-5 mb-5 border-bottom">
        <div className="row">
        {items.map((item) => (
            <div className="col-12 col-md-6 mb-4" key={item.title}>
            <FeaturedCard {...item} />
            </div>
        ))}
        </div>
    </section>
);

export default FeatureCollection;