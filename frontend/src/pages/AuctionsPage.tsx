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
				<div className="d-flex justify-content-between align-items-center mb-4">
					<h2>Auctions</h2>
					<Link to="/create-auction" className="btn btn-primary">
						Create Auction
					</Link>
				</div>

				<h3>Active Auctions</h3>
				{activeAuctions.length === 0 ? (
					<p>No active auctions found.</p>
				) : (
					<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-5">
						{activeAuctions.map((auction) => (
							<div key={auction._id} className="col">
								<AuctionCard auction={auction} />
							</div>
						))}
					</div>
				)}

				<h3>Ended Auctions</h3>
				{endedAuctions.length === 0 ? (
					<p>No ended auctions found.</p>
				) : (
					<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
						{endedAuctions.map((auction) => (
							<div key={auction._id} className="col">
								<AuctionCard auction={auction} />
							</div>
						))}
					</div>
				)}
			</div>
		</main>
	);
}

export default AuctionsPage;
