import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
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

function Home() {
	const [featuredAuctions, setFeaturedAuctions] = useState<Auction[]>([]);
	const auth = useContext(AuthContext);

	useEffect(() => {
		const fetchFeaturedAuctions = async () => {
			try {
				const response = await axios.get(`${API_BASE_URL}/api/auctions`);
				const activeAuctions = response.data.filter(
					(auction: Auction) => new Date(auction.endTime) > new Date()
				);
				setFeaturedAuctions(activeAuctions.slice(0, 3));
			} catch (error) {
				console.error("Failed to fetch featured auctions:", error);
			}
		};

		fetchFeaturedAuctions();
	}, []);

	return (
		<main className="app-container">
			<div className="content-card">
				<div className="text-center mb-5">
					<h1>
						{auth?.user ? (
							<>Welcome back, {auth.user.name}! 👋</>
						) : (
							"Welcome to the Online Auction System"
						)}
					</h1>
					<p className="lead">
						{auth?.user
							? "Check out the latest auctions or create your own!"
							: "Discover unique items and place your bids in real-time."}
					</p>
					{!auth?.user ? (
						<div className="mt-4">
							<Link to="/register" className="btn btn-primary mx-2">
								Get Started
							</Link>
							<Link to="/login" className="btn btn-outline-primary mx-2">
								Login
							</Link>
						</div>
					) : (
						<div className="mt-4">
							<Link to="/create-auction" className="btn btn-primary mx-2">
								Create an Auction
							</Link>
							<Link to="/auctions" className="btn btn-outline-primary mx-2">
								Browse Auctions
							</Link>
						</div>
					)}
				</div>

				<h2 className="mb-4">Featured Auctions</h2>
				{featuredAuctions.length > 0 ? (
					<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
						{featuredAuctions.map((auction) => (
							<div key={auction._id} className="col">
								<AuctionCard auction={auction} />
							</div>
						))}
					</div>
				) : (
					<p className="text-center">No active auctions at the moment.</p>
				)}

				<div className="text-center mt-5">
					<Link to="/auctions" className="btn btn-lg btn-primary">
						View All Auctions
					</Link>
				</div>
			</div>
		</main>
	);
}

export default Home;
