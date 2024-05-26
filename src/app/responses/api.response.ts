export interface ApiResponse<T> {
    message: string;
    status: string;
    requestMethod: string;
    statusCode: string;
    path: string;
    timeStamp: string;
    data: T;
}