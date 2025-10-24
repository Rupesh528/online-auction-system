import mongoose from "mongoose";

const auctionItemSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: String,
		startingPrice: { type: Number, required: true },
		currentBid: { type: Number, default: 0 },
		imageUrl: String,
		endTime: { type: Date, required: true },
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);

const AuctionItem = mongoose.model("AuctionItem", auctionItemSchema);
export default AuctionItem;
