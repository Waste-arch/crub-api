import { z } from 'zod';

const stringConfig = {
    required_error: 'Is is required',
    invalid_type_error: 'Invalid type',
};

const numberConfig = {
    invalid_type_error: 'Invalid type',
    required_error: 'Is required',
    positive_message: ' should be a positive number',
};

const productCore = z.object({
    name: z.string(stringConfig).min(4).max(50),
    description: z.string(stringConfig).min(10).max(200),
    price: z
        .number(numberConfig)
        .positive({ message: numberConfig.positive_message }),
});

export const ProductSchema = {
    CreateProduct: productCore,
    UpdateProduct: productCore,
    UpdatePartProduct: productCore.partial(),
};
