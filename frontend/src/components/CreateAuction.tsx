import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../context/AuthContext";

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
				"http://localhost:5000/api/auctions",
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
			<div className="content-card" style={{ maxWidth: "600px" }}>
				<h2 className="text-center mb-4">Create New Auction</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-3">
						<label htmlFor="title" className="form-label">
							Title
						</label>
						<input
							type="text"
							className="form-control"
							id="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="description" className="form-label">
							Description
						</label>
						<textarea
							className="form-control"
							id="description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							rows={3}
							required
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="startingPrice" className="form-label">
							Starting Price ($)
						</label>
						<input
							type="number"
							className="form-control"
							id="startingPrice"
							value={startingPrice}
							onChange={(e) => setStartingPrice(e.target.value)}
							min="0"
							step="0.01"
							required
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="imageUrl" className="form-label">
							Image URL (optional)
						</label>
						<input
							type="url"
							className="form-control"
							id="imageUrl"
							value={imageUrl}
							onChange={(e) => setImageUrl(e.target.value)}
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="endTime" className="form-label">
							End Time
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
								className="form-control"
								required
								id="endTime"
							/>
						</div>
					</div>
					<button type="submit" className="btn btn-primary w-100">
						Create Auction
					</button>
				</form>
			</div>
		</main>
	);
}

export default CreateAuction;
