import { ArrowRight } from "../../icons"

const EmailForm = () =>
    <form className="d-flex">
        <input
            type="email"
            className="form-control rounded-0"
            placeholder="Email Address"
            aria-label="Email Address"
        />
        <button type="submit" className="btn btn-dark rounded-0 px-3">
            <ArrowRight width="20" color="white"/>      
        </button>
    </form>

export default EmailForm
