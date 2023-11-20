import { AxiosError } from "axios";
import { ResponseResult, ResponseStatus } from "./api-consts";
import { InsightDataset } from "../components/dataset-dropdown.tsx";
import { apiClient } from "./axios-client";

export type ListDatasetsResponseResult = ResponseResult<InsightDataset[] | string>;

export async function getDatasets(): Promise<ListDatasetsResponseResult> {
    try {
        const res = await apiClient.get('/datasets');
        return {type: ResponseStatus.Success, data: res.data.result};
    } catch (err) {
        const axiosError = err as AxiosError;
        const errorMessage = (axiosError.response?.data) as {error: string}
        return {type: ResponseStatus.Error, data: errorMessage.error};
    }
}