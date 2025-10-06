// components/footer/FooterLinks.jsx
const footerData = [
    {
        title: "Account",
        items: [
            {name: "Log In", link: "/sign-in"}, 
            {name: "Sign Up", link: "/sign-up"}, 
            {name: "Redeem a Gift Card", link: "#"}
        ],
    },
    {
        title: "Company",
        items: [
            {name: "About", link: "/about"},
            {name: "Environmental Initiatives", link: "#"},
            {name: "Factories", link: "#"},
            {name: "DEI", link: "#"},
            {name: "Careers", link: "#"},
            {name: "International", link: "#"},
            {name: "Accessibility", link: "#"},
        ],
    },
    {
        title: "Get Help",
        items: [
            {name: "Help Center", link: "#"}, 
            {name: "Return Policy", link: "#"}, 
            {name: "Shipping Info", link: "#"}, 
            {name: "Bulk Orders", link: "#"}
        ],
    },
    {
        title: "Connect",
        items: [
            {name: "Facebook", link: "#"},
            {name: "Instagram", link: "#"},
            {name: "Twitter", link: "#"},
            {name: "Affiliates", link: "#"},
            {name: "Out Stores", link: "#"},
        ],
    },
]

const FooterLinks = () =>
    <div className="row">
        {footerData.map((col, i) => (
            <div className="col-6 col-md-3 mb-4" key={i}>
                <h6 className="fw-bold">{col.title}</h6>
                <ul className="list-unstyled">
                    {col.items.map((item) => (
                    <li key={`${col.title}-${item.name}`}>
                        <a href={item.link} className="text-muted text-decoration-none d-block py-1">
                        {item.name}
                        </a>
                    </li>
                    ))}
                </ul>
            </div>
        ))}
    </div>

export default FooterLinks