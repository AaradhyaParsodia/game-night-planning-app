import mongoose from "mongoose";
import Games from "./games.js";
import Users from "./user.js";

const gameNightSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 70,
        minLength: 2
    },
    time: {
        type: Date,
        default: Date.now
    },
    location: {
        type: String,
        default: "India",
        required: true,
    },
    maxPlayers: {
        type: Number,
        required: true,
        default: 6
    },
    gameCode:{
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    gameId: {
        type: mongoose.Types.ObjectId,
        ref: Games,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: Users,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model("GameNights", gameNightSchema);