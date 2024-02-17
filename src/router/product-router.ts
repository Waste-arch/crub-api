import { Router } from 'express';
import productController from '../controllers/product-controller';
import productValidator from '../validators/product-validator';
import { ProductSchema } from '../schemas/product-schema';

const productRouter = Router();

// All Swagger notations were created for testing purposes. I didn't add any specifics.

productRouter
    /**
     * @swagger
     * /products:
     *  post:
     *    summary: Create Product
     *    responses:
     *      '200':
     *        description: Product created!
     */
    .post(
        '/',
        productValidator.validateProduct(ProductSchema.CreateProduct),
        productController.createProduct,
    )
    /**
     * @swagger
     * /products:
     *  get:
     *    summary: Get all products
     *    responses:
     *      '200':
     *        description: All products
     */
    .get('/', productController.getAllProducts)
    /**
     * @swagger
     * /products/:id:
     *  get:
     *    summary: Get a product by ID
     *    responses:
     *      '200':
     *        description: a specific product
     */
    .get('/:id', productController.getProduct)
    /**
     * @swagger
     * /products/:id:
     *  put:
     *    summary: Update a hole product by ID
     *    responses:
     *      '200':
     *        description: Product has been updated
     */
    .put(
        '/:id',
        productValidator.validateProduct(ProductSchema.UpdateProduct),
        productController.updateProduct,
    )
    /**
     * @swagger
     * /products/:id:
     *  patch:
     *    summary: Update a part product by ID
     *    responses:
     *      '200':
     *        description: Product has been updated
     */
    .patch(
        '/:id',
        productValidator.validateProduct(ProductSchema.UpdatePartProduct),
        productController.updatePartProduct,
    )
    /**
     * @swagger
     * /products/:id:
     *  delete:
     *    summary: Delete a product by ID
     *    responses:
     *      '200':
     *        description: Product has been deleted
     */
    .delete('/:id', productController.deleteProduct);

export default productRouter;
