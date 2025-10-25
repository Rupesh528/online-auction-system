import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
			await axios.post("http://localhost:5000/api/auth/register", {
				name,
				email,
				password,
			});
			alert("Registration successful! Please login.");
			navigate("/login");
		} catch (err) {
			alert("Error registering user.");
		}
	};

	return (
		<main className="app-container">
			<div className="content-card" style={{ maxWidth: 400 }}>
				<h3 className="text-center mb-4">Register</h3>
				<form onSubmit={handleRegister}>
					<div className="mb-3">
						<input
							type="text"
							placeholder="Name"
							className="form-control"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
					</div>
					<div className="mb-3">
						<input
							type="email"
							placeholder="Email"
							className="form-control"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className="mb-3">
						<input
							type="password"
							placeholder="Password"
							className="form-control"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<small className="form-text text-muted mt-2 d-block">
							Password must contain:
							<ul className="mb-0 ps-3">
								<li>At least 6 characters</li>
							</ul>
						</small>
					</div>
					<button className="btn btn-primary w-100" type="submit">
						Register
					</button>
				</form>
			</div>
		</main>
	);
}

export default Register;
