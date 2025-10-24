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
						<div className="collapse navbar-collapse">
							<ul className="navbar-nav ms-auto">
					{auth?.user ? (
						<li className="nav-item">
							<button className="btn btn-danger" onClick={handleLogout}>
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
