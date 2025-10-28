import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import AuctionCard from "../components/AuctionCard";
import API_BASE_URL from "../config/api";

interface GlobalStats {
	totalAuctions: number;
	activeAuctions: number;
	totalUsers: number;
	totalBids: number;
	totalValue: number;
}

interface Auction {
	_id: string;
	title: string;
	description: string;
	startingPrice: number;
	currentBid: number;
	imageUrl?: string;
	endTime: string;
	createdBy: {
		_id: string;
		name: string;
	};
}

function Home() {
	const [featuredAuctions, setFeaturedAuctions] = useState<Auction[]>([]);
	const [globalStats, setGlobalStats] = useState<GlobalStats | null>(null);
	const auth = useContext(AuthContext);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [auctionsResponse, statsResponse] = await Promise.all([
					axios.get(`${API_BASE_URL}/api/auctions`),
					axios.get(`${API_BASE_URL}/api/auctions/stats/global`),
				]);

				const activeAuctions = auctionsResponse.data.filter(
					(auction: Auction) => new Date(auction.endTime) > new Date()
				);
				setFeaturedAuctions(activeAuctions.slice(0, 3));
				setGlobalStats(statsResponse.data);
			} catch (error) {
				console.error("Failed to fetch data:", error);
			}
		};

		fetchData();
	}, []);

	return (
		<main className="home-page">
			{/* Hero Section */}
			<section className="hero-section">
				<div className="hero-content">
					<div className="hero-text">
						<h1 className="hero-title">
							{auth?.user ? (
								<>Welcome back, {auth.user.name}! 👋</>
							) : (
								"Discover Amazing Auctions"
							)}
						</h1>
						<p className="hero-subtitle">
							{auth?.user
								? "Check out the latest auctions or create your own!"
								: "Bid on unique items, win amazing deals, and experience the thrill of online auctions."}
						</p>
						<div className="hero-actions">
							{!auth?.user ? (
								<>
									<Link to="/register" className="btn btn-primary btn-xl">
										<i className="bi bi-rocket-takeoff me-2"></i>
										Get Started Free
									</Link>
									<Link to="/auctions" className="btn btn-primary btn-xl">
										<i className="bi bi-search me-2"></i>
										Browse Auctions
									</Link>
								</>
							) : (
								<>
									<Link to="/create-auction" className="btn btn-primary btn-xl">
										<i className="bi bi-plus-circle me-2"></i>
										Create Auction
									</Link>
									<Link to="/auctions" className="btn btn-primary btn-xl">
										<i className="bi bi-grid me-2"></i>
										Browse Auctions
									</Link>
								</>
							)}
						</div>
					</div>
					<div className="hero-visual">
						<div className="floating-cards">
							<div className="floating-card card-1">
								<i className="bi bi-gem"></i>
								<span>Luxury Items</span>
							</div>
							<div className="floating-card card-2">
								<i className="bi bi-laptop"></i>
								<span>Electronics</span>
							</div>
							<div className="floating-card card-3">
								<i className="bi bi-house"></i>
								<span>Real Estate</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			{globalStats && (
				<section className="stats-section">
					<div className="stats-container">
						<h2 className="stats-title">
							<i className="bi bi-graph-up me-2"></i>Platform Statistics
						</h2>
						<div className="stats-grid">
							<div className="stat-card stat-auctions">
								<div className="stat-icon">
									<i className="bi bi-box-seam"></i>
								</div>
								<div className="stat-content">
									<h3 className="stat-number">{globalStats.totalAuctions}</h3>
									<p className="stat-label">Total Auctions</p>
								</div>
							</div>
							<div className="stat-card stat-active">
								<div className="stat-icon">
									<i className="bi bi-clock"></i>
								</div>
								<div className="stat-content">
									<h3 className="stat-number">{globalStats.activeAuctions}</h3>
									<p className="stat-label">Active Auctions</p>
								</div>
							</div>
							<div className="stat-card stat-users">
								<div className="stat-icon">
									<i className="bi bi-people"></i>
								</div>
								<div className="stat-content">
									<h3 className="stat-number">{globalStats.totalUsers}</h3>
									<p className="stat-label">Active Users</p>
								</div>
							</div>
							<div className="stat-card stat-bids">
								<div className="stat-icon">
									<i className="bi bi-hand-thumbs-up"></i>
								</div>
								<div className="stat-content">
									<h3 className="stat-number">{globalStats.totalBids}</h3>
									<p className="stat-label">Total Bids</p>
								</div>
							</div>
							<div className="stat-card stat-value">
								<div className="stat-icon">
									<i className="bi bi-cash"></i>
								</div>
								<div className="stat-content">
									<h3 className="stat-number">${globalStats.totalValue}</h3>
									<p className="stat-label">Total Value</p>
								</div>
							</div>
						</div>
					</div>
				</section>
			)}

			{/* Featured Auctions Section */}
			<section className="featured-section">
				<div className="featured-container">
					<div className="featured-header">
						<h2 className="featured-title">
							<i className="bi bi-star-fill me-2"></i>Featured Auctions
						</h2>
						<p className="featured-subtitle">
							Discover the hottest items up for auction
						</p>
					</div>

					{featuredAuctions.length > 0 ? (
						<div className="featured-grid">
							{featuredAuctions.map((auction) => (
								<div key={auction._id} className="featured-item">
									<AuctionCard auction={auction} />
								</div>
							))}
						</div>
					) : (
						<div className="no-auctions">
							<i className="bi bi-inbox display-4 text-muted mb-3"></i>
							<h4>No Active Auctions</h4>
							<p className="text-muted">
								Check back soon for new exciting auctions!
							</p>
						</div>
					)}

					<div className="featured-actions">
						<Link to="/auctions" className="btn btn-primary btn-xl">
							<i className="bi bi-grid me-2"></i>
							View All Auctions
						</Link>
					</div>
				</div>
			</section>
		</main>
	);
}

export default Home;
