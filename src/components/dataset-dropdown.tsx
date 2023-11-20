import {useState} from 'react';
import {Flex, InputGroup, InputLeftAddon, Select, Button} from "@chakra-ui/react";
import {getDatasets} from "../service/listdatasets-api.ts";
import {ResponseStatus} from "../service/api-consts.ts";

export interface InsightDataset {
    id: string;
    kind: string;
    numRows: number;
}

export interface DatasetDropdownProps {
    selectedDataset: string;
    setSelectedDataset: (dataset: string) => void;
}

export default function DatasetDropdownComponent({selectedDataset, setSelectedDataset}: DatasetDropdownProps) {
    const [datasetNames, setDatasetNames] = useState<string[]>([]);
    // copilot generated
    const refreshDatasets = () => {
        try {
            getDatasets().then((res) => {
                console.log(res);
                if (res.type === ResponseStatus.Success && res.data && typeof res.data !== "string") {
                    let insight_datasets = res.data as InsightDataset[];
                    let dataset_names = insight_datasets.map((dataset) => dataset.id);
                    console.log("dataset_names", dataset_names);
                    setDatasetNames(dataset_names);
                } else {
                    setDatasetNames([]);
                }
            });
        } catch (e) {
            console.log(e);
            setDatasetNames([]);
        }
    };

    return (
        <Flex flexDirection="row" style={{fontWeight: 'bold'}}>
            <InputGroup>
                <InputLeftAddon children={"Selected Dataset for Querying:"} />
                <Select placeholder='choose a dataset to query from'
                        width="fit-content"
                        value={selectedDataset}
                        onChange={(event) => {
                            setSelectedDataset(event.target.value);
                        }}>
                    {datasetNames.map((dataset) => (
                        <option key={dataset} value={dataset}>
                            {dataset}
                        </option>
                    ))}
                </Select>
                <Button onClick={refreshDatasets}>Refresh</Button>
            </InputGroup>
        </Flex>
    );
}