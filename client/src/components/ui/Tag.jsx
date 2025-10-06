const baseAttributes = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
}

const Tag = ({ 
    title, 
    variant = "default", 
    tStyle = {}, 
    containerClass = "" 
}) => {
    const variantStyles = {
        default: {
            ...baseAttributes,         
            padding: ".5rem .75rem",       
            fontSize: ".9rem",
            borderRadius: "4px",
            backgroundColor: "#f1f1f1",
            color: "#262626",
        },
        product: {
            ...baseAttributes,
            padding: ".3rem 1rem",
            fontSize: "1rem",
            borderRadius: "0", 
            backgroundColor: "#e0e0e0",
            fontWeight: "500",
        },
        blog: {
            ...baseAttributes,
            padding: ".25rem 1rem",
            border: "1px solid #DDDBDC",
            fontSize: "0.8rem",
            borderRadius: "999px", 
            backgroundColor: "white",
            color: "black",
            lineHeight: "1rem"
        },
    }

    const style = {
        ...variantStyles[variant],
        ...tStyle, 
    }

    return (
        <span style={style} className={containerClass}>
            {title}
        </span>
    )
}

export default Tag
