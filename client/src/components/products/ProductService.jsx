import { BoxSeam, GiftIcon, TruckIcon } from "../icons"
import styles from './ProductService.module.css'

const ProductService = () => {
    const services = [
        {
            icon: <TruckIcon width={42}/>,
            title: "Free Shipping",
            desc: <>On all U.S. orders over $100 <a href="#" style={{color: "black"}}>Learn more</a>.</>,
        },
        {
            icon: <BoxSeam width={42}/>,
            title: "Easy Returns",
            desc: <>Extended returns through January 31. <a href="#" style={{color: "black"}}>Returns Details</a>.</>,
        },
        {
            icon: <GiftIcon width={42}/>,
            title: "Send It As A Gift",
            desc: <>Add a free personalized note during checkout.</>,
        }
    ]

    return (
        <div className={styles.services}>
            {services.map((s, idx) => (
            <div key={idx} className={styles.service}>
                {s.icon}
                <div>
                    <strong>{s.title}</strong>
                    <p>{s.desc}</p>
                </div>
            </div>
            ))}
        </div>
    )
}

export default ProductService