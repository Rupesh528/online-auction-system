import { Link } from "react-router-dom";

interface AuctionCardProps {
	auction: {
		_id: string;
		title: string;
		description: string;
		startingPrice: number;
		currentBid: number;
		imageUrl?: string;
		endTime: string;
	};
}

function AuctionCard({ auction }: AuctionCardProps) {
	const isEnded = new Date(auction.endTime) < new Date();

	return (
		<div className="card h-100">
			{auction.imageUrl && (
				<img
					src={auction.imageUrl}
					className="card-img-top"
					alt={auction.title}
					style={{ height: "200px", objectFit: "cover" }}
				/>
			)}
			<div className="card-body d-flex flex-column">
				<h5 className="card-title">{auction.title}</h5>
				<p className="card-text">{auction.description}</p>
				<div className="mt-auto">
					<p className="mb-1">
						<strong>Current Bid:</strong> ${auction.currentBid}
					</p>
					<p className="mb-2">
						<strong>Ends:</strong>{" "}
						{new Date(auction.endTime).toLocaleDateString()}
					</p>
					{isEnded ? (
						<span className="badge bg-secondary">Ended</span>
					) : (
						<Link
							to={`/auction/${auction._id}`}
							className="btn btn-primary w-100"
						>
							View Details
						</Link>
					)}
				</div>
			</div>
		</div>
	);
}

export default AuctionCard;
