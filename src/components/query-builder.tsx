import { DataSetContextType, DataSetContext } from "../contexts/dataset-type-context";
import WhereQueryComponent, { WhereQuery } from "./query-builder/where-query";
import { EmptyQueryType } from "../shared/query/query-consts";
import { useState } from "react";
import { Button, Divider, Flex } from "@chakra-ui/react";
import { adeptOptions2EBNF, adeptWhereQueryItem2EBNF } from "../shared/query/query-adpter";
import { QueryResponseResult, submitQuery } from "../service/query-api";
import OptionComponent, { OrderObj, OrderType } from "./query-builder/options";

export interface QueryBuilderProps {
    datasetContextValue: DataSetContextType;
    onQuerySubmit: (res: QueryResponseResult) => void;
    beforeQuerySubmit?: () => void;
}

export type OptionQuery = {
    COLUMNS: string[];
    ORDER: OrderObj;
}

export default function QueryBuilder({ datasetContextValue, onQuerySubmit, beforeQuerySubmit }: QueryBuilderProps) {
    const [whereQuery, setWhereQuery] = useState<WhereQuery>({ type: EmptyQueryType.EMPTY });
    const [option, setOption] = useState<OptionQuery>({ COLUMNS: [], ORDER: { type: OrderType.None, order: null } });

    return (<Flex flexDirection="column">
        {/* <div style={{ alignSelf: "start" }}>
            <pre style={{ width: "fit-content" }}>
                {JSON.stringify(adeptWhereQueryItem2EBNF(whereQuery), null, 2)}
            </pre>
        </div> */}
        <DataSetContext.Provider value={datasetContextValue}>
            <h2 style={{ alignSelf: "start" }}>Query Builder</h2>
            <h2 style={{ alignSelf: "start" }}>Where</h2>
            <WhereQueryComponent style={{ maxHeight: "50%" }} onChange={(query) => {
                setWhereQuery(query);
                console.log("builder level query changed", query)
            }} filter={whereQuery} />
            <Divider marginTop="5px" marginBottom="5px" />
            <OptionComponent option={option} onChange={(option) => {
                setOption(option);
            }} />
        </DataSetContext.Provider>

        <Button onClick={() => {
            beforeQuerySubmit && beforeQuerySubmit();

            const query = {
                "WHERE": adeptWhereQueryItem2EBNF(whereQuery),
                "OPTIONS": adeptOptions2EBNF(option)
            }
            submitQuery(query).then((res) => {
                onQuerySubmit(res);
            })
        }}>Sumbit</Button>
    </Flex>);
}