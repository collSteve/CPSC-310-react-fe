import { useState } from "react";
import { DirectQueryType, DirectValueType } from "../../../shared/query/query-consts";
import { isNumericString } from "../../../shared/type-check";
import { DirectFilter, IDDirectFilter } from "../where-query";

import { Select, Box, Flex, Spacer, Input, FormControl, FormLabel } from '@chakra-ui/react'

export interface DirectFilterProps {
    id: string;
    onChange: (filterObj: IDDirectFilter) => void;
    filter: DirectFilter;
}

export default function DirectFilterComponent({ onChange, filter, id }: DirectFilterProps) {
    const [filterType, setFilterType] = useState<DirectQueryType>(filter.type);

    const [value, setValue] = useState<number | string>(filter.value);

    const [valueType, setValueType] = useState<DirectValueType>(filter.valueType);

    const setValueObj = (inputValue: string, inputValueType: DirectValueType) => {
        if (inputValueType == DirectValueType.NUMBER) {
            if (isNumericString(inputValue)) {
                setValue(Number(inputValue));
                setValueType(inputValueType);
            }
            else {
                // prompt error message
                console.warn("Incohesive value type and value!");
            }
        }
        else {
            setValue(inputValue);
            setValueType(inputValueType);
        }

        onChange({ type: filterType, value: inputValue, valueType: inputValueType, id: id });
    };

    // setValueObj(value as string, valueType);

    // call onChange
    // onChange({type: filterType, value, valueType, id: id});

    const allQueryTypes = [DirectQueryType.EQ, DirectQueryType.GT, DirectQueryType.LT];

    return (<>
        <Box border="solid" borderRadius={5}>
            {/* <h1>{filterType}: {value} ({valueType})</h1> */}
            <Flex flexDirection="column" margin="10px">
                <FormControl backgroundColor="orange.200" display="flex" flexDirection="row" justifyContent="flex-start" alignItems="center" gap="5px">
                    <FormLabel>Query Type</FormLabel>
                    <Select placeholder='query type'
                    width="fit-content"
                        value={filterType}
                        onChange={(event) => {
                            setFilterType(event.target.value as DirectQueryType);
                        }}>
                        {allQueryTypes.map((queryType) => {
                            return (<option key={queryType} value={queryType}>{queryType}</option>);
                        })}
                    </Select>
                </FormControl>
                <Flex flexDirection="row">
                    <FormControl>
                        <FormLabel>Query Value</FormLabel>
                        <Input placeholder="input your value" value={value} onChange={(event) => {
                            setValueObj(event.target.value, valueType);
                        }} />
                    </FormControl>

                    <Spacer />
                    <FormControl>
                        <FormLabel>Value Type</FormLabel>
                        <Select placeholder='value type'
                            value={valueType}
                            onChange={(event) => {
                                setValueObj(value as string, event.target.value as DirectValueType);
                            }}>
                            <option value={DirectValueType.STRING}>{DirectValueType.STRING}</option>
                            <option value={DirectValueType.NUMBER}>{DirectValueType.NUMBER}</option>
                        </Select>
                    </FormControl>

                </Flex>
            </Flex>

        </Box>
    </>);
}