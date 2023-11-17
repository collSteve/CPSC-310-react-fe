import { DataSetTypeContext } from "../contexts/dataset-type-context";
import { DataSetType } from "../shared/dataset-consts";
import WhereQueryComponent, { WhereQuery } from "./query-builder/where-query";
import { EmptyQueryType } from "../shared/query/query-consts";
import { useState } from "react";

export interface QueryBuilderProps {
    datasetType: DataSetType;
}

export default function QueryBuilder({ datasetType }: QueryBuilderProps) {
    const [whereQuery, setWhereQuery] = useState<WhereQuery>({ type: EmptyQueryType.EMPTY });

    return (<>
    <p>
        {JSON.stringify(whereQuery)}
    </p>
        <DataSetTypeContext.Provider value={datasetType}>
            <h1>Query Builder</h1>
            <h2>Where</h2>
            <WhereQueryComponent onChange={(query) => {
                setWhereQuery(query);
                console.log("builder level query changed", query)
            }} filter={whereQuery} />
        </DataSetTypeContext.Provider>

    </>);
}