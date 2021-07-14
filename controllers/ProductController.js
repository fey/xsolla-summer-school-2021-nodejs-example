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
        const product = req.body;
        try {
            if (!product._id && !product.sku) {
                console.log("Error: product not found");
                res.status(400).json({ message: "product not found" });
            }
            if (product._id) {
                const updatedData = await Product.findByIdAndUpdate(product._id, product, {
                    new: true,
                });
                return res.status(201).json(updatedData);
            }
            if (product.sku) {
                const updatedData = await Product.findOneAndUpdate(product.sku, product, {
                    new: true,
                });
                return res.status(201).json(updatedData);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
    async delete(req, res) {
        const filter = req.query;
        const query = {};
        const { id } = req.params;
        try {
            if (!id && !filter.sku) {
                res.status(400).json({ message: "Please check the params" });
            }
            if (id) {
                const product = await Product.findByIdAndDelete(id);
                return res.json(product);
            }
            if (filter.sku) {
                query.sku = filter.sku;
                const product = await Product.findOneAndDelete(query);
                return res.json(product);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async getAll(req, res) {
        const filter = req.query;
        const query = {};
        try {
            if (filter.sku) {
                query.sku = filter.sku;
            }
            if (filter.type) {
                const queryParams = filter.type;
                const paramsArray = queryParams.split(",");
                const product = await Product.find({
                    $or: [{ type: paramsArray[0] }, { type: paramsArray[1] }],
                });
                return res.json(product);
            }
            if (filter.sort) {
                const sortParam = filter.sort.split("_");
                switch (sortParam[1]) {
                    case "desc":
                        const product1 = await Product.find({}).sort({ price: -1 });
                        return res.json(product1);
                    default:
                        const product2 = await Product.find({}).sort({ price: 1 });
                        return res.json(product2);
                }
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
export default new ProductController();
