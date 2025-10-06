import { Link } from 'react-router-dom'
import {useUI} from '@/hooks/useUI'
import styles from './style.module.css'

const homeItems = [
    {title: "Holiday Gifting", link: "#"}, 
    {title: "New Arrivals", link: "#"}, 
    {title: "Best-Sellers",link: "#"}, 
    {title: "Clothing",link: "#"},
    {title: "Tops & Sweaters",link: "#"}, 
    {title: "Pants & Jeans",link: "#"}, 
    {title: "Outerwear",link: "#"},
    {title: "Shoes & Bags",link: "#"}, 
    {title: "Sale", link: "#"}
]

const mainItems = [
    {title: "About", link: "about"},
    {title: "Stores", link: "stores"},
    {title: "Fatories", link: "#"},
    {title: "Environmental Initiatives", link: "#"},
    {title: "Our Carbon Commitment", link: "#"},
    {title: "Annual Impact Report", link: "#"},
    {title: "Cleaner Fashion", link: "#"},
]

const SubNav = () => { 
    const {activeMenu} = useUI()

    let items = null;

    switch (activeMenu) {
        case "Women":
        case "Men":
            items = homeItems;
            break;
        case "About":
            items = mainItems;
            break;
        default:
            break;
    }
    
    return (
        <div className='d-flex justify-content-center border-bottom'>
            <ul className={`container d-flex justify-content-center gap-3 ${styles.subNav}`}>
                {items && items.map((item, index) => (
                    <li key={index}>
                        <Link to={item.link} className={item.title === 'Sale' ? styles.red : ''}>
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default SubNav
