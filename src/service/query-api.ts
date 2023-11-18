import { AxiosError } from "axios";
import { ValidQueryResult } from "../components/result-table";
import { ResponseResult, ResponseStatus } from "./api-consts";
import { apiClient } from "./axios-client";

export type QueryResponseResult = ResponseResult<ValidQueryResult | string>;

export async function submitQuery(query: any): Promise<QueryResponseResult> {
    try {
        const res = await apiClient.post('/query', query);
        return {type: ResponseStatus.Success, data: res.data.result};
    } catch (err) {
        const axiosError = err as AxiosError;
        const errorMessage = (axiosError.response?.data) as {error: string}
        return {type: ResponseStatus.Error, data: errorMessage.error};
    }
    
}