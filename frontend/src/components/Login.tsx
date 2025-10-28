import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API_BASE_URL from "../config/api";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const auth = useContext(AuthContext);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const res = await axios.post(`${API_BASE_URL}/api/auth/login`, {
				email,
				password,
			});
			localStorage.setItem("token", res.data.token);
			localStorage.setItem(
				"userData",
				JSON.stringify({
					id: res.data.user._id,
					name: res.data.user.name,
					email: res.data.user.email,
				})
			);
			auth?.setUser({
				token: res.data.token,
				id: res.data.user._id,
				name: res.data.user.name,
				email: res.data.user.email,
			});
			navigate("/");
		} catch (error) {
			console.error("Login error:", error);
			alert("Invalid email or password.");
		}
	};

	return (
		<main className="app-container">
			<div className="content-card" style={{ maxWidth: 400 }}>
				<div className="text-center mb-4">
					<h1 className="h3 mb-3 fw-bold">Welcome Back</h1>
					<p className="text-muted">Sign in to your account to continue</p>
				</div>
				<form onSubmit={handleLogin}>
					<div className="mb-3">
						<label htmlFor="email" className="form-label fw-semibold">
							<i className="bi bi-envelope me-2 text-primary"></i>
							Email Address
						</label>
						<input
							type="email"
							id="email"
							className="form-control"
							placeholder="Enter your email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="password" className="form-label fw-semibold">
							<i className="bi bi-lock me-2 text-primary"></i>
							Password
						</label>
						<input
							type="password"
							id="password"
							className="form-control"
							placeholder="Enter your password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<button className="btn btn-primary btn-lg w-100 mb-3" type="submit">
						<i className="bi bi-box-arrow-in-right me-2"></i>
						Sign In
					</button>
					<div className="text-center">
						<small className="text-muted">
							Don't have an account?{" "}
							<a href="/register" className="text-decoration-none fw-semibold">
								Create one here
							</a>
						</small>
					</div>
				</form>
			</div>
		</main>
	);
}

export default Login;
