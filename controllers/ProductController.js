import Product from '../models/Product.js';
import ProductService from '../services/ProductService.js';

class ProductController {
  async create(req, res) {
    const service = new ProductService();
    const answer = await service.create(req.body);
    res.status(201).json(answer._id);
  }

  async read(req, res) {
    const service = new ProductService();
    const answer = await service.read(req.params);
    res.status(200).json(answer);
  }

  async update(req, res) {
    let status = 200;
    const service = new ProductService();
    const answer = await service.update(req.body);
    if (Object.keys(answer)[0] === 'message') {
      status = 404;
    }
    res.status(status).json(answer);
  }

  async delete(req, res) {
    const service = new ProductService();
    const answer = await service.delete(req.params);
    res.json(product);
  }
}
export default new ProductController();
