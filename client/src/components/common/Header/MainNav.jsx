import { Link } from 'react-router-dom'
import {useUI} from '@/hooks/useUI'
import UserActions from './UserActions'
import styles from './style.module.css'

const brand = "EVERLANE"
const menuItems = [
    {title:"Women", link: '/products?gender=women'}, 
    {title: "Men", link:'/products?gender=men'}, 
    {title:"About", link: '/about'}, 
    {title:"Everworld Stories", link: '/blog'}
]

const MainNav = ({ onMenuHover }) => {

    const {activeMenu, setActiveMenu} = useUI()

    return (
        <nav
            className="main-nav container-fluid d-flex align-items-center justify-content-between position-relative border-bottom"
            style={{ minHeight: "4rem" }}
        >
        {/* Left - Menu */}
            <div className="d-flex flex-grow-1 justify-content-start ps-5">
                <ul className="nav">
                {menuItems.map((item, index) => (
                    <li
                        className="nav-item"
                        key={index}
                        onMouseEnter={() => onMenuHover(item.title)}
                        >
                        <Link className={`${styles.navLink} ${
                            activeMenu === item.title ? styles.active : ''}`} to={item.link}
                            onClick={()=> setActiveMenu(item.title)}
                            >
                            {item.title}
                        </Link>
                    </li>
                ))}
                </ul>
            </div>

            {/* Center - Logo */}
            <div className="position-absolute start-50 translate-middle-x">
                <Link
                    to="/" 
                    className="logo fs-3 fw-bold text-decoration-none text-dark"
                    onClick={() => setActiveMenu("Men")}
                >
                    {brand}
                </Link>
            </div>

            {/* Right - User Actions */}
            <div className="d-flex flex-grow-1 justify-content-end pe-5">
                <UserActions />
            </div>
        </nav>
    )
}

export default MainNav