import { useContext, useState } from "react";
import { ALL_DIRECT_QUERY_TYPES, ALL_NNARY_LOGICAL_QUERY_TYPES, ALL_QUERY_TYPES, ALL_UNARY_LOGICAL_QUERY_TYPES, AnyQueryType, DirectQueryType, DirectValueType, EmptyQueryType, NNaryLogicalQueryType, UnaryLogicalQueryType } from "../../shared/query/query-consts";
import DirectFilterComponent from "./where-filters/direct-filter";
import { NComposableFilterComponent } from "./where-filters/ncomposable-filter";
import { uuid } from "../../shared/uuid";
import { Button, Flex, FormControl, FormLabel, Select } from "@chakra-ui/react";
import UnaryComposableFilterComponent from "./where-filters/unary-composable-filter";
import { DataSetContext } from "../../contexts/dataset-type-context";

export type NComposableFilter = {type: NNaryLogicalQueryType, filters: AnyFilter[]};

export type NComposableFilterWithIDChildern = {type: NNaryLogicalQueryType, filters: StrictIDAnyFilter[]};

export type UnaryComposableFilter = {type: UnaryLogicalQueryType, filter: AnyFilter};

export type UnaryComposableFilterWithIDChildern = {type: UnaryLogicalQueryType, filter: StrictIDAnyFilter};

export type DirectFilter = {type: DirectQueryType, value: string | number, field: string, valueType: DirectValueType, fieldPrefix: string};

export type AnyFilter = NComposableFilter | UnaryComposableFilter | DirectFilter;

export type IDNComposableFilter = NComposableFilterWithIDChildern & {id: string};
export type IDUnaryComposableFilter = UnaryComposableFilterWithIDChildern & {id: string};
export type IDDirectFilter = DirectFilter & {id: string};
export type IDAnyFilter = AnyFilter & {id: string};

export type StrictIDAnyFilter = IDNComposableFilter | IDUnaryComposableFilter | IDDirectFilter;

export type EmptyQuery = {type: EmptyQueryType};

export type WhereQuery = StrictIDAnyFilter | EmptyQuery;

export interface WhereQueryProps {
    onChange: (query: WhereQuery) => void;
    filter: WhereQuery;
    style?: React.CSSProperties;
}

export const defaultDirectFilter: (id: string, fieldPrefix: string, field: string) => IDDirectFilter = (id: string, fieldPrefix: string, field = "") =>{
    return { type: DirectQueryType.EQ, value: 0, valueType: DirectValueType.NUMBER, id: id, field: field, fieldPrefix: fieldPrefix};
}

export const defaultUnaryComposableFilter: (id: string, fieldPrefix: string, field: string) => IDUnaryComposableFilter = (id: string, fieldPrefix: string, field = "") =>{
    return { type: UnaryLogicalQueryType.NOT, filter: defaultDirectFilter(uuid(), fieldPrefix, field), id: id};
}

export const defaultNNaryComposableFilter: (id: string) => IDNComposableFilter = (id: string) =>{
    return { type: NNaryLogicalQueryType.AND, filters: [], id: id};
}

export default function WhereQueryComponent({onChange, filter, style}: WhereQueryProps) {
    const [query, setQuery] = useState<WhereQuery>(filter);

    const [editChildFilterOpen, setEditChildFilterOpen] = useState<boolean>(false);

    const [editChildQueryType, setEditChildQueryType] = useState<AnyQueryType>(DirectQueryType.EQ);

    let renderedChildFilter = null;

    const datasetContext = useContext(DataSetContext);
    

    if (ALL_UNARY_LOGICAL_QUERY_TYPES.includes(query.type as UnaryLogicalQueryType)) {
        const filter = query as IDUnaryComposableFilter;
        renderedChildFilter = (<UnaryComposableFilterComponent key={filter.id} filter={filter} id={filter.id} onChange={(filter) => {
            setQuery(filter);
            onChange(filter);
            console.log("where level query changed")
        }} />);
    }
    else if (ALL_DIRECT_QUERY_TYPES.includes(query.type as DirectQueryType)) {
        const filter = query as IDDirectFilter;
        renderedChildFilter = (<DirectFilterComponent key={filter.id} filter={filter} id={filter.id} onChange={(filter) => {
            setQuery(filter);
            onChange(filter);
            console.log("where level query changed")
        }} />);
    }
    else if (ALL_NNARY_LOGICAL_QUERY_TYPES.includes(query.type as NNaryLogicalQueryType)) {
        const filter = query as IDNComposableFilter;
        renderedChildFilter = (<NComposableFilterComponent key={filter.id} filter={filter} id={filter.id} onChange={(filter) => {
            setQuery(filter);
            onChange(filter);
            console.log("where level query changed")
        }} />);
    } else {
        renderedChildFilter = (<div>Empty Query</div>);
    }

    return (<div style={style}>
        {/* <NComposableFilterComponent id={uuid()} onChange={(filter)=>{}} filter={{type: NNaryLogicalQueryType.AND, filters: [{type:DirectQueryType.EQ,value:0,valueType:DirectValueType.NUMBER,"id":"d97d3467-7f60-bc7c-7c22-6f43bf62aeee"}, 
    {type:DirectQueryType.EQ,value:0,valueType:DirectValueType.NUMBER,"id":"d97d3467-77c22-6f43bf62aeee"}]}}/>
     */}

     {renderedChildFilter}
    
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
                        setQuery(newFilter);
                        onChange(newFilter);
                    }
                    else if (ALL_NNARY_LOGICAL_QUERY_TYPES.includes(editChildQueryType as NNaryLogicalQueryType)) {
                        const newFilter: IDNComposableFilter = defaultNNaryComposableFilter(uuid());
                        setQuery(newFilter);
                        onChange(newFilter);
                    } else if (ALL_UNARY_LOGICAL_QUERY_TYPES.includes(editChildQueryType as UnaryLogicalQueryType)) {
                        const newFilter: IDUnaryComposableFilter = defaultUnaryComposableFilter(uuid(), datasetContext.datasetPrefix, "");
                        setQuery(newFilter);
                        onChange(newFilter);
                    } else {
                        setQuery({ type: EmptyQueryType.EMPTY });
                        onChange({ type: EmptyQueryType.EMPTY });
                    }
                    setEditChildFilterOpen(false);
                }}>Change</Button>
            </Flex>}
    </div>);
}   