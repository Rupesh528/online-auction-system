import { Request, Response } from "express";
import AuctionItem from "../models/AuctionItem.js";

interface CreateAuctionBody {
	title: string;
	description?: string;
	startingPrice: number;
	endTime: Date;
	imageUrl?: string;
}

interface AuthRequest extends Request {
	user?: {
		id: string;
	};
}

interface BidRequestBody {
	amount: number;
}

interface UpdateAuctionBody {
	title?: string;
	description?: string;
	imageUrl?: string;
	endTime?: Date;
}

export const updateAuction = async (req: AuthRequest, res: Response) => {
	try {
		if (!req.user?.id) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		const auction = await AuctionItem.findById(req.params.id);
		if (!auction) {
			return res.status(404).json({ message: "Auction not found" });
		}

		// Check if user owns this auction
		if (auction.createdBy.toString() !== req.user.id) {
			return res
				.status(403)
				.json({ message: "You can only modify your own auctions" });
		}

		// Don't allow modifications if auction has bids above starting price
		if (auction.currentBid > auction.startingPrice) {
			return res
				.status(400)
				.json({ message: "Cannot modify auction after bids have been placed" });
		}

		const updates = req.body as UpdateAuctionBody;

		// Don't allow modification of critical fields
		delete (updates as any).startingPrice;
		delete (updates as any).currentBid;
		delete (updates as any).createdBy;

		// If updating endTime, ensure it's in the future
		if (updates.endTime && new Date(updates.endTime) <= new Date()) {
			return res
				.status(400)
				.json({ message: "End time must be in the future" });
		}

		const updatedAuction = await AuctionItem.findByIdAndUpdate(
			req.params.id,
			{ $set: updates },
			{ new: true, runValidators: true }
		).populate("createdBy", "name email");

		res.json(updatedAuction);
	} catch (err) {
		const error = err as Error;
		res
			.status(500)
			.json({ message: error.message || "Failed to update auction" });
	}
};

export const createAuction = async (req: AuthRequest, res: Response) => {
	try {
		const { title, description, startingPrice, endTime, imageUrl } =
			req.body as CreateAuctionBody;

		if (!req.user?.id) {
			console.log("Authentication failed:", { user: req.user });
			return res.status(401).json({ message: "Unauthorized" });
		}

		console.log("Creating auction with data:", {
			title,
			description,
			startingPrice,
			endTime,
			imageUrl,
			createdBy: req.user.id,
		});

		const newAuction = await AuctionItem.create({
			title,
			description,
			startingPrice,
			currentBid: startingPrice,
			endTime: new Date(endTime),
			imageUrl,
			createdBy: req.user.id,
		});

		console.log("Auction created successfully:", newAuction);
		res.status(201).json(newAuction);
	} catch (err) {
		const error = err as Error;
		console.error("Failed to create auction:", error);
		res
			.status(500)
			.json({ message: error.message || "Failed to create auction" });
	}
};

export const getAuctions = async (_req: Request, res: Response) => {
	try {
		// populate createdBy and lastBidBy so frontend can determine winners
		const auctions = await AuctionItem.find()
			.populate("createdBy", "name email")
			.populate("lastBidBy", "name email")
			.populate("bids.user", "name email")
			.sort({ createdAt: -1 });
		res.json(auctions);
	} catch (err) {
		const error = err as Error;
		res
			.status(500)
			.json({ message: error.message || "Failed to fetch auctions" });
	}
};

export const getAuctionById = async (req: Request, res: Response) => {
	try {
		const auction = await AuctionItem.findById(req.params.id)
			.populate("createdBy", "name email")
			.populate("lastBidBy", "name email")
			.populate("bids.user", "name email");
		if (!auction) {
			return res.status(404).json({ message: "Auction not found" });
		}
		res.json(auction);
	} catch (err) {
		const error = err as Error;
		res
			.status(500)
			.json({ message: error.message || "Failed to fetch auction" });
	}
};

export const placeBid = async (req: AuthRequest, res: Response) => {
	try {
		if (!req.user?.id) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		const { amount } = req.body as BidRequestBody;

		if (typeof amount !== "number" || amount <= 0) {
			return res.status(400).json({ message: "Invalid bid amount" });
		}

		// Load auction to validate existence/owner/end time before attempting atomic update
		const auction = await AuctionItem.findById(req.params.id);
		if (!auction) {
			return res.status(404).json({ message: "Auction not found" });
		}

		// Check if user is trying to bid on their own auction
		if (auction.createdBy.toString() === req.user.id) {
			return res
				.status(403)
				.json({ message: "You cannot bid on your own auction" });
		}

		if (new Date(auction.endTime) < new Date()) {
			return res.status(400).json({ message: "Auction has ended" });
		}

		// Atomic update: only set new currentBid if the provided amount is greater than currentBid
		const updated = await AuctionItem.findOneAndUpdate(
			{ _id: req.params.id, currentBid: { $lt: amount } },
			{
				$set: { currentBid: amount, lastBidBy: req.user.id },
				$push: { bids: { user: req.user.id, amount } },
			},
			{ new: true }
		)
			.populate("createdBy", "name email")
			.populate("lastBidBy", "name email")
			.populate("bids.user", "name email");

		if (!updated) {
			// If updated is null, someone else likely beat this bid (or the amount wasn't higher)
			const fresh = await AuctionItem.findById(req.params.id);
			return res.status(409).json({
				message: "Bid not accepted. Current highest bid has changed.",
				currentBid: fresh?.currentBid,
			});
		}

		res.json({ message: "Bid placed successfully", auction: updated });
	} catch (err) {
		const error = err as Error;
		res.status(500).json({ message: error.message || "Failed to place bid" });
	}
};

export const getGlobalStats = async (_req: Request, res: Response) => {
	try {
		// Get total auctions
		const totalAuctions = await AuctionItem.countDocuments();

		// Get active auctions (not ended)
		const activeAuctions = await AuctionItem.countDocuments({
			endTime: { $gt: new Date() },
		});

		// Get total users (from auctions created)
		const totalUsers = await AuctionItem.distinct("createdBy").then(
			(users) => users.length
		);

		// Get total bids placed
		const totalBids = await AuctionItem.aggregate([
			{ $unwind: "$bids" },
			{ $count: "totalBids" },
		]).then((result) => (result.length > 0 ? result[0].totalBids : 0));

		// Get total value of all auctions
		const totalValue = await AuctionItem.aggregate([
			{ $group: { _id: null, total: { $sum: "$currentBid" } } },
		]).then((result) => (result.length > 0 ? result[0].total : 0));

		const stats = {
			totalAuctions,
			activeAuctions,
			totalUsers,
			totalBids,
			totalValue,
		};

		res.json(stats);
	} catch (err) {
		const error = err as Error;
		res
			.status(500)
			.json({ message: error.message || "Failed to fetch global stats" });
	}
};

export const getUserStats = async (req: AuthRequest, res: Response) => {
	try {
		if (!req.user?.id) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		const userId = req.user.id;

		// Get all auctions created by user
		const userAuctions = await AuctionItem.find({ createdBy: userId });

		// Calculate statistics
		const totalAuctions = userAuctions.length;
		const activeAuctions = userAuctions.filter(
			(auction) => new Date(auction.endTime) > new Date()
		).length;
		const endedAuctions = totalAuctions - activeAuctions;

		// Calculate total value of auctions created (sum of current bids)
		const totalValueCreated = userAuctions.reduce(
			(sum, auction) => sum + auction.currentBid,
			0
		);

		// Get auctions where user has placed bids (not their own)
		const auctionsWithUserBids = await AuctionItem.find({
			"bids.user": userId,
			createdBy: { $ne: userId },
		});

		const totalBidsPlaced = auctionsWithUserBids.reduce(
			(sum, auction) =>
				sum +
				auction.bids.filter((bid) => bid.user.toString() === userId).length,
			0
		);

		// Get auctions won by user (ended auctions where user is lastBidBy)
		const wonAuctions = await AuctionItem.find({
			lastBidBy: userId,
			endTime: { $lt: new Date() },
		});

		const totalAuctionsWon = wonAuctions.length;
		const totalValueWon = wonAuctions.reduce(
			(sum, auction) => sum + auction.currentBid,
			0
		);

		const stats = {
			totalAuctions,
			activeAuctions,
			endedAuctions,
			totalValueCreated,
			totalBidsPlaced,
			totalAuctionsWon,
			totalValueWon,
		};

		res.json(stats);
	} catch (err) {
		const error = err as Error;
		res
			.status(500)
			.json({ message: error.message || "Failed to fetch user stats" });
	}
};
