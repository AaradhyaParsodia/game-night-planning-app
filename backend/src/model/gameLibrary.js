import mongoose from "mongoose";

const gameLibrarySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: Users,
        required: true,
        index: true
    },
    allGamesId: {
        type: mongoose.Types.ObjectId,
        ref: Games,
        required: true,
        index: true
    },
    markGame: {
        type: String,
        enum: ["owned", "wishlist"],
        default: "wishlist"
    },
    playerCount: {
        type: String,
        maxLength: 50,
        trim: true
    },
    duration: {
        type: String,
        maxLength: 50,
        trim: true
    },
    complexity: {
        type: String,
        enum: ["easy", "medium", "hard"],
        default: "easy"
    }
});