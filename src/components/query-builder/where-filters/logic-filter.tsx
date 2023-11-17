import { useState } from "react";
import { ALL_DIRECT_QUERY_TYPES, ALL_QUERY_TYPES, AnyQueryType, DirectQueryType, DirectValueType, NNaryLogicalQueryType, UnaryLogicalQueryType } from "../../../shared/query/query-consts";
import { IDDirectFilter, IDNComposableFilter, NComposableFilterWithIDChildern, StrictIDAnyFilter } from "../where-query";
import { Button, Flex, FormControl, FormLabel, Select } from "@chakra-ui/react";
import DirectFilterComponent from "./direct-filter";
import { uuid } from "../../../shared/uuid";

export interface NCompoableFilterProps {
    id: string,
    onChange: (query: IDNComposableFilter) => void;
    filter: NComposableFilterWithIDChildern;
}

export function NCompoableFilterComponent({ onChange, filter, id }: NCompoableFilterProps) {
    const [queryType, setQueryType] = useState<NNaryLogicalQueryType>(filter.type);
    const [childernFilters, setChildernFilters] = useState<StrictIDAnyFilter[]>(filter.filters);


    const [addQueryOpen, setAddQueryOpen] = useState<boolean>(false);
    const [addQueryType, setAddQueryType] = useState<AnyQueryType>(DirectQueryType.EQ);

    console.log(childernFilters);

    const renderedChildernFilters = childernFilters.map((childFilter) => {
        if (ALL_DIRECT_QUERY_TYPES.includes(childFilter.type as DirectQueryType)) {
            const filter = childFilter as IDDirectFilter;
            return (<DirectFilterComponent key={filter.id} filter={filter} id={filter.id} onChange={(filter) => {
                const newChildernFilters = childernFilters.map((cfilter) => {
                    if (cfilter.id == filter.id) {
                        return filter;
                    } else {
                        return cfilter;
                    }
                });
                setChildernFilters(newChildernFilters);
            }} />);
        }

    });

    return (
        <Flex flexDirection="column">
            <h1>{queryType}</h1>
            {renderedChildernFilters}

            <Button variant='outline' onClick={() => {
                if (!addQueryOpen) {
                    setAddQueryOpen(true);
                }
            }}>Add query</Button>

            {
                addQueryOpen &&
                <Flex flexDirection="row">
                    <FormControl>
                        <FormLabel>Query Type</FormLabel>
                        <Select placeholder='query type'
                            value={addQueryType}
                            icon={<></>}
                            onChange={(event) => {
                                setAddQueryType(event.target.value as AnyQueryType);
                            }}>
                            {ALL_QUERY_TYPES.map((queryType) => {
                                return (<option key={queryType} value={queryType}>{queryType}</option>);
                            })}
                        </Select>
                    </FormControl>
                    <Button onClick={()=>{
                        if (ALL_DIRECT_QUERY_TYPES.includes(addQueryType as DirectQueryType)) {
                            const newFilter: IDDirectFilter = { type: addQueryType as DirectQueryType, value: 0, valueType: DirectValueType.NUMBER, id: uuid() };
                            setChildernFilters(prevFilters =>{
                                return [...prevFilters, newFilter];
                            });
                        }
                    }}>Add</Button>
                </Flex>
            }
        </Flex>
    );
}