import { Box, Button } from "@chakra-ui/react";
import catIdleGif from "../assets/cat-idle.gif"
import { InitQueryResult } from "../App";
import { QueryResponseResult } from "../service/query-api";
import { ResponseStatus } from "../service/api-consts";
import ResultTableComponent, { ValidQueryResult } from "./result-table";

export interface QueryResultDisplayProps {
    queryResultRes: QueryResponseResult | {type: InitQueryResult};
    loading?: boolean;
}

export default function QueryResultDisplay({queryResultRes, loading}: QueryResultDisplayProps) {
    let content = (<img src={catIdleGif} alt="waiting for input"/>);

    if (loading) {
        content = (<img src={catIdleGif} alt="loading"/>);
    }
    else if (queryResultRes.type == ResponseStatus.Success) {
        const queryData = queryResultRes.data as ValidQueryResult;
        content = (<ResultTableComponent data={queryData}/>)
    } else if (queryResultRes.type == ResponseStatus.Error) {
        const errorMessage = queryResultRes.data as string;

        content = (<Button as="div" colorScheme="red">{errorMessage}</Button>)
    }

    return (<Box h="100%" display="flex" justifyContent="center" alignItems="center">
        {content}   
    </Box>)
}