import { Box, Flex, InputGroup, InputLeftAddon, Select } from "@chakra-ui/react";
import RemovableItem from "./removable-item";
import { useContext } from "react";
import { DataSetContext } from "../../../contexts/dataset-type-context";
import { DataSetType } from "../../../shared/dataset-consts";
import { Room_MFields, Room_SFields, Section_MFields, Section_SFields } from "../../../shared/query/query-consts";

export interface ColumnProps {
    columnsList: string[];
    onChange: (columnsList: string[]) => void;
}

export default function ColumnComponent({ columnsList, onChange }: ColumnProps) {

    const datasetContext = useContext(DataSetContext);

    let validColumnNames: string[] = [];

    if (datasetContext.type == DataSetType.Sections) {
        validColumnNames = [...Section_MFields, ...Section_SFields];
    } else if (datasetContext.type == DataSetType.Rooms) {
        validColumnNames = [...Room_MFields, ...Room_SFields];
    }

    return (<Box display="flex" flexDirection="column">
        <h2 style={{ alignSelf: "start" }}>Columns</h2>
        <Box w="90%" display="flex" flexDirection="row" justifyContent="start" flexWrap="wrap">
            {columnsList.map((column, index) => {
                return (<RemovableItem key={index} item={column} onClickRemove={() => {
                    const newColumnsList = [...columnsList];
                    newColumnsList.splice(index, 1);
                    onChange(newColumnsList);
                }} />)
            })}
        </Box>
        <Flex flexDirection="row">
            <InputGroup>
                <InputLeftAddon children={`${datasetContext.datasetPrefix}_`} />


                <Select placeholder='choose a column name'
                    width="fit-content"
                    value={validColumnNames[0]}
                    onChange={(event) => {
                        const newColumnsList = [...columnsList, event.target.value];
                        onChange(newColumnsList);
                    }}>
                    {validColumnNames.map((validCol) => {
                        const trueCol = `${datasetContext.datasetPrefix}_${validCol}`;
                        return (<option key={trueCol} value={trueCol}>{validCol}</option>);
                    })}
                </Select>
            </InputGroup>
        </Flex>
    </Box>);

}