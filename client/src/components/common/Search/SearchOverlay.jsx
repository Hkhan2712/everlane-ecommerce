import { useEffect, useState } from 'react'
import styles from './SearchOverlay.module.css'
import { useUI } from '@/hooks/useUI'
import { CloseIcon, SearchIcon } from '@/components/icons'
import {cloudinaryUrl} from '@/utils/cloudinary'

const imgSize = {w: 257, h: 340}
const categories = [
    { title: "Women", publicId: '1-Wool-Blend-Scarf-Black-Women-6-SANVT-2159copy_du7wxa'},
    { title: "Men", publicId: 'jacket_hjf2dt'},
    { title: "Accessories", publicId: 'promo2_js2css'},
    { title: "Sale", publicId: 'd-z-115Hb_XYgzg-unsplash_px0rj9'},
]


const SearchOverlay = ({ topOffset }) => {
    const { setIsSearchOpen } = useUI();
    const [isClosing, setIsClosing] = useState(false);
    const [keyword, setKeyword] = useState('');

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsSearchOpen(false)
        }, 300); 
    }

    const handleSearch = () => {

    }

    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === "Escape") {
                handleClose();
            }
        }
        console.log('request search esc');
        
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown)
    }, [])

    useEffect(() => {
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
        document.body.style.overflow = "hidden"
        document.body.style.paddingRight = `${scrollBarWidth}px`

        return () => {
            document.body.style.overflow = ""
            document.body.style.paddingRight = ""
        }
    }, [])

    return (
        <div className={`${styles.overlay} ${isClosing ? styles.overlayClosing : ''}`} style={{ top: `${topOffset}px`}}>
            <div className='w-100 d-flex justify-content-center'>
                <div className={styles.header}>
                    <input
                        type="text"
                        placeholder="Search"
                        className={styles.searchInput}
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    {keyword.length > 0 ? (
                        <button 
                            className={styles.closeBtn} 
                            onClick={handleSearch}
                        >
                            <SearchIcon width='20'/>
                        </button>
                    ) : (
                        <button 
                            className={styles.closeBtn} 
                            onClick={handleClose}
                        >
                            <CloseIcon width='20'/>
                        </button>
                    )}
                </div>
            </div>
            <hr className='w-100'/>
            <div className="container px-5">
                <h5 className={styles.imgTitle}>Popular Categories</h5>
                <div className={styles.categories}>
                    {categories.map((cat, idx) => (
                    <div key={idx} className={styles.categoryCard}>
                        <img 
                            src={cloudinaryUrl(cat.publicId, imgSize.w, imgSize.h)} 
                            alt={cat.title} 
                            width={imgSize.w}
                            height={imgSize.h}
                        />
                        <span className="text-decoration-underline">{cat.title}</span>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SearchOverlay