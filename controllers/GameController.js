import Game from "../models/Game.js";
class GameController {
    async create(req, res) {
        try {
            const { sku, type, name, edition, description, drm } = req.body;
            const game = await Game.create({ sku, type, name, edition, description, drm });
            res.json(game);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    async read(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ message: "invalid id" });
            }
            const game = await Game.findById(id);
            return res.json(game);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    async update(req, res) {
        try {
            const game = req.body;
            if (!game._id) {
                res.status(400).json({ message: "id not found" });
            }
            const updatedData = await Game.findByIdAndUpdate(game._id, game, { new: true });
            return res.json(updatedData);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ message: "invalid id" });
            }
            const game = await Game.findByIdAndDelete(id);
            return res.json(game);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    async getAll(req, res) {
        try {
            const games = await Game.find({});
            return res.json(games);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
export default new GameController();
