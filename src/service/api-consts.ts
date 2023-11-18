export enum ResponseStatus {
    Success,
    Error
}

export type ResponseResult<T> = {type: ResponseStatus, data: T};