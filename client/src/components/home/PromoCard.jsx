import Button from "../ui/Button"
import styles from "./PromoSection.module.css"

const PromoCard = ({ title, imageUrl, buttonText, link }) => {
	return (
		<div className={`${styles.cardWrapper}`}>
		<div className={styles.card}>
			<img src={imageUrl} alt={title} className={styles.image} />
			<div className={styles.overlay}>
			<h3 className={`pb-3 ${styles.title}`}>{title}</h3>
			<Button as="link" href={link}>{buttonText}</Button>
			</div>
		</div>
		</div>
	)
}

export default PromoCard