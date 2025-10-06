import styles from "../../pages/account/MyAccount.module.css"

const AccountSidebar = ({ tab, setTab }) => {
    return (
        <ul className={styles.sidebar}>
            <li
                className={`${styles.item} ${tab === "profile" ? styles.active : ""}`}
                onClick={() => setTab("profile")}
            >
                Personal Information
            </li>
            <li
                className={`${styles.item} ${tab === "addresses" ? styles.active : ""}`}
                onClick={() => setTab("addresses")}
            >
                Address
            </li>
            <li
                className={`${styles.item} ${tab === "password" ? styles.active : ""}`}
                onClick={() => setTab("password")}
            >
                Change Password
            </li>
            <li
                className={`${styles.item} ${tab === "orders" ? styles.active : ""}`}
                onClick={() => setTab("orders")}
            >
                Your Orders
            </li>
        </ul>
    )
}

export default AccountSidebar
