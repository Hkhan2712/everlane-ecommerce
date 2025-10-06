import { useState } from "react"
import styles from './AccordionFitler.module.css'
import {ChevronUp, ChevronDown, DashIcon, PlusIcon} from '@/components/icons'

const AccordionFilter = ({ id, title, type, data, limit = 5 }) => {
    const [isOpen, setIsOpen] = useState(true)
    const [showAll, setShowAll] = useState(false)

    const renderContent = () => {
        if (type === "categories") {
            const items = showAll ? data : data.slice(0, limit);
            return (
                <>
                {items.map((cat, idx) => (
                    <label className={styles.filterCheckbox} key={idx}>
                    <input type="checkbox" />
                    <span>{cat}</span>
                    </label>
                ))}
                {data.length > limit && (
                    <button
                    className={styles.filterToggle}
                    onClick={() => setShowAll(!showAll)}
                    >
                    {showAll ? (
                        <>
                        View Less <DashIcon width={16} height={16} />
                        </>
                    ) : (
                        <>
                        View More <PlusIcon width={16} height={16} />
                        </>
                    )}
                    </button>
                )}
                </>
            )
        }

        if (type === "colors") {
        const items = showAll ? data : data.slice(0, limit);
        return (
            <>
            <div className={styles.filterColors}>
                {items.map((color, idx) => (
                <div key={idx} className={styles.filterColorItem}>
                    <span
                        className={styles.filterColorCircle}
                        style={{ background: color.code }}
                    />
                    <span>{color.name}</span>
                </div>
                ))}
            </div>
            {data.length > limit && (
                <button
                    className={styles.filterToggle}
                    onClick={() => setShowAll(!showAll)}
                >
                    {showAll ? "View Less −" : "View More +"}
                </button>
            )}
            </>
        );
        }

        if (type === "sizes") {
            return (
                <>
                {data.waist && (
                    <div className={styles.filterSizeGroup}>
                        <div className={styles.filterSizeTitle}>Waist</div>
                        <div className={styles.filterSizes}>
                            {data.waist.map((size, idx) => (
                            <button key={idx} className={styles.filterSizeBtn}>
                                {size}
                            </button>
                            ))}
                        </div>
                    </div>
                )}
                {data.clothing && (
                    <div className={styles.filterSizeGroup}>
                        <div className={styles.filterSizeTitle}>Clothing</div>
                        <div className={styles.filterSizes}>
                            {data.clothing.map((size, idx) => (
                            <button key={idx} className={styles.filterSizeBtn}>
                                {size}
                            </button>
                            ))}
                        </div>
                    </div>
                )}
                </>
            )
        }

        return null
    }

    return (
        <div className={styles.accordionFilter}>
            <button
                className={styles.accordionHeader}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{title}</span>
                <span>{isOpen ? <ChevronUp width={12}/>: <ChevronDown width={12}/>}</span>
            </button>
            {isOpen && <div className={styles.accordionBody}>{renderContent()}</div>}
        </div>
    )
}

export default AccordionFilter