import { Link } from "react-router-dom"

const footerBottomLinks = [
  "Privacy Policy",
  "Terms of Service",
  "Do Not Sell or Share My Personal Information",
  "CS Supply Chain Transparency",
  "Vendor Code of Conduct",
  "Sitemap Pages",
  "Sitemap Products",
]

const FooterBottom = () => {
	return (
		<>
			<div className="d-flex flex-wrap justify-content-center gap-3 mb-2">
				{footerBottomLinks.map((link, i) => (
				<Link key={i} to="#" className="text-muted small text-decoration-none">
					{link}
				</Link>
				))}
			</div>
			<div className="text-center text-muted small">
				© {new Date().getFullYear()} All Rights Reserved
			</div>
		</>
	)
}

export default FooterBottom
