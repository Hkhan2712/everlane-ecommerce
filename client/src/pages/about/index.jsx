import AboutHero from "../../components/about/AboutHero"
import ContentSection from "../../components/about/ContentSection"
import ExploreSection from "../../components/about/ExploreSection"
import MissionSection from "../../components/about/MissionSection"

const About = () => {
    const detail = 
        { 
            publicId:"ian-schneider-TamMbr4okv4-unsplash_mciysv",
            title: "We believe we can all make a difference.",
            subTitle: "Our way: Exceptional quality. Ethical factories. Radical Transparency."
        }
    const contents = 
        [
            {
                title: "Our ethical approach.",
                subTitle: "OUR FACTORIES",
                description: "We spend months finding the best factories around the world—the same ones that produce your favorite designer labels. We visit them often and build strong personal relationships with the owners. Each factory is given a compliance audit to evaluate factors like fair wages, reasonable hours, and environment. Our goal? A score of 90 or above for every factory.",
                publicId: "m0851-DNA6GbS23dQ-unsplash_lwzjxm",
                extraImages: ["jason-briscoe-w2uvoJo_woE-unsplash_xkc55h"],
            },
            {
                title: "Designed to last.",
                subTitle: "OUR QUALITY",
                description: "At Everlane, we’re not big on trends. We want you to wear our pieces for years, even decades, to come. That’s why we source the finest materials and factories for our timeless products— like our Grade-A cashmere sweaters, Italian shoes, and Peruvian Pima tees.",
                publicId: "geoff-oliver-D16BDmKILsc-unsplash_s2owpb",
                reverse: true,
                extraImages: ["david-dvoracek-12P0_rzSNpM-unsplash_koewrg"]
            },
            {
                title: "Radically Transparent",
                subTitle: "OUR PRICES",
                description: "We believe our customers have a right to know how much their clothes cost to make. We reveal the true costs behind all of our products—from materials to labor to transportation—then offer them to you, minus the traditional retail markup.",
                publicId: "artem-beliaikin-f4yVFrvSuHc-unsplash_pz6sem"
            }
        ]
    const missionContent = "At Everlane, we want the right choice to be as easy as putting on a great T-shirt. That's why we partner with the best, ethical factories around the world. Souce only the finest materials. And share those stories with you - down to the true cost of every product we make. It's a new way of doing things. We call it Radical Transparency."
    return (
        <>
            <AboutHero
                publicId={detail.publicId}
                title={detail.title}
                subtitle={detail.subTitle}
            />
            <MissionSection content={missionContent}/>
            
            {contents.map(item => {
                return (
                    <ContentSection 
                        key={item.title}
                        title={item.title} 
                        subtitle={item.subTitle} 
                        description={item.description} 
                        publicId={item.publicId}
                        reverse={item.reverse??false}
                        extraImages={item.extraImages}
                    />
                )
            })} 

            <ExploreSection/>           
        </>
    )
}

export default About