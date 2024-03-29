import { ProductsModel } from './models/productsModels.js';
import { MockingProdsModel } from './models/mockingProdsModel.js'
import logger from '../../../utils/logger.js'
export default class ProductsDaoMongoDB {
    async getAllProducts(page = 1, limit = 5, key, value, sortField = 'price', sortOrder = 'desc') {
        try {
        const query = {};
        if (key && value ) {
            query[key] = value;
        };
        const options = {page, limit, sort: {}}
        if (sortField && sortOrder) {
            options.sort[sortField] = sortOrder;
        };
        const response = await ProductsModel.paginate(query, options);
        return response;
        } catch (error) {
        logger.error(error)
        throw new Error(error);
        };
    };
    async getProductById(id) {
        try {
        const response = await ProductsModel.findById(id);
        return response;
        } catch (error) {
        logger.error(error)
        throw new Error(error)
        };
    };
    async createProduct(obj) {
        try {
        const response = await ProductsModel.create(obj);
        return response;
        } catch (error) {
        logger.error(error)
        throw new Error(error);
        };
    };
    async updateProduct(id, obj) {
        try {
        await ProductsModel.updateOne({_id: id}, obj);
        return obj;
        } catch (error) {
        logger.error(error)
        throw new Error(error);
        };
    };
    async deleteProduct(id) {
        try {
        const response = await ProductsModel.findByIdAndDelete(id);
        return response;
        } catch (error) {
        logger.error(error)
        throw new Error(error);
        };
    };
    async getProductBySomething(key, value){
        try {
            const query = {};
            query[key] = value;
            const response = await ProductsModel.find(query)
            return response
        } catch (error) {
            logger.error(error)
            throw new Error(error);
        };
    };
    async updateProductStock (id, remainingStock){
        try {
            const prodUpdate = await ProductsModel.updateOne({ _id: id }, {$set: { stock: remainingStock} })
            return prodUpdate
        } catch (error) {
            logger.error(error)
            throw new Error(error);
        };
    };
};
