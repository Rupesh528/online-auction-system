import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuctionCard from "../components/AuctionCard";
import API_BASE_URL from "../config/api";

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

function AuctionsPage() {
	const [auctions, setAuctions] = useState<Auction[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchAuctions = async () => {
			try {
				const response = await axios.get(`${API_BASE_URL}/api/auctions`);
				setAuctions(response.data);
			} catch (err) {
				setError("Failed to fetch auctions");
			} finally {
				setLoading(false);
			}
		};

		fetchAuctions();
	}, []);

	if (loading) return <div className="text-center mt-5">Loading...</div>;
	if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

	const activeAuctions = auctions.filter(
		(auction) => new Date(auction.endTime) > new Date()
	);
	const endedAuctions = auctions.filter(
		(auction) => new Date(auction.endTime) <= new Date()
	);

	return (
		<main className="app-container">
			<div className="content-card">
				{/* Header Section */}
				<div className="text-center mb-5">
					<h1 className="display-4 mb-3">Discover Amazing Auctions</h1>
					<p className="lead text-muted">
						Explore unique items from passionate sellers. Place strategic bids
						and secure incredible deals on one-of-a-kind treasures!
					</p>
				</div>

				{/* Action Bar */}
				<div className="d-flex justify-content-between align-items-center mb-5">
					<div className="d-flex align-items-center gap-3">
						<span className="badge bg-success fs-6 px-3 py-2 shadow-sm">
							<i className="bi bi-play-circle-fill me-1"></i>
							{activeAuctions.length} Live Auctions
						</span>
						<span className="badge bg-secondary fs-6 px-3 py-2 shadow-sm">
							<i className="bi bi-stop-circle-fill me-1"></i>
							{endedAuctions.length} Completed
						</span>
					</div>
					<Link
						to="/create-auction"
						className="btn btn-primary btn-lg shadow-sm"
					>
						<i className="bi bi-plus-circle-fill me-2"></i>
						List Your Item
					</Link>
				</div>

				{/* Active Auctions Section */}
				<section className="mb-5">
					<div className="d-flex align-items-center mb-4">
						<h2 className="mb-0 me-3">
							<i className="bi bi-lightning-charge-fill text-success me-2"></i>
							Live Auctions
						</h2>
						<hr className="flex-grow-1 border-success opacity-50" />
					</div>

					{activeAuctions.length === 0 ? (
						<div className="text-center p-5 empty-state-bg rounded-3 shadow-sm">
							<i className="bi bi-search display-4 text-muted mb-3"></i>
							<h4 className="text-muted mb-2">No Live Auctions Right Now</h4>
							<p className="text-muted mb-4">
								Be the first to start an exciting auction! List your unique item
								and watch the bids roll in.
							</p>
							<Link
								to="/create-auction"
								className="btn btn-primary btn-lg shadow-sm"
							>
								<i className="bi bi-plus-circle-fill me-2"></i>
								Start Your First Auction
							</Link>
						</div>
					) : (
						<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
							{activeAuctions.map((auction) => (
								<div key={auction._id} className="col">
									<AuctionCard auction={auction} />
								</div>
							))}
						</div>
					)}
				</section>

				{/* Ended Auctions Section */}
				{endedAuctions.length > 0 && (
					<section>
						<div className="d-flex align-items-center mb-4">
							<h2 className="mb-0 me-3">
								<i className="bi bi-check-circle-fill text-secondary me-2"></i>
								Recently Completed
							</h2>
							<hr className="flex-grow-1 border-secondary opacity-50" />
						</div>

						<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
							{endedAuctions.map((auction) => (
								<div key={auction._id} className="col">
									<AuctionCard auction={auction} />
								</div>
							))}
						</div>
					</section>
				)}
			</div>
		</main>
	);
}

export default AuctionsPage;
