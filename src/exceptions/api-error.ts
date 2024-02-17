class ApiError extends Error {
    public errors: string[];
    public status: number;

    constructor(status: number, message: string, errors: string[] = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static BadRequest(message: string, errors: string[] = []): ApiError {
        return new ApiError(400, message, errors);
    }
}

export default ApiError;
