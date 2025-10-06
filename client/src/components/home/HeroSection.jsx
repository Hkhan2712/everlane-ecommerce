import Button from "@/components/ui/Button"
import styles from "./HeroSection.module.css"
import { cloudinaryUrl } from "../../utils/cloudinary"

const HeroSection = ({publicId}) => {
    const imgUrl = cloudinaryUrl(publicId, 1400)
    const linkBtn = "/products"

    return (
        <section className={styles.heroSection} style={{backgroundImage: `url(${imgUrl})`}}>
            <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>Your Cozy Era</h1>
                <p className={styles.heroSubTitle}>Get peak comfy-chic with new winter essentials.</p>
                <Button as="link" link={linkBtn}>SHOP NOW</Button>
            </div>
        </section>
    )
}

export default HeroSection
