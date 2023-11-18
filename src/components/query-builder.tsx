import { DataSetContextType, DataSetContext } from "../contexts/dataset-type-context";
import WhereQueryComponent, { WhereQuery } from "./query-builder/where-query";
import { EmptyQueryType } from "../shared/query/query-consts";
import { useState } from "react";
import { Button, Flex } from "@chakra-ui/react";
import { adeptWhereQueryItem2EBNF } from "../shared/query/query-adpter";
import { QueryResponseResult, submitQuery } from "../service/query-api";

export interface QueryBuilderProps {
    datasetContextValue: DataSetContextType;
    onQuerySubmit: (res: QueryResponseResult) => void;
}

export default function QueryBuilder({ datasetContextValue, onQuerySubmit }: QueryBuilderProps) {
    const [whereQuery, setWhereQuery] = useState<WhereQuery>({ type: EmptyQueryType.EMPTY });

    return (<Flex flexDirection="column">
        <div style={{alignSelf: "start"}}>
            <pre style={{width: "fit-content"}}>
                {JSON.stringify(adeptWhereQueryItem2EBNF(whereQuery), null, 2)}
            </pre>
        </div>
        <DataSetContext.Provider value={datasetContextValue}>
            <h2 style={{alignSelf: "start"}}>Query Builder</h2>
            <h2 style={{alignSelf: "start"}}>Where</h2>
            <WhereQueryComponent style={{maxHeight: "50%"}}  onChange={(query) => {
                setWhereQuery(query);
                console.log("builder level query changed", query)
            }} filter={whereQuery} />
        </DataSetContext.Provider>
            <Button onClick={()=>{
                submitQuery(adeptWhereQueryItem2EBNF(whereQuery)).then((res)=>{
                    onQuerySubmit(res);
                })
            }}>Sumbit</Button>
    </Flex>);
}