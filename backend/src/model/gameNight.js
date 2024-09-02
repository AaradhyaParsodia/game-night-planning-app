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
    gameDetails: {
        type: mongoose.Types.ObjectId,
        ref: AllGames,
        required: true
    }
});

export default mongoose.model("GameNights", gameNightSchema);