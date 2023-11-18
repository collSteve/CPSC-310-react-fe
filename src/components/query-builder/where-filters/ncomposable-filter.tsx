import { useContext, useEffect, useState } from "react";
import { ALL_DIRECT_QUERY_TYPES, ALL_NNARY_LOGICAL_QUERY_TYPES, ALL_QUERY_TYPES, ALL_UNARY_LOGICAL_QUERY_TYPES, AnyQueryType, DirectQueryType, NNaryLogicalQueryType, UnaryLogicalQueryType } from "../../../shared/query/query-consts";
import { IDDirectFilter, IDNComposableFilter, IDUnaryComposableFilter, NComposableFilterWithIDChildern, StrictIDAnyFilter, defaultDirectFilter, defaultNNaryComposableFilter, defaultUnaryComposableFilter } from "../where-query";
import { Button, Flex, FormControl, FormLabel, Select, Box } from "@chakra-ui/react";
import DirectFilterComponent from "./direct-filter";
import { uuid } from "../../../shared/uuid";
import UnaryComposableFilterComponent from "./unary-composable-filter";
import { DataSetContext } from "../../../contexts/dataset-type-context";

export interface NComposableFilterProps {
    id: string,
    onChange: (query: IDNComposableFilter) => void;
    filter: NComposableFilterWithIDChildern;
}

export function NComposableFilterComponent({ onChange, filter, id }: NComposableFilterProps) {
    const [queryType, setQueryType] = useState<NNaryLogicalQueryType>(filter.type);
    const [childernFilters, setChildernFilters] = useState<StrictIDAnyFilter[]>(filter.filters);


    const [addQueryOpen, setAddQueryOpen] = useState<boolean>(false);
    const [addQueryType, setAddQueryType] = useState<AnyQueryType>(DirectQueryType.EQ);

    const datasetContext = useContext(DataSetContext);



    useEffect(()=>{
        //call function when something change in state
        onChange({ type: queryType, filters: childernFilters, id: id });
      },[queryType, childernFilters]);

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
                onChange({ type: queryType, filters: childernFilters, id: id });
            }} />);
        }
        else if (ALL_NNARY_LOGICAL_QUERY_TYPES.includes(childFilter.type as NNaryLogicalQueryType)) {
            const filter = childFilter as IDNComposableFilter;
            return (<NComposableFilterComponent key={filter.id} filter={filter} id={filter.id} onChange={(filter) => {
                const newChildernFilters = childernFilters.map((cfilter) => {
                    if (cfilter.id == filter.id) {
                        return filter;
                    } else {
                        return cfilter;
                    }
                });
                setChildernFilters(newChildernFilters);
                onChange({ type: queryType, filters: childernFilters, id: id });

            }} />);
        }
        else if (ALL_UNARY_LOGICAL_QUERY_TYPES.includes(childFilter.type as UnaryLogicalQueryType)) {
            const filter = childFilter as IDUnaryComposableFilter;
            return (<UnaryComposableFilterComponent key={filter.id} filter={filter} id={filter.id} onChange={(filter) => {
                const newChildernFilters = childernFilters.map((cfilter) => {
                    if (cfilter.id == filter.id) {
                        return filter;
                    } else {
                        return cfilter;
                    }
                });
                setChildernFilters(newChildernFilters);
                onChange({ type: queryType, filters: childernFilters, id: id });
            }} />);
        }

    });

    return (
        <Box border="solid" borderRadius={5}>
            <Flex flexDirection="column" margin="10px">
                <FormControl backgroundColor="teal.200" display="flex" flexDirection="row" justifyContent="flex-start" alignItems="center" gap="5px">
                    <FormLabel>Query Type:</FormLabel>
                    <Select placeholder='query type'
                        width="fit-content"
                        value={queryType}
                        onChange={(event) => {
                            setQueryType(event.target.value as NNaryLogicalQueryType);
                        }}>
                        {ALL_NNARY_LOGICAL_QUERY_TYPES.map((queryType) => {
                            return (<option key={queryType} value={queryType}>{queryType}</option>);
                        })}
                    </Select>
                </FormControl>

                <Flex flexDirection="column" marginLeft="10px">
                    {renderedChildernFilters.map((childFilter) => {
                        return (<Flex flexDirection="row" key={childFilter?.props.id ?? uuid()}>
                            {childFilter}
                            <Button onClick={()=>{
                                const newChildernFilters = childernFilters.filter((cfilter) => {
                                    return cfilter.id != childFilter?.props.id;
                                });
                                setChildernFilters(newChildernFilters);
                            }}>
                                Delete
                            </Button>
                        </Flex>);
                    })}
                </Flex>

                <Button variant='outline' colorScheme="yellow" onClick={() => {
                    setAddQueryOpen(!addQueryOpen);
                }}>Add query</Button>

                {
                    addQueryOpen &&
                    <Flex flexDirection="row">
                        <FormControl display="flex" flexDirection="row" justifyContent="flex-start" alignItems="center" gap="5px">
                            <FormLabel>Query Type</FormLabel>
                            <Select placeholder='query type'
                            width="fit-content"
                                value={addQueryType}
                                onChange={(event) => {
                                    setAddQueryType(event.target.value as AnyQueryType);
                                }}>
                                {ALL_QUERY_TYPES.map((queryType) => {
                                    return (<option key={queryType} value={queryType}>{queryType}</option>);
                                })}
                            </Select>
                        </FormControl>
                        <Button onClick={() => {
                            if (ALL_DIRECT_QUERY_TYPES.includes(addQueryType as DirectQueryType)) {
                                const newFilter: IDDirectFilter = defaultDirectFilter(uuid(), datasetContext.datasetPrefix, "");
                                // setChildernFilters(prevFilters => {
                                //     return [...prevFilters, newFilter];
                                // });
                                setChildernFilters([...childernFilters, newFilter]);
                                onChange({ type: queryType, filters: childernFilters, id: id });
                            }
                            else if (ALL_NNARY_LOGICAL_QUERY_TYPES.includes(addQueryType as NNaryLogicalQueryType)) {
                                const newFilter: IDNComposableFilter = defaultNNaryComposableFilter(uuid());
                                setChildernFilters(prevFilters => {
                                    return [...prevFilters, newFilter];
                                });
                                onChange({ type: queryType, filters: childernFilters, id: id });
                            }
                            else if (ALL_UNARY_LOGICAL_QUERY_TYPES.includes(addQueryType as UnaryLogicalQueryType)) {
                                const newFilter: IDUnaryComposableFilter = defaultUnaryComposableFilter(uuid(), datasetContext.datasetPrefix, "");
                                setChildernFilters(prevFilters => {
                                    return [...prevFilters, newFilter];
                                });
                                onChange({ type: queryType, filters: childernFilters, id: id });
                            }

                            setAddQueryOpen(false);
                            console.log("add query", childernFilters);
                        }}>Add</Button>
                    </Flex>
                }
            </Flex>
        </Box>

    );
}