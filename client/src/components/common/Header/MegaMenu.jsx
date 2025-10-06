import { ArrowRight } from '@/components/icons'
import styles from './style.module.css'

const MegaMenu = ({activeMenu, data}) => {
    if (!activeMenu || !data) return null

    return (
        <div
            className={`mega-menu border-bottom bg-white ${styles.megaMenu}`}
            style={{ position: "absolute", width: "100%", zIndex: 100 }}
            >
            <div className="container py-4">
                <div className="row g-4 align-items-start">
                    
                    {/* Highlights */}
                    <div className="col-md-3">
                        <h6 className={`text-uppercase text-muted mb-3 ${styles.fsSmall}`}>Highlights</h6>
                        <ul className="list-unstyled m-0">
                            {data.highlights.map((item, idx) => (
                                <li key={idx} className={`mb-2 fw-light ${styles.fsMedium}`}>
                                    <a href="#" className="text-dark text-decoration-none">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Featured Shops */}
                    <div className="col-md-3">
                        <h6 className={`text-uppercase text-muted mb-3 ${styles.fsSmall}`}>Featured Shops</h6>
                        <ul className="list-unstyled m-0">
                            {data.featured.map((item, idx) => (
                                <li key={idx} className={`mb-2 fw-light ${styles.fsMedium}`}>
                                    <a href="#" className="text-dark text-decoration-none">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Images */}
                    <div className="col-md-6">
                        <div className="row g-4">
                            {data.images.map((img, idx) => (
                                <div className="col-6" key={idx}>
                                    <div className="position-relative overflow-hidden rounded">
                                        <img src={img.src} alt={img.title} className="img-fluid w-100" />
                                        <a href='#' className={`position-absolute bottom-0 start-0 w-100 p-2 d-flex justify-content-between align-items-center ${styles.overlayText} text-decoration-none`}>
                                            <span className="fw-semibold text-white">{img.title}</span>
                                            <ArrowRight width={20} color="white" />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MegaMenu