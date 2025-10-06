import { cloudinaryUrl } from "../../../utils/cloudinary"
import Tag from "@/components/ui/Tag"
const imgSize = { w: 410, h: 413}

const BlogCard = ({title, tags = [], publicId}) => {
    const imgUrl = cloudinaryUrl(publicId, imgSize.w, imgSize.h)

    return (
        <div>
            <img src={imgUrl} className="cover"/>
            <div className="pt-4">
                <h4 className="fs-2 fw-normal lh-base text-black">{title}</h4>
                <div className="d-flex gap-2">
                    {tags.map((tag, index) => (
                        <Tag key={index} title={tag} variant="blog"/>
                    ))}
                </div>
            </div>
            
        </div>
    )
}

export default BlogCard