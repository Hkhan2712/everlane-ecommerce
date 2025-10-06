import { useDispatch } from "react-redux"
import { addToCart } from "../../store/slices/cartSlice"

const Product = ({product}) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(product));
    }

    return (
        <button onClick={handleAddToCart}>Add To Cart</button>
    )
}

export default Product