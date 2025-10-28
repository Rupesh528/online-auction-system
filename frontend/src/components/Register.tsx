import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/api";

function Register() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const validatePassword = (pwd: string): string[] => {
		const errors: string[] = [];
		if (pwd.length < 6)
			errors.push("Password must be at least 6 characters long");
		return errors;
	};

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();
		const passwordErrors = validatePassword(password);

		if (passwordErrors.length > 0) {
			alert("Password Requirements:\n" + passwordErrors.join("\n"));
			return;
		}

		try {
			await axios.post(`${API_BASE_URL}/api/auth/register`, {
				name,
				email,
				password,
			});
			navigate("/login");
		} catch (error) {
			console.error("Registration error:", error);
			alert("Error registering user.");
		}
	};

	return (
		<main className="app-container">
			<div className="content-card" style={{ maxWidth: 400 }}>
				<div className="text-center mb-4">
					<h1 className="h3 mb-3 fw-bold">Create Account</h1>
					<p className="text-muted">Join our auction community today</p>
				</div>
				<form onSubmit={handleRegister}>
					<div className="mb-3">
						<label htmlFor="name" className="form-label fw-semibold">
							<i className="bi bi-person me-2 text-primary"></i>
							Full Name
						</label>
						<input
							type="text"
							id="name"
							className="form-control"
							placeholder="Enter your full name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
					</div>
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
							placeholder="Create a secure password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<div className="form-text mt-2">
							<small className="text-muted">
								<i className="bi bi-info-circle me-1"></i>
								Password must be at least 6 characters long
							</small>
						</div>
					</div>
					<button className="btn btn-primary btn-lg w-100 mb-3" type="submit">
						<i className="bi bi-person-plus me-2"></i>
						Create Account
					</button>
					<div className="text-center">
						<small className="text-muted">
							Already have an account?{" "}
							<a href="/login" className="text-decoration-none fw-semibold">
								Sign in here
							</a>
						</small>
					</div>
				</form>
			</div>
		</main>
	);
}

export default Register;
