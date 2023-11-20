import {ResponseResult, ResponseStatus} from "./api-consts.ts";
import {apiClient} from "./axios-client.ts";
import { AxiosError } from "axios";

export type AddDatasetResponseResult = ResponseResult<string>;

export async function addDataset(dataset_id: string, dataset_content: ArrayBuffer, dataset_kind: string): Promise<AddDatasetResponseResult>{
    try {
        await apiClient.put("/dataset/" + dataset_id + "/" + dataset_kind, dataset_content);
        return {type: ResponseStatus.Success, data: "Added dataset: " + dataset_id};
    } catch (err) {
        const axiosError = err as AxiosError;
        const errorMessage = (axiosError.response?.data) as {error: string}
        console.log(errorMessage.error);
        return {type: ResponseStatus.Error, data: errorMessage.error};
    }
}