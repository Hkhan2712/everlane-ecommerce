import { Link } from "react-router-dom"

const SectionHeader = ({ 
	title, 
	subtitle, 
	ctaText, 
	ctaLink,
	titleStyle = {},      
	subtitleStyle = {},   
	containerClass = "",   
}) => (
	<div className={`section-header ${containerClass}`}>
		<h2
			style={{
				fontSize: "2rem",
				fontWeight: "400",
				color: "#262626",
				...titleStyle,   
			}}
			>
			{title}
		</h2>

		{subtitle && (
			<p 
				className="mb-2" 
				style={{ ...subtitleStyle }}
			>
				{subtitle}
			</p>
		)}

		{ctaText && (
			<Link
				to={ctaLink}
				style={{
				color: "#262626",
				textDecoration: "underline",
				}}
			>
				{ctaText}
			</Link>
		)}
	</div>
)

export default SectionHeader