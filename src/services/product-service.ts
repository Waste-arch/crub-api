import ApiError from '../exceptions/api-error';
import {
    ICreateProduct,
    IUpdateProduct,
    IUpdatePartProduct,
} from '../interfaces/product-interface';
import productModel from '../models/product-model';
import ProductModel from '../models/product-model';

class ProductService {
    async createProduct({ name, description, price }: ICreateProduct) {
        const product = await ProductModel.findOne({ name });
        if (product) {
            throw ApiError.BadRequest(
                `${name} - such a product already exists`,
            );
        }

        await ProductModel.create({ name, description, price });
    }

    async getAllProducts() {
        return ProductModel.find();
    }

    async getProduct(id: string) {
        const product = await ProductModel.findById(id);

        if (!product) {
            console.log(id);
            throw ApiError.BadRequest(`Product with '${id} doesn't exist'`);
        }

        return product;
    }

    async deleteProduct(id: string) {
        const product = await ProductModel.findByIdAndDelete(id);

        if (!product) {
            throw ApiError.BadRequest(`Product doesn't exist'`);
        }

        return product;
    }

    async updateProduct(id: string, productInfo: IUpdateProduct) {
        const { name } = productInfo;

        const isUniqueProduct = await productModel.findOne({ name });

        if (isUniqueProduct) {
            throw ApiError.BadRequest(
                `Product with such name '${name}' already exists'`,
            );
        }

        const updatedProduct = await productModel.findByIdAndUpdate(
            id,
            productInfo,
        );

        if (!updatedProduct) {
            throw ApiError.BadRequest(`Product doesn't exist'`);
        }

        return updatedProduct;
    }

    async updatePartProduct(id: string, productInfo: IUpdatePartProduct) {
        if (Object.keys(productInfo).length === 0) {
            throw ApiError.BadRequest(
                `Please provide the product data to be updated.`,
            );
        }

        const { name } = productInfo;

        const isUniqueProduct = await productModel.findOne({ name });

        if (isUniqueProduct) {
            throw ApiError.BadRequest(
                `Product with name '${name}' already exists.`,
            );
        }

        const updatedProduct = await productModel.findByIdAndUpdate(
            id,
            productInfo,
            { new: true },
        );

        if (!updatedProduct) {
            throw ApiError.BadRequest(`Product with ID '${id}' doesn't exist.`);
        }

        return updatedProduct;
    }
}

export default new ProductService();
