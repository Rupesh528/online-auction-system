import express from "express";
import {
	createAuction,
	getAuctions,
	getAuctionById,
	placeBid,
	updateAuction,
} from "../controllers/auctionController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/", getAuctions);
router.get("/:id", getAuctionById);

// Protected routes (require authentication)
router.post("/", auth, createAuction);
router.post("/:id/bid", auth, placeBid);
router.put("/:id", auth, updateAuction);

export default router;
