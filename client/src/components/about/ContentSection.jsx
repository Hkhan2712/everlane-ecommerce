import { cloudinaryUrl } from "../../utils/cloudinary"
import styles from './contentSection.module.css'

const ContentSection = ({ 
    title, 
    subtitle, 
    description, 
    publicId, 
    reverse = false, 
    extraImages = []
}) => {
    const mainImageUrl = cloudinaryUrl(publicId, 700, 733)

    return (
        <section>
            <div className="container-fluid p-0">
                <div className={`row align-items-center ${reverse ? 'flex-md-row-reverse' : ''} w-100 m-0`}>
                    {/* Image */}
                    <div className="col-12 col-md-6 d-flex p-0">
                        <img 
                            src={mainImageUrl} 
                            alt={title} 
                            className="img-fluid shadow w-100 h-100 object-fit-cover" 
                        />
                    </div>

                    {/* Text */}
                    <div className="col-12 col-md-6 text-center text-md-start d-flex flex-column justify-content-center">
                        <div className="px-5">
                            <h6 className={styles.subtitle}>{subtitle}</h6>
                            <h2 className={styles.title}>{title}</h2>    
                            <p className={styles.description}>{description}</p>
                        </div>
                    </div>
                </div>

                {/* Ảnh phụ (nếu có) */}
                {extraImages.length > 0 && (
                    <div className="row m-0">
                        {extraImages.map((id, idx) => (
                            <div key={idx} className={`col-12 ${extraImages.length === 2 ? 'col-md-6' : ''} p-0`}>
                                <img
                                    src={cloudinaryUrl(id, 1400)} 
                                    alt={`${title}-extra-${idx}`}
                                    className="img-fluid w-100 object-fit-cover"
                                    style={{maxHeight: "500px"}}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default ContentSection