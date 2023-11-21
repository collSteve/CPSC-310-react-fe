import {useState} from 'react';
import {Flex, InputGroup, InputLeftAddon, Select, Button} from "@chakra-ui/react";
import {getDatasets} from "../service/listdatasets-api.ts";
import {ResponseStatus} from "../service/api-consts.ts";
import { DataSetContextType } from '../contexts/dataset-type-context.ts';
import { DataSetType } from '../shared/dataset-consts.ts';

export interface InsightDataset {
    id: string;
    kind: string;
    numRows: number;
}

export interface DatasetDropdownProps {
    selectedDatasetContext: DataSetContextType;
    setSelectedDatasetContext(datasetContext: DataSetContextType): void;
}

export default function DatasetDropdownComponent({selectedDatasetContext, setSelectedDatasetContext}: DatasetDropdownProps) {

    const [datasetContexts, setDatasetContexts] = useState<DataSetContextType[]>([]);
    // copilot generated
    const refreshDatasets = () => {
        try {
            getDatasets().then((res) => {
                console.log(res);
                if (res.type === ResponseStatus.Success && res.data && typeof res.data !== "string") {
                    const insight_datasets = res.data as InsightDataset[];
                    const newDatasetContexts: DataSetContextType[] = [];
                    insight_datasets.forEach((dataset) => {
                        if (dataset.kind == "sections") {
                            newDatasetContexts.push({type: DataSetType.Sections, datasetPrefix: dataset.id});
                        }
                        else if (dataset.kind == "rooms") {
                            newDatasetContexts.push({type: DataSetType.Rooms, datasetPrefix: dataset.id});
                        }
                    });
                    setDatasetContexts(newDatasetContexts);
                } else {
                    setDatasetContexts([]);
                }
            });
        } catch (e) {
            console.log(e);
            setDatasetContexts([]);
        }
    };

    return (
        <Flex flexDirection="row" style={{fontWeight: 'bold'}}>
            <InputGroup>
                <InputLeftAddon children={"Select Dataset:"} />
                <Select placeholder='choose a dataset to query from'
                        width="fit-content"
                        value={selectedDatasetContext.datasetPrefix}
                        onChange={(event) => {
                            datasetContexts.forEach((context) => {
                                if (context.datasetPrefix == event.target.value) {
                                    setSelectedDatasetContext(context);
                                }
                            })
                        }}>
                    {datasetContexts.map((context) => (
                        <option key={context.datasetPrefix} value={context.datasetPrefix}>
                            {`${context.datasetPrefix}, type: <${context.type}>`}
                        </option>
                    ))}
                </Select>
                <Button onClick={refreshDatasets}>Refresh</Button>
            </InputGroup>
        </Flex>
    );
}