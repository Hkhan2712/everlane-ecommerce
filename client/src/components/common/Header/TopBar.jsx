import { Link } from 'react-router-dom'
import { ArrowRight } from '../../icons'
import styles from './style.module.css'

const TopBar = () => 
    <div className={`d-flex justify-content-center align-items-center text-white ${styles.topBar}`}>
        Get early access on launches and offers
        <Link to={"/sign-up"} className="py-2 ms-2 text-white d-inline-flex align-items-center gap-1">
            Sign Up For Texts <ArrowRight width="16" />
        </Link>
    </div>

export default TopBar