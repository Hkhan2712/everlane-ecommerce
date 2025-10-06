import styles from './CardGrid.module.css'

const CardGrid = ({ items = [], renderItem, className = '' }) => {
    if (!items || items.length === 0) return <p>No items found</p>

    return (
        <div className={`${styles.cardGrid} ${styles[className]} row gy-5`}>
        {items.map((item, index) => (
            <div key={item.id || index} className="d-flex justify-content-center">
            {renderItem(item, index)}
            </div>
        ))}
        </div>
    )
}

export default CardGrid