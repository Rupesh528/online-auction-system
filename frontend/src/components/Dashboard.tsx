import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import AuctionCard from "./AuctionCard";
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
		email: string;
	};
}

function Dashboard() {
	const [myAuctions, setMyAuctions] = useState<Auction[]>([]);
	const [myBids, setMyBids] = useState<Auction[]>([]);
	const [loading, setLoading] = useState(true);
	const auth = useContext(AuthContext);

	useEffect(() => {
		const fetchUserAuctions = async () => {
			if (!auth?.user?.token) return;

			try {
				const response = await axios.get(`${API_BASE_URL}/api/auctions`, {
					headers: {
						Authorization: `Bearer ${auth.user.token}`,
					},
				});

				// Filter auctions created by the user
				const userAuctions = response.data.filter(
					(auction: Auction) => auction.createdBy._id === auth.user?.id
				);

				// Filter auctions where user has placed bids
				const userBids = response.data.filter(
					(auction: Auction) =>
						auction.currentBid > auction.startingPrice &&
						auction.createdBy._id !== auth.user?.id
				);

				setMyAuctions(userAuctions);
				setMyBids(userBids);
			} catch (error) {
				console.error("Error fetching user auctions:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchUserAuctions();
	}, [auth?.user]);

	if (!auth?.user) {
		return (
			<div className="app-container">
				<div className="content-card text-center">
					<h2 className="text-danger mb-4">Access Denied</h2>
					<p className="lead">Please log in to view your dashboard.</p>
				</div>
			</div>
		);
	}

	if (loading) {
		return (
			<div className="app-container">
				<div className="content-card text-center">
					<div className="spinner-border text-primary mb-3" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
					<p className="lead">Loading your dashboard...</p>
				</div>
			</div>
		);
	}

	return (
		<main className="app-container">
			<div className="content-card">
				<div className="mb-5 text-center">
					<h2 className="display-4 mb-3">Welcome to Your Dashboard</h2>
					<p className="lead text-muted">
						Manage your auctions and track your bids in one place.
					</p>
				</div>

				<section className="mb-5">
					<div className="d-flex justify-content-between align-items-center mb-4">
						<h3 className="mb-0">
							<i className="bi bi-box-seam me-2"></i>My Auctions
						</h3>
						<button
							className="btn btn-primary"
							onClick={() => (window.location.href = "/create-auction")}
						>
							<i className="bi bi-plus-lg me-2"></i>Create New Auction
						</button>
					</div>
					{myAuctions.length === 0 ? (
						<div className="text-center p-5 bg-light rounded">
							<i className="bi bi-inbox display-4 text-muted"></i>
							<p className="lead mt-3">You haven't created any auctions yet.</p>
							<p className="text-muted">
								Start by creating your first auction!
							</p>
						</div>
					) : (
						<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
							{myAuctions.map((auction) => (
								<div key={auction._id} className="col">
									<AuctionCard auction={auction} showControls={true} />
								</div>
							))}
						</div>
					)}
				</section>

				<section>
					<h3 className="mb-4">
						<i className="bi bi-bookmark-heart me-2"></i>My Bids
					</h3>
					{myBids.length === 0 ? (
						<div className="text-center p-5 bg-light rounded">
							<i className="bi bi-cart display-4 text-muted"></i>
							<p className="lead mt-3">You haven't placed any bids yet.</p>
							<p className="text-muted">
								Browse available auctions to start bidding!
							</p>
							<a href="/auctions" className="btn btn-primary mt-3">
								Browse Auctions
							</a>
						</div>
					) : (
						<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
							{myBids.map((auction) => (
								<div key={auction._id} className="col">
									<AuctionCard auction={auction} />
								</div>
							))}
						</div>
					)}
				</section>
			</div>
		</main>
	);
}

export default Dashboard;
