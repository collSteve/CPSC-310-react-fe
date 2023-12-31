import {Grid, GridItem } from '@chakra-ui/react'
import './App.css'
import QueryBuilder from './components/query-builder'
import { DataSetType } from './shared/dataset-consts'
import { DataSetContextType } from './contexts/dataset-type-context'
import { useState } from 'react'
import { QueryResponseResult } from './service/query-api'
import QueryResultDisplay from './components/query-result-display'
import DatasetDropdownComponent from "./components/dataset-dropdown.tsx";
import AddDatasetComponent from "./components/adddataset.tsx";

export enum InitQueryResult {
  Init = "Init",
}

function App() {
  const [datasetContext, setDatasetContext] = useState<DataSetContextType>({type:DataSetType.Rooms, datasetPrefix: "rooms"})

  const [queryResultRes, setQueryResultRes] = useState<QueryResponseResult | {type: InitQueryResult}>({type: InitQueryResult.Init});

  const [queryResultLoading, setQueryResultLoading] = useState<boolean>(false);

  const [opHeadings, setOpHeadings] = useState<string[]>([]);

  return (
        <Grid
            templateAreas={`
                  "uploadQuery queryTable"
                  "QuerySelect queryTable"
                  "querybuilder queryTable"`}
            gridTemplateRows={'30vh 10vh 59vh'}
            gridTemplateColumns={'49vw 49vw'}
            gap='1'
            color='blackAlpha.700'
            fontWeight='bold'
            minHeight={'100vh'}
            w={'100vw'}
        >
          <GridItem area={'uploadQuery'} overflow="scroll">
            <AddDatasetComponent />
          </GridItem>
          <GridItem area={'QuerySelect'} justifyItems="center" alignSelf="center">
            <DatasetDropdownComponent selectedDatasetContext={datasetContext}
            setSelectedDatasetContext={(context)=>{
              setDatasetContext(context);
            }} />
          </GridItem>
          <GridItem pl='2' area={'querybuilder'}  overflow="scroll">
            <QueryBuilder datasetContextValue={datasetContext}
                          beforeQuerySubmit={()=>{
                            setQueryResultLoading(true);
                          }}
                          onQuerySubmit={(res, query)=>{
                            setQueryResultRes(res);
                            setQueryResultLoading(false);
                            if (query) {
                              setOpHeadings(query.OPTIONS.COLUMNS);
                            }
                          }}/>
          </GridItem>
          <GridItem pl='2' area={'queryTable'} overflow="scroll" display="flex" 
          justifyContent="center" alignItems="center" flexDirection="column" margin="10px">
            <QueryResultDisplay queryResultRes={queryResultRes} loading={queryResultLoading} opHeadings={opHeadings}/>
          </GridItem>
        </Grid>
  )
}

export default App
