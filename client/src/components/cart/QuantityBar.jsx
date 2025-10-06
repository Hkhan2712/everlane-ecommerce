import { DashIcon, PlusIcon } from "../icons"
import Button from "../ui/Button"

const QuantityBar = ({quantity, onIncrease, onDecrease}) => {
    return (
        <div className="d-flex align-items-center">
            <Button style={{padding: ".5rem .5rem"}} className="border-0" onClick={onDecrease}>
                <DashIcon width={20} color="currentColor"/>
            </Button>
            <span className="mx-2">{quantity}</span>
            <Button style={{padding: ".5rem .5rem"}} className="border-0" onClick={onIncrease}>
                <PlusIcon width={20} color="currentColor"/>
            </Button>
        </div>
    )
}

export default QuantityBar