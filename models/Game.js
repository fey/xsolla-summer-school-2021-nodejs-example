import mongoose from "mongoose";

const Game = new mongoose.Schema({
    sku: { type: String, required: true },
    type: { type: String, required: true },
    name: { type: String, required: true },
    edition: { type: String, required: true },
    description: { type: String, required: true },
    drm: { type: String, required: true },
});

export default mongoose.model("Game", Game);
