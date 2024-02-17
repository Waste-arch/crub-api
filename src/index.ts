import express, { Express } from 'express';
import * as dotenv from 'dotenv';
import productRouter from './router/product-router';
import { connect } from 'mongoose';
import errorMiddleware from './middlewares/error-middleware';
import swaggerDocs from './utils/swagger';

dotenv.config();

const PORT: string = process.env.PORT || '5000';

const app: Express = express();

app.use(express.json());

app.use('/api/v1/products', productRouter);
app.use(errorMiddleware);

const start = async () => {
    try {
        await connect(process.env.MONGO_URL || '');
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
        swaggerDocs(app, PORT);
    } catch (e) {
        console.log(e);
    }
};

start();
