import Button from '@/components/ui/Button'
import { cloudinaryUrl } from '@/utils/cloudinary'

const Banner = ({publicId}) => {
    const size = {w: 1316, h:281}
    const bgUrl = cloudinaryUrl(publicId, size.w, size.h)
    
    return (
        <section className='p-5'>
            <div
            className="banner text-white d-flex align-items-center"
            style={{
                backgroundImage: `url(${bgUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '400px',
            }}
            >
            <div className="container text-center">
                <h2 className="display-5 fs-1">
                We’re on a Mission To Clean Up the Industry
                </h2>
                <p className="lead mb-4 fs-5">
                Read about our progress in our latest Impact Report.
                </p>
                <Button as="link" href="/impact-report">Read More</Button>
            </div>
            </div>
        </section>
    )
}

export default Banner
