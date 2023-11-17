import { useState } from "react";
import { DirectQueryType, DirectValueType, NNaryLogicalQueryType, UnaryLogicalQueryType } from "../../shared/query/query-consts";
import DirectFilterComponent from "./where-filters/direct-filter";
import { NCompoableFilterComponent } from "./where-filters/logic-filter";
import { uuid } from "../../shared/uuid";

export type NComposableFilter = {type: NNaryLogicalQueryType, filters: AnyFilter[]};

export type NComposableFilterWithIDChildern = {type: NNaryLogicalQueryType, filters: StrictIDAnyFilter[]};

export type UnaryComposableFilter = {type: UnaryLogicalQueryType, filter: AnyFilter};

export type UnaryComposableFilterWithIDChildern = {type: UnaryLogicalQueryType, filter: StrictIDAnyFilter};

export type DirectFilter = {type: DirectQueryType, value: string | number, valueType: DirectValueType};

export type AnyFilter = NComposableFilter | UnaryComposableFilter | DirectFilter;

export type IDNComposableFilter = NComposableFilterWithIDChildern & {id: string};
export type IDUnaryComposableFilter = UnaryComposableFilterWithIDChildern & {id: string};
export type IDDirectFilter = DirectFilter & {id: string};
export type IDAnyFilter = AnyFilter & {id: string};

export type StrictIDAnyFilter = IDNComposableFilter | IDUnaryComposableFilter | IDDirectFilter;

export default function WhereQuery() {
    const [query, setQuery] = useState<IDAnyFilter|Record<string, never>>({});

    return (<>
        {/* <DirectFilterComponent onChange={()=>{}}/> */}
        <NCompoableFilterComponent id={uuid()} onChange={(filter)=>{}} filter={{type: NNaryLogicalQueryType.AND, filters: [{type:DirectQueryType.EQ,value:0,valueType:DirectValueType.NUMBER,"id":"d97d3467-7f60-bc7c-7c22-6f43bf62aeee"}, 
    {type:DirectQueryType.EQ,value:0,valueType:DirectValueType.NUMBER,"id":"d97d3467-77c22-6f43bf62aeee"}]}}/>
    </>);
}   