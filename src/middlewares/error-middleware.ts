import ApiError from '../exceptions/api-error';
import { NextFunction, Request, Response } from 'express';

export default (e: Error, req: Request, res: Response, next: NextFunction) => {
    if (e instanceof ApiError) {
        return res
            .status(e.status)
            .json({ message: e.message, errors: e.errors });
    }
    console.log(e);
    return res.status(500).json({ message: 'Invalid server error!' });
};
