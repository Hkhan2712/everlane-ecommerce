import { useState } from "react"
import PersonalInfo from "../../components/account/PersonalInfo"
import AddressList from "../../components/account/AddressList"
import ChangePassword from "../../components/account/ChangePassword"
import Orders from "../../components/account/Orders"
import styles from "./MyAccount.module.css"
import AccountSidebar from "../../components/account/AccountSidebar"

const MyAccount = () => {
    const [tab, setTab] = useState("profile")

    return (
        <div className={`container my-4 ${styles.container}`}>
            <h2 className="mb-4 fw-bold text-dark">My Account</h2>
            <div className="row pb-3">
                {/* Sidebar */}
                <div className="col-md-3 border-end">
                   <AccountSidebar tab={tab} setTab={setTab}/>
                </div>

                {/* Content */}
                <div className="col-md-9">
                    <div className={styles.content}>
                        {tab === "profile" && <PersonalInfo />}
                        {tab === "addresses" && <AddressList />}
                        {tab === "password" && <ChangePassword />}
                        {tab === "orders" && <Orders />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyAccount
