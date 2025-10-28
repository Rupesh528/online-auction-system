import mongoose from "mongoose";
const auctionItemSchema = new mongoose.Schema({
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
    // Track bids and the last bidder so we can determine a winner when auction ends
    bids: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            amount: { type: Number },
            createdAt: { type: Date, default: Date.now },
        },
    ],
    lastBidBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });
const AuctionItem = mongoose.model("AuctionItem", auctionItemSchema);
export default AuctionItem;
//# sourceMappingURL=AuctionItem.js.map