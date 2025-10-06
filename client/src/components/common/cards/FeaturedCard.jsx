import { Link } from "react-router-dom"
import styles from "./FeaturedCard.module.css"

const FeaturedCard = ({ title, description, imageUrl, linkText, linkHref }) => 
    <div className="flex flex-col items-center text-center space-y-4">
        <h3 className={`${styles.title} py-5`}>{title}</h3>
        <img
            src={imageUrl}
            alt={title}
            className={ ` ${styles.imageWrapper}`}
        />
        <p className={`${styles.description} py-4`}>{description}</p>
        <Link
            to={linkHref}
            className={styles.link}
        >
            {linkText}
        </Link>
    </div>

export default FeaturedCard
