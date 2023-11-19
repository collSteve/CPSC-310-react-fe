import { useState } from 'react';
import {Flex, InputLeftAddon, InputGroup, Select} from "@chakra-ui/react";
export interface DatasetName {
    datasets: string[];
}

export default function DatasetDropdownComponent({ datasets }: DatasetName) {
    const [selectedDataset, setSelectedDataset] = useState<string>(datasets[0]);
    // copilot generated
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
                    {datasets.map((dataset) => (
                        <option key={dataset} value={dataset}>
                            {dataset}
                        </option>
                    ))}
                </Select>
            </InputGroup>
        </Flex>
    );
}