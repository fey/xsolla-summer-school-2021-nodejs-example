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
        const sortParam = {};
        try {
            if (filter.sku) {
                query.sku = filter.sku;
            }
            if (filter.type) {
                const queryParams = filter.type;
                const paramsArray = queryParams.split(",");
                query.$or = [{ type: paramsArray[0] }, { type: paramsArray[1] }];
            }
            if (filter.sort) {
                const queryParams = filter.sort;
                const paramsArray = queryParams.split("_");
                console.log("paramsArray[1]:", paramsArray[1]);
                switch (paramsArray[1]) {
                    case "asc":
                        sortParam[paramsArray[0]] = 1;
                        console.log("asc:", sortParam);
                        break;
                    case "desc":
                        sortParam[paramsArray[0]] = -1;
                        console.log("desc:", sortParam);
                        break;
                    default:
                        sortParam[paramsArray[0]] = 1;
                        console.log("default", sortParam);
                        break;
                }
            }
            const product = await Product.find(query).sort(sortParam);
            return res.json(product);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
export default new ProductController();
