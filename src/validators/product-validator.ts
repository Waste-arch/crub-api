import { ZodType } from 'zod';
import { NextFunction, Request, Response } from 'express';
import ApiError from '../exceptions/api-error';

class ProductValidator {
    validateProduct(schema: ZodType<any>) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                schema.parse(req.body);
                next();
            } catch (e) {
                // @ts-ignore
                next(ApiError.BadRequest('Validation error', e));
            }
        };
    }
}

export default new ProductValidator();
