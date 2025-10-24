import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Home() {
	const auth = useContext(AuthContext);

	return (
		<main className="app-container">
			<div className="content-card text-center">
				<h1>Welcome to the Online Auction System</h1>
				{auth?.user ? (
					<p>You’re logged in 🎉</p>
				) : (
					<p>Please login or register to continue.</p>
				)}
			</div>
		</main>
	);
}

export default Home;
