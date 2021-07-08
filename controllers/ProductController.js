import Product from "../models/Product.js";
class ProductController {
    async create(req, res) {
        try {
            const { sku, type, name, price } = req.body;
            const product = await Product.create({ sku, type, name, price });
            res.json(product._id);
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
            const product = await Product.findById(id);
            return res.json(product);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    async update(req, res) {
        try {
            const product = req.body;
            if (!product._id) {
                console.log(product._id);
                res.status(400).json({ message: "id not found" });
            }
            const updatedData = await Product.findByIdAndUpdate(product._id, product, {
                new: true,
            });
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
            const product = await Product.findByIdAndDelete(id);
            return res.json(product);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    async getAll(req, res) {
        try {
            const product = await Product.find({});
            return res.json(product);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
export default new ProductController();
