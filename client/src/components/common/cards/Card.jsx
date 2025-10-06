import { Link } from 'react-router-dom'
import styles from './Card.module.css'

const Card = ({name, imgUrl, link='#'}) => 
    <Link to={link} className="card h-100" style={{border:0}}>
        <img src={imgUrl} className="cardImage" alt={name} />
        <div className="card-body text-center">
            <h6 className={`${styles.cardTitle}`}>{name}</h6>
        </div>
    </Link>

export default Card