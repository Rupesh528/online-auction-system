import { Link } from "react-router-dom";

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

interface AuctionCardProps {
	auction: Auction;
	showControls?: boolean;
}

function AuctionCard({ auction, showControls = false }: AuctionCardProps) {
	const isEnded = new Date(auction.endTime) < new Date();

	const truncateText = (text: string, maxLength: number) => {
		if (text.length <= maxLength) return text;
		return text.substring(0, maxLength) + "...";
	};

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(price);
	};

	const formatDate = (date: string) => {
		return new Date(date).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	return (
		<div className="card h-100 auction-card">
			<div className="card-img-wrapper">
				{auction.imageUrl ? (
					<img
						src={auction.imageUrl}
						className="card-img-top"
						alt={auction.title}
						style={{ height: "200px", objectFit: "cover" }}
					/>
				) : (
					<div
						className="placeholder-img"
						style={{
							height: "200px",
							background: "#f8f9fa",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<span className="text-muted">No Image</span>
					</div>
				)}
			</div>
			<div className="card-body d-flex flex-column">
				<div className="d-flex justify-content-between align-items-start mb-2">
					<h5 className="card-title mb-0">{truncateText(auction.title, 50)}</h5>
					{isEnded && <span className="badge bg-secondary ms-2">Ended</span>}
				</div>
				<p className="text-muted small mb-2">by {auction.createdBy.name}</p>
				<p className="card-text">{truncateText(auction.description, 100)}</p>
				<div className="mt-auto">
					<div className="bid-info">
						<div className="d-flex justify-content-between align-items-center mb-2">
							<div>
								<strong>Current Bid:</strong>
								<div className="fs-5">{formatPrice(auction.currentBid)}</div>
							</div>
							<div className="text-end">
								<strong>Ends:</strong>
								<div>{formatDate(auction.endTime)}</div>
							</div>
						</div>
					</div>
					<div className="mt-3">
						{!isEnded && (
							<Link
								to={`/auction/${auction._id}`}
								className="btn btn-primary w-100"
							>
								{showControls ? "Manage Auction" : "View & Bid"}
							</Link>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default AuctionCard;
