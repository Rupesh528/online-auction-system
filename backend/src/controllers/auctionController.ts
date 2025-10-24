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
		const auctions = await AuctionItem.find()
			.populate("createdBy", "name email")
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
		const auction = await AuctionItem.findById(req.params.id).populate(
			"createdBy",
			"name email"
		);
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

		if (amount <= auction.currentBid) {
			return res.status(400).json({
				message: "Bid must be higher than current bid",
				currentBid: auction.currentBid,
			});
		}

		auction.currentBid = amount;
		await auction.save();

		res.json({
			message: "Bid placed successfully",
			auction,
		});
	} catch (err) {
		const error = err as Error;
		res.status(500).json({ message: error.message || "Failed to place bid" });
	}
};
