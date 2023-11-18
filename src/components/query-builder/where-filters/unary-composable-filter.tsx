import { Box, Button, Flex, FormControl, FormLabel, Select } from "@chakra-ui/react";
import { IDDirectFilter, IDNComposableFilter, IDUnaryComposableFilter, UnaryComposableFilterWithIDChildern, defaultDirectFilter } from "../where-query";
import { useContext, useEffect, useState } from "react";
import { ALL_DIRECT_QUERY_TYPES, ALL_NNARY_LOGICAL_QUERY_TYPES, ALL_QUERY_TYPES, ALL_UNARY_LOGICAL_QUERY_TYPES, AnyQueryType, DirectQueryType, NNaryLogicalQueryType, UnaryLogicalQueryType } from "../../../shared/query/query-consts";
import DirectFilterComponent from "./direct-filter";
import { NComposableFilterComponent } from "./ncomposable-filter";
import { uuid } from "../../../shared/uuid";
import { DataSetContext } from "../../../contexts/dataset-type-context";

export interface UnaryComposableFilterProps {
    id: string;
    onChange: (filterObj: IDUnaryComposableFilter) => void;
    filter: UnaryComposableFilterWithIDChildern;

}

export default function UnaryComposableFilterComponent({ onChange, filter, id }: UnaryComposableFilterProps) {
    const [queryType, setQueryType] = useState<UnaryLogicalQueryType>(filter.type);

    const [childFilter, setChildFilter] = useState(filter.filter);

    const [editChildFilterOpen, setEditChildFilterOpen] = useState<boolean>(false);

    const [editChildQueryType, setEditChildQueryType] = useState<AnyQueryType>(DirectQueryType.EQ);

    const datasetContext = useContext(DataSetContext);


    let renderedChildFilter = null;

    useEffect(()=>{
        //call function when something change in state
        onChange({ type: queryType, filter: childFilter, id: id });
      },[queryType, childFilter]);

    if (ALL_UNARY_LOGICAL_QUERY_TYPES.includes(childFilter.type as UnaryLogicalQueryType)) {
        const filter = childFilter as IDUnaryComposableFilter;
        renderedChildFilter = (<UnaryComposableFilterComponent key={filter.id} filter={filter} id={filter.id} onChange={(filter) => {
            setChildFilter(filter);
        }} />);
    }
    else if (ALL_DIRECT_QUERY_TYPES.includes(childFilter.type as DirectQueryType)) {
        const filter = childFilter as IDDirectFilter;
        renderedChildFilter = (<DirectFilterComponent key={filter.id} filter={filter} id={filter.id} onChange={(filter) => {
            setChildFilter(filter);
        }} />);
    }
    else if (ALL_NNARY_LOGICAL_QUERY_TYPES.includes(childFilter.type as NNaryLogicalQueryType)) {
        const filter = childFilter as IDNComposableFilter;
        renderedChildFilter = (<NComposableFilterComponent key={filter.id} filter={filter} id={filter.id} onChange={(filter) => {
            setChildFilter(filter);
        }} />);
    }

    return (<Box border="solid" borderRadius={5}>
        <Flex flexDirection="column" margin="10px">
            <FormControl backgroundColor="green.200" display="flex" flexDirection="row" justifyContent="flex-start" alignItems="center" gap="5px">
                <FormLabel>Query Type</FormLabel>
                <Select placeholder='query type'
                    width="fit-content"
                    value={queryType}
                    onChange={(event) => {
                        setQueryType(event.target.value as UnaryLogicalQueryType);
                    }}>
                    {ALL_UNARY_LOGICAL_QUERY_TYPES.map((queryType) => {
                        return (<option key={queryType} value={queryType}>{queryType}</option>);
                    })}
                </Select>
            </FormControl>

            <Flex flexDirection="column" marginLeft="10px">
                {renderedChildFilter}
            </Flex>
            <Button onClick={() => {
                setEditChildFilterOpen(!editChildFilterOpen);
            }}>Change child filter</Button>

            {editChildFilterOpen && <Flex flexDirection="column" marginLeft="10px">
                <FormControl display="flex" flexDirection="row" justifyContent="flex-start" alignItems="center" gap="5px">
                    <FormLabel>Query Type</FormLabel>
                    <Select placeholder='query type'
                        width="fit-content"
                        value={editChildQueryType}
                        onChange={(event) => {
                            setEditChildQueryType(event.target.value as AnyQueryType);
                        }}>
                        {ALL_QUERY_TYPES.map((queryType) => {
                            return (<option key={queryType} value={queryType}>{queryType}</option>);
                        })}
                    </Select>
                </FormControl>
                <Button onClick={() => {
                    if (ALL_DIRECT_QUERY_TYPES.includes(editChildQueryType as DirectQueryType)) {
                        const newFilter: IDDirectFilter = defaultDirectFilter(uuid(), datasetContext.datasetPrefix, "");
                        setChildFilter(newFilter);
                    }
                    else if (ALL_NNARY_LOGICAL_QUERY_TYPES.includes(editChildQueryType as NNaryLogicalQueryType)) {
                        const newFilter: IDNComposableFilter = { type: editChildQueryType as NNaryLogicalQueryType, filters: [], id: uuid() };
                        setChildFilter(newFilter);
                    } else if (ALL_UNARY_LOGICAL_QUERY_TYPES.includes(editChildQueryType as UnaryLogicalQueryType)) {
                        const newFilter: IDUnaryComposableFilter = { type: editChildQueryType as UnaryLogicalQueryType, filter: defaultDirectFilter(uuid(), datasetContext.datasetPrefix, ""), id: uuid() };
                        setChildFilter(newFilter);
                    }

                    onChange({ type: queryType, filter: childFilter, id: id });

                    setEditChildFilterOpen(false);
                }}>Add</Button>
            </Flex>}
        </Flex>
    </Box>);
}