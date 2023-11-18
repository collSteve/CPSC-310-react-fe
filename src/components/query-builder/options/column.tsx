import { Box, Button, Flex, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import RemovableItem from "./removable-item";
import { Input } from '@chakra-ui/react'
import { useContext, useState } from "react";
import { DataSetContext } from "../../../contexts/dataset-type-context";

export interface ColumnProps {
    columnsList: string[];
    onChange: (columnsList: string[]) => void;
}

export default function ColumnComponent({columnsList, onChange}: ColumnProps) {
    const [inputValue, setInputValue] = useState<string>("");

    const datasetContext = useContext(DataSetContext);
    
    return (<Box display="flex" flexDirection="column">
        <h2 style={{alignSelf: "start"}}>Columns</h2>
        <Box w="90%" display="flex" flexDirection="row" justifyContent="start" flexWrap="wrap">
            {columnsList.map((column, index)=>{
                return (<RemovableItem item={column} onClickRemove={()=>{
                    const newColumnsList = [...columnsList];
                    newColumnsList.splice(index, 1);
                    onChange(newColumnsList);
                }}/>)
            })}
        </Box>
        <Flex flexDirection="row">
            <InputGroup>
            <InputLeftAddon children={`${datasetContext.datasetPrefix}_`} />
            <Input
            value={inputValue}
            onChange={(e)=>{setInputValue(e.target.value);}}
            placeholder="Column name"
            />
            </InputGroup>
            
            <Button onClick={()=>{
                const newColumnsList = [...columnsList, `${datasetContext.datasetPrefix}_${inputValue}`];
                onChange([...new Set(newColumnsList)]);
                setInputValue("");
            }}>Add</Button>
        </Flex>
    </Box>);

}