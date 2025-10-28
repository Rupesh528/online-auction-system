import { Request, Response } from "express";
interface AuthRequest extends Request {
    user?: {
        id: string;
    };
}
export declare const updateAuction: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createAuction: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAuctions: (_req: Request, res: Response) => Promise<void>;
export declare const getAuctionById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const placeBid: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getGlobalStats: (_req: Request, res: Response) => Promise<void>;
export declare const getUserStats: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export {};
//# sourceMappingURL=auctionController.d.ts.map