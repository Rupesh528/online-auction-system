import express from "express";
import { createAuction, getAuctions, getAuctionById, placeBid, updateAuction, getUserStats, getGlobalStats, } from "../controllers/auctionController.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();
// Public routes
router.get("/", getAuctions);
router.get("/:id", getAuctionById);
router.get("/stats/global", getGlobalStats);
// Protected routes (require authentication)
router.post("/", auth, createAuction);
router.post("/:id/bid", auth, placeBid);
router.put("/:id", auth, updateAuction);
router.get("/stats/user", auth, getUserStats);
export default router;
//# sourceMappingURL=auction.js.map