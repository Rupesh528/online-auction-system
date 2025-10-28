import mongoose from "mongoose";
declare const AuctionItem: mongoose.Model<{
    title: string;
    startingPrice: number;
    currentBid: number;
    endTime: NativeDate;
    createdBy: mongoose.Types.ObjectId;
    bids: mongoose.Types.DocumentArray<{
        createdAt: NativeDate;
        user?: mongoose.Types.ObjectId | null;
        amount?: number | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        createdAt: NativeDate;
        user?: mongoose.Types.ObjectId | null;
        amount?: number | null;
    }> & {
        createdAt: NativeDate;
        user?: mongoose.Types.ObjectId | null;
        amount?: number | null;
    }>;
    description?: string | null;
    imageUrl?: string | null;
    lastBidBy?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    title: string;
    startingPrice: number;
    currentBid: number;
    endTime: NativeDate;
    createdBy: mongoose.Types.ObjectId;
    bids: mongoose.Types.DocumentArray<{
        createdAt: NativeDate;
        user?: mongoose.Types.ObjectId | null;
        amount?: number | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        createdAt: NativeDate;
        user?: mongoose.Types.ObjectId | null;
        amount?: number | null;
    }> & {
        createdAt: NativeDate;
        user?: mongoose.Types.ObjectId | null;
        amount?: number | null;
    }>;
    description?: string | null;
    imageUrl?: string | null;
    lastBidBy?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    title: string;
    startingPrice: number;
    currentBid: number;
    endTime: NativeDate;
    createdBy: mongoose.Types.ObjectId;
    bids: mongoose.Types.DocumentArray<{
        createdAt: NativeDate;
        user?: mongoose.Types.ObjectId | null;
        amount?: number | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        createdAt: NativeDate;
        user?: mongoose.Types.ObjectId | null;
        amount?: number | null;
    }> & {
        createdAt: NativeDate;
        user?: mongoose.Types.ObjectId | null;
        amount?: number | null;
    }>;
    description?: string | null;
    imageUrl?: string | null;
    lastBidBy?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    title: string;
    startingPrice: number;
    currentBid: number;
    endTime: NativeDate;
    createdBy: mongoose.Types.ObjectId;
    bids: mongoose.Types.DocumentArray<{
        createdAt: NativeDate;
        user?: mongoose.Types.ObjectId | null;
        amount?: number | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        createdAt: NativeDate;
        user?: mongoose.Types.ObjectId | null;
        amount?: number | null;
    }> & {
        createdAt: NativeDate;
        user?: mongoose.Types.ObjectId | null;
        amount?: number | null;
    }>;
    description?: string | null;
    imageUrl?: string | null;
    lastBidBy?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    title: string;
    startingPrice: number;
    currentBid: number;
    endTime: NativeDate;
    createdBy: mongoose.Types.ObjectId;
    bids: mongoose.Types.DocumentArray<{
        createdAt: NativeDate;
        user?: mongoose.Types.ObjectId | null;
        amount?: number | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        createdAt: NativeDate;
        user?: mongoose.Types.ObjectId | null;
        amount?: number | null;
    }> & {
        createdAt: NativeDate;
        user?: mongoose.Types.ObjectId | null;
        amount?: number | null;
    }>;
    description?: string | null;
    imageUrl?: string | null;
    lastBidBy?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    title: string;
    startingPrice: number;
    currentBid: number;
    endTime: NativeDate;
    createdBy: mongoose.Types.ObjectId;
    bids: mongoose.Types.DocumentArray<{
        createdAt: NativeDate;
        user?: mongoose.Types.ObjectId | null;
        amount?: number | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        createdAt: NativeDate;
        user?: mongoose.Types.ObjectId | null;
        amount?: number | null;
    }> & {
        createdAt: NativeDate;
        user?: mongoose.Types.ObjectId | null;
        amount?: number | null;
    }>;
    description?: string | null;
    imageUrl?: string | null;
    lastBidBy?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default AuctionItem;
//# sourceMappingURL=AuctionItem.d.ts.map