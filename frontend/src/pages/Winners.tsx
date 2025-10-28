import { useEffect, useState } from "react";
import axios from "axios";
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
	lastBidBy?: {
		_id: string;
		name: string;
		email?: string;
	};
	bids?: Array<{
		user?: { _id: string; name: string; email?: string } | string;
		amount: number;
		createdAt?: string;
	}>;
}

function Winners() {
	const [endedAuctions, setEndedAuctions] = useState<Auction[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchEnded = async () => {
			try {
				const res = await axios.get(`${API_BASE_URL}/api/auctions`);
				const data: Auction[] = res.data;
				const now = new Date();
				const ended = data.filter((a) => new Date(a.endTime) <= now);
				setEndedAuctions(ended);
			} catch (err) {
				console.error(err);
				setError("Failed to load winners");
			} finally {
				setLoading(false);
			}
		};

		fetchEnded();
	}, []);

	if (loading) {
		return (
			<div className="app-container">
				<div className="content-card text-center">
					<div className="spinner-border text-primary" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
					<p className="lead mt-3">Loading winners...</p>
				</div>
			</div>
		);
	}

	return (
		<main className="app-container">
			<div className="content-card">
				{/* Header Section */}
				<div className="text-center mb-5">
					<h1 className="display-4 mb-3">
						<i className="bi bi-trophy-fill text-warning me-3"></i>
						Auction Winners
					</h1>
					<p className="lead text-muted">
						Celebrating the champions of completed auctions and their winning
						bids!
					</p>
				</div>

				{/* Stats Section */}
				<div className="row mb-5">
					<div className="col-md-4 mb-3">
						<div className="card text-center border-warning">
							<div className="card-body">
								<i className="bi bi-trophy display-4 text-warning mb-3"></i>
								<h3 className="card-title">{endedAuctions.length}</h3>
								<p className="card-text text-muted">Total Ended Auctions</p>
							</div>
						</div>
					</div>
					<div className="col-md-4 mb-3">
						<div className="card text-center border-success">
							<div className="card-body">
								<i className="bi bi-cash-coin display-4 text-success mb-3"></i>
								<h3 className="card-title">
									{
										endedAuctions.filter((a) => a.currentBid > a.startingPrice)
											.length
									}
								</h3>
								<p className="card-text text-muted">Auctions with Bids</p>
							</div>
						</div>
					</div>
					<div className="col-md-4 mb-3">
						<div className="card text-center border-info">
							<div className="card-body">
								<i className="bi bi-graph-up display-4 text-info mb-3"></i>
								<h3 className="card-title">
									$
									{endedAuctions
										.reduce((sum, a) => sum + a.currentBid, 0)
										.toFixed(2)}
								</h3>
								<p className="card-text text-muted">Total Value</p>
							</div>
						</div>
					</div>
				</div>

				{error && <div className="alert alert-danger">{error}</div>}

				{endedAuctions.length === 0 ? (
					<div className="text-center p-5 bg-light rounded-3">
						<i className="bi bi-trophy display-4 text-muted mb-3"></i>
						<h4 className="text-muted mb-2">No Winners Yet</h4>
						<p className="text-muted mb-4">
							No auctions have ended yet. Winners will be displayed here once
							auctions complete!
						</p>
						<a href="/auctions" className="btn btn-primary">
							<i className="bi bi-eye me-2"></i>
							Browse Active Auctions
						</a>
					</div>
				) : (
					<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
						{endedAuctions.map((auction) => {
							const hasBids = auction.currentBid > auction.startingPrice;
							// Determine winner name: prefer populated lastBidBy, then fallback to last bid's user
							let winnerText = "No bids — no winner";
							let winnerName: string | null = null;
							let isWinner = false;

							if (auction.lastBidBy && typeof auction.lastBidBy !== "string") {
								winnerName = (auction.lastBidBy as any).name;
								isWinner = true;
							}
							if (!winnerName && auction.bids && auction.bids.length > 0) {
								// bids may be populated with user objects
								const last = auction.bids[auction.bids.length - 1];
								if (
									last &&
									typeof last.user === "object" &&
									(last.user as any).name
								) {
									winnerName = (last.user as any).name;
									isWinner = true;
								}
							}

							if (winnerName) {
								winnerText = `🏆 Winner: ${winnerName}`;
							} else if (hasBids) {
								winnerText = "Winner: (not tracked) — bid present";
								isWinner = true;
							}

							return (
								<div key={auction._id} className="col">
									<div
										className={`card h-100 ${
											isWinner ? "border-warning shadow-sm" : ""
										}`}
									>
										{auction.imageUrl ? (
											<img
												src={auction.imageUrl}
												className="card-img-top"
												alt={auction.title}
												style={{ height: 180, objectFit: "cover" }}
											/>
										) : (
											<div
												className="placeholder-img"
												style={{
													height: 180,
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
													background: "#f8fafc",
												}}
											>
												<span className="text-muted">No Image</span>
											</div>
										)}
										<div className="card-body d-flex flex-column">
											<h5 className="card-title">{auction.title}</h5>
											<p className="text-muted small mb-2">
												by {auction.createdBy?.name || "Unknown"}
											</p>
											<p className="card-text mb-3">
												{auction.description?.substring(0, 120)}
												{auction.description && auction.description.length > 120
													? "..."
													: ""}
											</p>
											<div className="mt-auto">
												<div className="d-flex justify-content-between align-items-center mb-2">
													<div>
														<strong>Final Bid:</strong>
														<div
															className={`fs-5 ${
																isWinner ? "text-success fw-bold" : ""
															}`}
														>
															${auction.currentBid.toFixed(2)}
														</div>
													</div>
													<div className="text-end">
														<strong>Ended:</strong>
														<div className="small">
															{new Date(auction.endTime).toLocaleDateString()}
														</div>
													</div>
												</div>
												<div
													className={`mb-3 p-2 rounded ${
														isWinner ? "bg-warning bg-opacity-10" : "bg-light"
													}`}
												>
													<em
														className={isWinner ? "text-warning fw-bold" : ""}
													>
														{winnerText}
													</em>
												</div>
												<a
													href={`/auction/${auction._id}`}
													className="btn btn-outline-primary w-100"
												>
													<i className="bi bi-eye me-2"></i>
													View Details
												</a>
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</main>
	);
}

export default Winners;
