import styles from "./TransparentPricing.module.css"

const TransparentPricing = ({ costs }) => {
    return (
        <section className={styles.wrapper}>
            <h3 className={styles.title}>Transparent Pricing</h3>
            <p className={styles.subtitle}>
                We publish what it costs us to make every one of our products. 
                There are a lot of costs we can't neatly account for - like design, fittings, wear testing, 
                rent on office and retail space - but we believe you deserve to know what goes into making the products you love.
            </p>

            <div className={styles.costGrid}>
                {costs.map((item, idx) => (
                <div key={idx} className={styles.costItem}>
                    <div className={styles.icon}>{item.icon}</div>
                    <div>{item.label}</div>
                    <div className={styles.amount}>${item.amount}</div>
                </div>
                ))}
            </div>
        </section>
    )
}

export default TransparentPricing
