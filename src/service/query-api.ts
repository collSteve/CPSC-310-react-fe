import { ValidQueryResult } from "../components/result-table";
import { ResponseResult, ResponseStatus } from "./api-consts";
import { apiClient } from "./axios-client";

export type QueryResponseResult = ResponseResult<ValidQueryResult | string>;

export async function submitQuery(query: any): Promise<QueryResponseResult> {
    const res = await apiClient.post('/query', query);
    if (res.status === 200) {
        return {type: ResponseStatus.Success, data: res.data.result};
    }
    else {
        return {type: ResponseStatus.Error, data: res.data.error};
    }
}