import { useEffect, useState } from "react";
import axios from "axios";

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
				const res = await axios.get("http://localhost:5000/api/auctions");
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
				<div className="mb-4 text-center">
					<h2 className="mb-2">Winners</h2>
					<p className="lead text-muted">
						Ended auctions and their winners (if available)
					</p>
				</div>

				{error && <div className="alert alert-danger">{error}</div>}

				{endedAuctions.length === 0 ? (
					<div className="text-center p-5 bg-light rounded">
						<p className="lead mb-0">No auctions have ended yet.</p>
					</div>
				) : (
					<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
						{endedAuctions.map((auction) => {
							const hasBids = auction.currentBid > auction.startingPrice;
							// Determine winner name: prefer populated lastBidBy, then fallback to last bid's user
							let winnerText = "No bids — no winner";
							let winnerName: string | null = null;
							if (auction.lastBidBy && typeof auction.lastBidBy !== "string") {
								winnerName = (auction.lastBidBy as any).name;
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
								}
							}

							if (winnerName) {
								winnerText = `Winner: ${winnerName}`;
							} else if (hasBids) {
								winnerText = "Winner: (not tracked) — bid present";
							}

							return (
								<div key={auction._id} className="col">
									<div className="card h-100">
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
														<div className="fs-5">
															${auction.currentBid.toFixed(2)}
														</div>
													</div>
													<div className="text-end">
														<strong>Ended:</strong>
														<div>
															{new Date(auction.endTime).toLocaleString()}
														</div>
													</div>
												</div>
												<div className="mb-2">
													<em>{winnerText}</em>
												</div>
												<a
													href={`/auction/${auction._id}`}
													className="btn btn-outline-primary w-100"
												>
													View
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
