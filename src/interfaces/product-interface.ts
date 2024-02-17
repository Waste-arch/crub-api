export interface ICreateProduct {
    name: string;
    description: string;
    price: number;
}

export interface IUpdateProduct {
    name: string;
    description: string;
    price: number;
}

export interface IUpdatePartProduct {
    name?: string;
    description?: string;
    price?: number;
}
