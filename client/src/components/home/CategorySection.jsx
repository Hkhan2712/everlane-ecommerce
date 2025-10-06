import { useEffect, useState } from "react"
import Card from "../common/cards/Card"
import { cloudinaryUrl } from "../../utils/cloudinary"
import SectionHeader from "../common/SectionHeader"

const CategorySection = ({ title, apiEndpoint }) => {
    const [cards, setCards] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(apiEndpoint);
                const json = await res.json();
                setCards(json.data || []);
            } catch (error) {
                console.error("Error fetching cards:", error);
            }
        }
        fetchData()
    }, [apiEndpoint])

    return (
        <section className="px-5 my-5">
            <SectionHeader title={title} containerClass="text-center my-5"/>
            <div className="row g-3">
                {cards.map((card) => (
                    <div key={card.id} className="col-6 col-md-4 col-lg-2">
                        <Card 
                            name={card.name} 
                            imgUrl={cloudinaryUrl(card.thumbnail, 400, 500)} 
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}

export default CategorySection
