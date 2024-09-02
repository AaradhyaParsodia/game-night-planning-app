import mongoose from "mongoose";

// const personalSavedGameSchema = new mongoose.Schema({
//     type: mongoose.Types.ObjectId,
//     ref: GameLibrary,
//     required: true
// });

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30,
        index: true
    },
    hash: {
        type: String,
        required: true,
    },
    // gameLibrary: {
    //     type: [personalSavedGameSchema],
    // }
    }, {
        timestamps: true
    }
);

export default mongoose.model("Users", userSchema);