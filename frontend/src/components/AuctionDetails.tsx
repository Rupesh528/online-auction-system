import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
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

interface EditableFields {
	title: string;
	description: string;
	imageUrl: string;
	endTime: string;
}

function AuctionDetails() {
	const [auction, setAuction] = useState<Auction | null>(null);
	const [bidAmount, setBidAmount] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [isEditing, setIsEditing] = useState(false);
	const [editedFields, setEditedFields] = useState<EditableFields>({
		title: "",
		description: "",
		imageUrl: "",
		endTime: "",
	});
	const { id } = useParams<{ id: string }>();
	const auth = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchAuction = async () => {
			try {
				const response = await axios.get(`${API_BASE_URL}/api/auctions/${id}`);
				setAuction(response.data);
				setEditedFields({
					title: response.data.title,
					description: response.data.description,
					imageUrl: response.data.imageUrl || "",
					endTime: response.data.endTime,
				});
			} catch (err) {
				setError("Failed to fetch auction details");
			} finally {
				setLoading(false);
			}
		};

		fetchAuction();
	}, [id]);

	const handleBid = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!auth?.user) {
			navigate("/login");
			return;
		}

		try {
			const response = await axios.post(
				`${API_BASE_URL}/api/auctions/${id}/bid`,
				{ amount: Number(bidAmount) },
				{
					headers: {
						Authorization: `Bearer ${auth.user.token}`,
					},
				}
			);
			setAuction(response.data.auction);
			setBidAmount("");
			alert("Bid placed successfully!");
		} catch (err: any) {
			alert(err.response?.data?.message || "Failed to place bid");
		}
	};

	const handleUpdate = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!auth?.user || !auction) return;

		try {
			const response = await axios.put(
				`${API_BASE_URL}/api/auctions/${id}`,
				editedFields,
				{
					headers: {
						Authorization: `Bearer ${auth.user.token}`,
					},
				}
			);
			setAuction(response.data);
			setIsEditing(false);
			alert("Auction updated successfully!");
		} catch (err: any) {
			alert(err.response?.data?.message || "Failed to update auction");
		}
	};

	if (loading) return <div className="text-center mt-5">Loading...</div>;
	if (error) return <div className="text-center mt-5 text-danger">{error}</div>;
	if (!auction)
		return <div className="text-center mt-5">Auction not found</div>;

	const isEnded = new Date(auction.endTime) < new Date();
	const minBid = auction.currentBid + 1;

	return (
		<main className="app-container">
			<div className="content-card">
				<div className="row">
					<div className="col-md-6">
						{auction.imageUrl && (
							<img
								src={auction.imageUrl}
								alt={auction.title}
								className="img-fluid rounded mb-3"
								style={{
									maxHeight: "400px",
									width: "100%",
									objectFit: "cover",
								}}
							/>
						)}
					</div>
					{auction.bids && auction.bids.length > 0 && (
						<div className="card mb-3">
							<div className="card-body">
								<h5 className="card-title">Bid History</h5>
								<ul className="list-group list-group-flush">
									{[...auction.bids]
										.slice()
										.reverse()
										.map((b, idx) => (
											<li
												key={idx}
												className="list-group-item d-flex justify-content-between align-items-center"
											>
												<div>
													<strong>
														{typeof b.user === "object"
															? b.user.name
															: "Unknown"}
													</strong>
													<div className="text-muted small">
														{b.createdAt
															? new Date(b.createdAt).toLocaleString()
															: ""}
													</div>
												</div>
												<div>
													<span className="fw-bold">
														${b.amount.toFixed(2)}
													</span>
												</div>
											</li>
										))}
								</ul>
							</div>
						</div>
					)}
					<div className="col-md-6">
						{isEditing ? (
							<form onSubmit={handleUpdate}>
								<div className="mb-3">
									<label className="form-label">Title</label>
									<input
										type="text"
										className="form-control"
										value={editedFields.title}
										onChange={(e) =>
											setEditedFields((prev) => ({
												...prev,
												title: e.target.value,
											}))
										}
										required
									/>
								</div>
								<div className="mb-3">
									<label className="form-label">Description</label>
									<textarea
										className="form-control"
										value={editedFields.description}
										onChange={(e) =>
											setEditedFields((prev) => ({
												...prev,
												description: e.target.value,
											}))
										}
										rows={3}
										required
									/>
								</div>
								<div className="mb-3">
									<label className="form-label">Image URL (optional)</label>
									<input
										type="url"
										className="form-control"
										value={editedFields.imageUrl}
										onChange={(e) =>
											setEditedFields((prev) => ({
												...prev,
												imageUrl: e.target.value,
											}))
										}
									/>
								</div>
								<div className="mb-3">
									<label className="form-label">End Time</label>
									<input
										type="datetime-local"
										className="form-control"
										value={new Date(editedFields.endTime)
											.toISOString()
											.slice(0, 16)}
										onChange={(e) =>
											setEditedFields((prev) => ({
												...prev,
												endTime: e.target.value,
											}))
										}
										min={new Date().toISOString().slice(0, 16)}
										required
									/>
								</div>
								<div className="mb-3">
									<button type="submit" className="btn btn-primary me-2">
										Save Changes
									</button>
									<button
										type="button"
										className="btn btn-secondary"
										onClick={() => setIsEditing(false)}
									>
										Cancel
									</button>
								</div>
							</form>
						) : (
							<>
								<div className="d-flex justify-content-between align-items-start">
									<div>
										<h2>{auction.title}</h2>
										<p className="text-muted">
											Listed by: {auction.createdBy.name}
										</p>
									</div>
									{auth?.user &&
										auth.user.id === auction.createdBy._id &&
										!isEnded &&
										auction.currentBid === auction.startingPrice && (
											<button
												className="btn btn-outline-primary btn-sm"
												onClick={() => setIsEditing(true)}
											>
												Edit Auction
											</button>
										)}
								</div>
								<p>{auction.description}</p>
								<div className="card bg-light mb-3">
									<div className="card-body">
										<h5 className="card-title">Auction Details</h5>
										<p className="mb-1">
											Starting Price: ${auction.startingPrice}
										</p>
										<p className="mb-1">Current Bid: ${auction.currentBid}</p>
										<p className="mb-1">
											Ends: {new Date(auction.endTime).toLocaleString()}
										</p>
										<p className="mb-0">
											Status:{" "}
											{isEnded ? (
												<span className="badge bg-secondary">Ended</span>
											) : (
												<span className="badge bg-success">Active</span>
											)}
										</p>
										{isEnded && (
											<div className="mt-3">
												<strong>Winner:</strong>{" "}
												{auction.lastBidBy?.name ? (
													<span>
														{auction.lastBidBy.name}{" "}
														{auction.lastBidBy.email
															? `(${auction.lastBidBy.email})`
															: ""}
													</span>
												) : (
													<em>No winner tracked</em>
												)}
											</div>
										)}
									</div>
								</div>
							</>
						)}

						{!isEnded &&
							auth?.user &&
							auth.user.id !== auction.createdBy._id && (
								<form onSubmit={handleBid} className="mt-4">
									<div className="input-group">
										<span className="input-group-text">$</span>
										<input
											type="number"
											className="form-control"
											value={bidAmount}
											onChange={(e) => setBidAmount(e.target.value)}
											min={minBid}
											step="0.01"
											placeholder={`Min bid: $${minBid}`}
											required
										/>
										<button type="submit" className="btn btn-primary">
											Place Bid
										</button>
									</div>
								</form>
							)}

						{!auth?.user && !isEnded && (
							<div className="alert alert-info mt-3">
								Please <a href="/login">login</a> to place a bid
							</div>
						)}
					</div>
				</div>
			</div>
		</main>
	);
}

export default AuctionDetails;
