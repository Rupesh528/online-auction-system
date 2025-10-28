import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import AuctionsPage from "./pages/AuctionsPage";
import AuctionDetails from "./components/AuctionDetails";
import CreateAuction from "./components/CreateAuction";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Winners from "./pages/Winners";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./styles/theme.css";

function App() {
	return (
		<AuthProvider>
			<ThemeProvider>
				<div className="app-layout">
					<BrowserRouter>
						<Navbar />
						<div className="main-content">
							<Routes>
								<Route path="/" element={<Home />} />
								<Route path="/login" element={<Login />} />
								<Route path="/register" element={<Register />} />
								<Route path="/auctions" element={<AuctionsPage />} />
								<Route path="/auction/:id" element={<AuctionDetails />} />
								<Route
									path="/create-auction"
									element={
										<ProtectedRoute>
											<CreateAuction />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/dashboard"
									element={
										<ProtectedRoute>
											<Dashboard />
										</ProtectedRoute>
									}
								/>
								<Route path="/winners" element={<Winners />} />
							</Routes>
						</div>
						<Footer />
					</BrowserRouter>
				</div>
			</ThemeProvider>
		</AuthProvider>
	);
}

export default App;
