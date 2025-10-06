import SectionHeader from "@/components/common/SectionHeader"
import Divider from "@/components/ui/Divider"
import CardGrid from "@/components/common/cards/CardGrid"
import BlogCard from "@/components/common/cards/BlogCard"
const content = {
        title: "everworld",
        subtitle: "We're on a mission to clean up a dirty industry. There are the people, stories, and ideas that will help us get there.",
        titleStyle: {fontSize: "10rem", lineHeight: "11rem", color: "#000000", fontWeight: "600"},
        subtitleStyle: {fontSize: "1.5rem", lineHeight: "33.2px", color: "#000000"},
        containerClass: ""
    }

const publicIdTest = 'khuc-le-thanh-danh-nklao6BIbis-unsplash_jphho7'

const mockBlogs = [
    {id: 1, title: "How To Style Winter Whites", tags : ["Style", "Transparency"], publicId: publicIdTest},
    {id: 2, title: "We Won A Glossy Award", tags : ["Style", "Transparency"], publicId: publicIdTest},
    {id: 3, title: "Coordinate Your Style: Matching Outfits for Everyone", tags : ["Style", "Transparency"], publicId: publicIdTest},
    {id: 4, title: "Black Friday Fund 2025", tags : ["Style", "Transparency"], publicId: publicIdTest},
    {id: 5, title: "What to Wear this Season: Holiday Outfits & Ideas", tags : ["Style", "Transparency"], publicId: publicIdTest},
    {id: 6, title: "Thanksgiving Outfit Ideas", tags : ["Style", "Transparency"], publicId: publicIdTest},
]
const BlogIndex = () => {
    
    return (
        <div className="container">
            <div style={{padding: "4rem 0 4rem"}}>
                <Divider color="#000000" height="0.875rem" width="100%"/>
                <SectionHeader 
                    title={content.title}
                    subtitle={content.subtitle}
                    titleStyle={content.titleStyle}
                    subtitleStyle={content.subtitleStyle}
                    containerClass="text-start"
                />
            </div>
            <div style={{paddingTop: "7.5rem"}}>
                <SectionHeader 
                    title="The Latest" 
                    titleStyle={{
                        fontSize: "3.375rem", 
                        lineHeight: "4.5rem", 
                        fontWeight: "600",
                        color: "#000000"
                    }}
                />
                <CardGrid
                    items={mockBlogs}
                    renderItem={(b) => <BlogCard key={b.id} {...b} />}
                    className="shopGrid"
                />
            </div>
        </div>
    )
}

export default BlogIndex