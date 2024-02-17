import { NextFunction, Request, Response } from 'express';
import {
    ICreateProduct,
    IUpdatePartProduct,
    IUpdateProduct,
} from '../interfaces/product-interface';
import productService from '../services/product-service';

class ProductController {
    async createProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const data: ICreateProduct = req.body;

            const createdProduct = await productService.createProduct(data);

            return res.json({
                message: 'Product created!',
                details: createdProduct,
            });
        } catch (e) {
            return next(e);
        }
    }

    async getAllProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const products = await productService.getAllProducts();
            return res.json(products);
        } catch (e) {
            return next(e);
        }
    }

    async getProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const productId: string = req.params.id;
            const product = await productService.getProduct(productId);
            res.json(product);
        } catch (e) {
            next(e);
        }
    }

    async deleteProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const productId: string = req.params.id;
            const deletedProduct =
                await productService.deleteProduct(productId);
            res.json({
                message: `Product '${deletedProduct.name}' is deleted`,
            });
        } catch (e) {
            next(e);
        }
    }

    async updateProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const data: IUpdateProduct = req.body;
            const productId: string = req.params.id;

            const updatedProduct = await productService.updateProduct(
                productId,
                data,
            );

            res.json({
                message: 'Product has been updated',
                details: updatedProduct,
            });
        } catch (e) {
            next(e);
        }
    }

    async updatePartProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const data: IUpdatePartProduct = req.body;
            const productId: string = req.params.id;

            const updatedProduct = await productService.updatePartProduct(
                productId,
                data,
            );

            res.json({
                message: 'Product has been updated',
                details: updatedProduct,
            });
        } catch (e) {
            next(e);
        }
    }
}

export default new ProductController();
