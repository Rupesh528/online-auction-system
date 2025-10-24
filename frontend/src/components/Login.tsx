import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const auth = useContext(AuthContext);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const res = await axios.post("http://localhost:5000/api/auth/login", {
				email,
				password,
			});
			localStorage.setItem("token", res.data.token);
			auth?.setUser({ 
				token: res.data.token,
				id: res.data.user._id
			});
			alert("Login successful!");
			navigate("/");
		} catch {
			alert("Invalid email or password.");
		}
	};

	return (
		<div className="container mt-5" style={{ maxWidth: 400 }}>
			<h3 className="text-center mb-4">Login</h3>
			<form onSubmit={handleLogin}>
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
				</div>
				<button className="btn btn-success w-100" type="submit">
					Login
				</button>
			</form>
		</div>
	);
}

export default Login;
