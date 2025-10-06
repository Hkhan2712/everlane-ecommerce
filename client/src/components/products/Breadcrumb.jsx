const Breadcrumb = ({path}) => {
    return (
        <h6>
            {path.map((item, index) => (
                <span key={index}>
                    {item}
                    {index < path.length -1 && ' / '}
                </span>
            ))}        
        </h6>
    )
}

export default Breadcrumb