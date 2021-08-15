import Product from '../models/Product.js';

class ProductService {
  constructor() {}

  create(params) {
    const {
      sku, type, name, price,
    } = params;
    let product = {};
    return (product = Product.create({
      sku, type, name, price,
    }));
  }

  read(params) {
    let product = {};
    switch (Object.keys(params)[0]) {
      case 'id':
        return (product = Product.findById(params.id));
        break;
      case 'sku':
        return (product = Product.find(params));
        break;
      default:
        return (product = Product.find(params));
        break;
    }
  }

  update(params) {
    let product = {};
    if (params._id) {
      return (product = Product.findByIdAndUpdate(params._id, params, {
        new: true,
      }));
    }
    if (params.sku) {
      return (product = Product.findOneAndUpdate(params.sku, params, {
        new: true,
      }));
    }
    if (!params._id && !params.sku) {
      return (product = { message: 'Content for update not found' });
    }
  }

  delete(params) {
    let product = {};
    switch (Object.keys(params)[0]) {
      case 'id':
        return (product = Product.findByIdAndDelete(params.id));
        break;
      case 'sku':
        return (product = Product.findOneAndDelete(params));
        break;
    }
  }
}
export default ProductService;
