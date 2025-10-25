import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
	const auth = useContext(AuthContext);
	const { theme, toggleTheme } = useTheme();
	const navigate = useNavigate();

	const handleLogout = () => {
		auth?.logout();
		navigate("/login");
	};

	return (
		<nav className="navbar navbar-expand-lg px-4 app-navbar">
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
						<li className="nav-item">
							<Link className="nav-link" to="/winners">
								Winners
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
							<>
								<li className="nav-item me-3">
									<Link className="nav-link" to="/dashboard">
										<i className="bi bi-person-circle me-1"></i>
										My Dashboard
									</Link>
								</li>
								<li className="nav-item me-3">
									<button className="theme-toggle" onClick={toggleTheme}>
										<i
											className={`bi ${
												theme === "light" ? "bi-moon-fill" : "bi-sun-fill"
											}`}
										></i>
										{theme === "light" ? "Dark" : "Light"} Mode
									</button>
								</li>
								<li className="nav-item">
									<button
										className="btn btn-outline-light"
										onClick={handleLogout}
									>
										<i className="bi bi-box-arrow-right me-1"></i>
										Logout
									</button>
								</li>
							</>
						) : (
							<>
								<li className="nav-item">
									<Link className="nav-link" to="/login">
										<i className="bi bi-box-arrow-in-right me-1"></i>
										Login
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/register">
										<i className="bi bi-person-plus me-1"></i>
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
