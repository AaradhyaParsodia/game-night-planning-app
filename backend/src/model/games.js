import mongoose from "mongoose";

const gamesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
});