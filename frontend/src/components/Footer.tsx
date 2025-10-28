function Footer() {
	const year = new Date().getFullYear();
	return (
		<footer className="app-footer">
			<div className="container">
				<div className="row">
					<div className="col-lg-4 col-md-6 mb-4">
						<h5 className="footer-text mb-3">Online Auction App</h5>
						<p className="footer-text small mb-0">
							Discover amazing deals through our online auction platform. Bid on
							unique items and win incredible prizes.
						</p>
					</div>
					<div className="col-lg-2 col-md-6 mb-4">
						<h6 className="footer-text mb-3">Quick Links</h6>
						<ul className="list-unstyled">
							<li className="mb-2">
								<a href="/" className="footer-link small">
									Home
								</a>
							</li>
							<li className="mb-2">
								<a href="/auctions" className="footer-link small">
									Auctions
								</a>
							</li>
							<li className="mb-2">
								<a href="/winners" className="footer-link small">
									Winners
								</a>
							</li>
							<li className="mb-2">
								<a href="/dashboard" className="footer-link small">
									Dashboard
								</a>
							</li>
						</ul>
					</div>
					<div className="col-lg-2 col-md-6 mb-4">
						<h6 className="footer-text mb-3">Account</h6>
						<ul className="list-unstyled">
							<li className="mb-2">
								<a href="/login" className="footer-link small">
									Login
								</a>
							</li>
							<li className="mb-2">
								<a href="/register" className="footer-link small">
									Register
								</a>
							</li>
							<li className="mb-2">
								<a href="/create-auction" className="footer-link small">
									Create Auction
								</a>
							</li>
						</ul>
					</div>
					<div className="col-lg-4 col-md-6 mb-4">
						<h6 className="footer-text mb-3">Contact</h6>
						<p className="footer-text small mb-2">
							Have questions? Get in touch with us.
						</p>
						<p className="footer-text small mb-0">
							Made with{" "}
							<span style={{ color: "#ff6b6b" }} aria-hidden>
								♥
							</span>{" "}
							by &nbsp;<strong>Rupesh</strong> — {year}
						</p>
						<div className="d-flex gap-3 mt-2">
							<a
								href="https://rupesh-sahani.vercel.app/"
								target="_blank"
								rel="noopener noreferrer"
								className="footer-link small"
								aria-label="Rupesh portfolio"
							>
								View Portfolio
							</a>
							<a
								href="https://meetdevelopers.com/"
								target="_blank"
								rel="noopener noreferrer"
								className="footer-link small"
								aria-label="Meet Developers"
							>
								Meet Developers
							</a>
						</div>
					</div>
				</div>
				<hr className="my-4" style={{ borderColor: "rgba(255,255,255,0.1)" }} />
				<div className="text-center">
					<p className="footer-text small mb-0">
						© {year} Online Auction App. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
