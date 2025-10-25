function Footer() {
	const year = new Date().getFullYear();
	return (
		<footer className="app-footer">
			<div className="container text-center py-3">
				<p className="mb-0 small footer-text">
					Made with{" "}
					<span style={{ color: "#ff6b6b" }} aria-hidden>
						♥
					</span>{" "}
					by &nbsp;<strong>Rupesh</strong> — {year}
					&nbsp;•&nbsp;
					<a
						href="https://rupesh-sahani.vercel.app/"
						target="_blank"
						rel="noopener noreferrer"
						className="footer-link"
						aria-label="Rupesh portfolio"
					>
						Portfolio
					</a>
				</p>
			</div>
		</footer>
	);
}

export default Footer;
