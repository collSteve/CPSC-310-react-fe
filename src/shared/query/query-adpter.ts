import { OptionQuery } from "../../components/query-builder";
import { MultiOrder, OrderType } from "../../components/query-builder/options";
import { IDDirectFilter, IDNComposableFilter, IDUnaryComposableFilter, WhereQuery } from "../../components/query-builder/where-query";
import { ALL_DIRECT_QUERY_TYPES, ALL_NNARY_LOGICAL_QUERY_TYPES, ALL_UNARY_LOGICAL_QUERY_TYPES, DirectQueryType, EmptyQueryType, NNaryLogicalQueryType, UnaryLogicalQueryType } from "./query-consts";

export function adeptWhereQueryItem2EBNF(queryObj: WhereQuery): any {
    if (queryObj.type === EmptyQueryType.EMPTY){
        return {};
    }
    if (ALL_DIRECT_QUERY_TYPES.includes(queryObj.type as DirectQueryType)){
        const qObj = queryObj as IDDirectFilter;
        return {
            [qObj.type]: {
                [`${qObj.fieldPrefix}_${qObj.field}`]: qObj.value
            }
        }
    }
    if (ALL_UNARY_LOGICAL_QUERY_TYPES.includes(queryObj.type as UnaryLogicalQueryType)) {
        const qObj = queryObj as IDUnaryComposableFilter;
        return {
            [qObj.type]: adeptWhereQueryItem2EBNF(qObj.filter)
        }
    }
    if (ALL_NNARY_LOGICAL_QUERY_TYPES.includes(queryObj.type as NNaryLogicalQueryType)) {
        const qObj = queryObj as IDNComposableFilter;
        return {
            [qObj.type]: qObj.filters.map((filter) => adeptWhereQueryItem2EBNF(filter))
        }
    }
}

export function adeptOptions2EBNF(options: OptionQuery): any {
    const baseOptions =  {
        "COLUMNS": options.COLUMNS
    };

    if (options.ORDER.type === OrderType.None){
        return baseOptions;
    } 
    else if (options.ORDER.type === OrderType.Single) {
        const orderObj = options.ORDER.order as string;
        return {
            ...baseOptions,
            "ORDER": orderObj
        }
    }
    else if (options.ORDER.type === OrderType.Multiple) {
        const orderObj = options.ORDER.order as MultiOrder;
        return {
            ...baseOptions,
            "ORDER": {
                dir: orderObj.dir,
                keys: orderObj.keys
            }
        }
    }

    throw new Error(`Invalid Order Type: ${options.ORDER.type}`);
}
