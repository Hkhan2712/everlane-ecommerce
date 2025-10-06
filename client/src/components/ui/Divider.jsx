const Divider = ({
  color = "black",
  height = "2px",  
  width = "100%",
  margin = "1rem 0",
  radius = "0"      
}) => (
  <div
    style={{
        backgroundColor: color,
        height,
        width,
        margin,
        borderRadius: radius,
    }}
  />
)

export default Divider