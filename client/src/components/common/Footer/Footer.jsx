import FooterLinks from "./FooterLinks"
import EmailForm from "./EmailForm"
import FooterBottom from "./FooterBottom"

export const Footer = () => 
	<footer className="bg-light pt-5 pb-3">
		<div className="container py-3">
			<div className="row justify-content-between">
			<div className="col-lg-9">
				<FooterLinks />
			</div>
			<div className="col-lg-3">
				<EmailForm />
			</div>
			</div>
			<hr />
			<FooterBottom />
		</div>
	</footer>
