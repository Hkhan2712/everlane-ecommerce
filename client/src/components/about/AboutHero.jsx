import { cloudinaryUrl } from "../../utils/cloudinary"
import styles from './aboutHero.module.css'

const AboutHero = ({ publicId, title, subtitle }) => {
    const bgUrl = cloudinaryUrl(publicId, 1600, 700)

    return (
        <section
            className="position-relative d-flex align-items-center justify-content-center text-center text-white"
            style={{
                height: "80vh",
                backgroundImage: `url(${bgUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Overlay */}
            <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
            ></div>

            {/* Content */}
            <div className="position-relative container px-4 d-flex flex-column align-items-center">
                <h1
                    className={`mb-3 ${styles.title}`}
                >
                    {title}
                </h1>
                <p className={`${styles.subtitle}`}>
                    {subtitle}
                </p>
            </div>
        </section>
    )
}

export default AboutHero