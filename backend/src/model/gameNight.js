import mongoose from "mongoose";

const gameNightSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 70
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
    gameDetails: {
        type: mongoose.Types.ObjectId,
        ref: Games,
        required: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: Users,
        required: true
    }
});

export default mongoose.model("GameNights", gameNightSchema);