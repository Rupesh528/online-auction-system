import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
	const auth = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogout = () => {
		auth?.logout();
		navigate("/login");
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 app-navbar">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">
					AuctionApp
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav me-auto">
						<li className="nav-item">
							<Link className="nav-link" to="/auctions">
								Browse Auctions
							</Link>
						</li>
						{auth?.user && (
							<li className="nav-item">
								<Link className="nav-link" to="/create-auction">
									Create Auction
								</Link>
							</li>
						)}
					</ul>
					<ul className="navbar-nav">
						{auth?.user ? (
							<li className="nav-item">
								<button
									className="btn btn-outline-danger"
									onClick={handleLogout}
								>
									Logout
								</button>
							</li>
						) : (
							<>
								<li className="nav-item">
									<Link className="nav-link" to="/login">
										Login
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/register">
										Register
									</Link>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
