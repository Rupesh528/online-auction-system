import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../context/AuthContext";
import API_BASE_URL from "../config/api";

function CreateAuction() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [startingPrice, setStartingPrice] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [endTime, setEndTime] = useState<Date | null>(null);
	const navigate = useNavigate();
	const auth = useContext(AuthContext);

	// Calculate minimum date-time for auction end (24 hours from now)
	const minEndTime = new Date();
	minEndTime.setHours(minEndTime.getHours() + 24);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!endTime) {
			alert("Please select an end time for the auction");
			return;
		}

		try {
			await axios.post(
				`${API_BASE_URL}/api/auctions`,
				{
					title,
					description,
					startingPrice: Number(startingPrice),
					imageUrl,
					endTime: endTime.toISOString(),
				},
				{
					headers: {
						Authorization: `Bearer ${auth?.user?.token}`,
					},
				}
			);
			navigate("/auctions");
		} catch (error) {
			alert("Failed to create auction");
			console.error(error);
		}
	};

	return (
		<main className="app-container">
			<div className="content-card" style={{ maxWidth: "700px" }}>
				{/* Header Section */}
				<div className="text-center mb-5">
					<h1 className="display-4 mb-3">
						<i className="bi bi-plus-circle-fill text-primary me-3"></i>
						Create New Auction
					</h1>
					<p className="lead text-muted">
						List your item for auction and let bidders compete for the best
						price!
					</p>
				</div>

				{/* Info Cards */}
				<div className="row mb-4">
					<div className="col-md-4 mb-3">
						<div className="card text-center border-primary h-100">
							<div className="card-body">
								<i className="bi bi-clock display-4 text-primary mb-3"></i>
								<h6 className="card-title">Set Duration</h6>
								<p className="card-text small text-muted">
									Choose when your auction ends (minimum 24 hours)
								</p>
							</div>
						</div>
					</div>
					<div className="col-md-4 mb-3">
						<div className="card text-center border-success h-100">
							<div className="card-body">
								<i className="bi bi-cash-coin display-4 text-success mb-3"></i>
								<h6 className="card-title">Starting Price</h6>
								<p className="card-text small text-muted">
									Set a competitive starting bid to attract bidders
								</p>
							</div>
						</div>
					</div>
					<div className="col-md-4 mb-3">
						<div className="card text-center border-info h-100">
							<div className="card-body">
								<i className="bi bi-images display-4 text-info mb-3"></i>
								<h6 className="card-title">Add Images</h6>
								<p className="card-text small text-muted">
									Include photos to showcase your item
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Form */}
				<div className="card border-0 shadow-sm">
					<div className="card-body p-4">
						<form onSubmit={handleSubmit}>
							<div className="row">
								<div className="col-md-6 mb-3">
									<label htmlFor="title" className="form-label fw-bold">
										<i className="bi bi-tag me-2 text-primary"></i>
										Auction Title
									</label>
									<input
										type="text"
										className="form-control form-control-lg"
										id="title"
										value={title}
										onChange={(e) => setTitle(e.target.value)}
										placeholder="Enter a compelling title for your auction"
										required
									/>
									<div className="form-text">
										Create a compelling title that highlights your item's best
										features
									</div>
								</div>

								<div className="col-md-6 mb-3">
									<label htmlFor="startingPrice" className="form-label fw-bold">
										<i className="bi bi-cash me-2 text-success"></i>
										Starting Price ($)
									</label>
									<input
										type="number"
										className="form-control form-control-lg"
										id="startingPrice"
										value={startingPrice}
										onChange={(e) => setStartingPrice(e.target.value)}
										min="0"
										step="0.01"
										placeholder="0.00"
										required
									/>
									<div className="form-text">
										Bidders can start bidding from this amount
									</div>
								</div>
							</div>

							<div className="mb-3">
								<label htmlFor="description" className="form-label fw-bold">
									<i className="bi bi-file-text me-2 text-info"></i>
									Description
								</label>
								<textarea
									className="form-control form-control-lg"
									id="description"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									rows={4}
									placeholder="Describe your item in detail - condition, features, why it's special..."
									required
								/>
								<div className="form-text">
									Provide detailed information to help bidders understand what
									they're bidding on
								</div>
							</div>

							<div className="row">
								<div className="col-md-6 mb-3">
									<label htmlFor="imageUrl" className="form-label fw-bold">
										<i className="bi bi-image me-2 text-warning"></i>
										Image URL (Optional)
									</label>
									<input
										type="url"
										className="form-control form-control-lg"
										id="imageUrl"
										value={imageUrl}
										onChange={(e) => setImageUrl(e.target.value)}
										placeholder="https://example.com/image.jpg"
									/>
									<div className="form-text">
										Add a photo URL to make your auction more attractive
									</div>
								</div>

								<div className="col-md-6 mb-3">
									<label htmlFor="endTime" className="form-label fw-bold">
										<i className="bi bi-calendar-event me-2 text-danger"></i>
										Auction End Time
									</label>
									<div className="date-picker-container">
										<DatePicker
											selected={endTime}
											onChange={(date) => setEndTime(date)}
											showTimeSelect
											timeFormat="HH:mm"
											timeIntervals={15}
											timeCaption="Time"
											dateFormat="MMMM d, yyyy h:mm aa"
											minDate={minEndTime}
											placeholderText="Select end date and time"
											className="form-control form-control-lg"
											required
											id="endTime"
										/>
									</div>
									<div className="form-text">
										Auction must run for at least 24 hours from now
									</div>
								</div>
							</div>

							<div className="text-center mt-4">
								<button
									type="submit"
									className="btn btn-primary btn-lg px-5 py-3"
								>
									<i className="bi bi-rocket-takeoff me-2"></i>
									Launch Auction
								</button>
								<p className="text-muted mt-3 mb-0">
									By creating this auction, you agree to our terms and
									conditions
								</p>
							</div>
						</form>
					</div>
				</div>
			</div>
		</main>
	);
}

export default CreateAuction;
