import {Grid, GridItem, Box, VStack} from '@chakra-ui/react'
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
  const [datasetContext, _setDatasetContext] = useState<DataSetContextType>({type:DataSetType.Rooms, datasetPrefix: "rooms"})

  const [queryResultRes, setQueryResultRes] = useState<QueryResponseResult | {type: InitQueryResult}>({type: InitQueryResult.Init});
  // const mockData = [
	// 	{
	// 		"rooms_shortname": "OSBO",
	// 		"maxSeats": 442
	// 	},
	// 	{
	// 		"rooms_shortname": "HEBB",
	// 		"maxSeats": 375
	// 	},
	// 	{
	// 		"rooms_shortname": "LSC",
	// 		"maxSeats": 350
	// 	}
	// ];

  const [queryResultLoading, setQueryResultLoading] = useState<boolean>(false);
  const [selectedDataset, setSelectedDataset] = useState<string>("         ");

  return (
        <Grid
            templateAreas={`
                  "uploadQuery empty"
                  "QuerySelect empty"
                  "querybuilder queryTable"
                  "querybuilder queryTable"`}
            gridTemplateRows={'10vh 20vh 65 vh'}
            gridTemplateColumns={'49vw 49vw'}
            gap='1'
            color='blackAlpha.700'
            fontWeight='bold'
            h={'100vh'}
            w={'100vw'}
        >
          <GridItem area={'uploadQuery'}>
            <AddDatasetComponent />
          </GridItem>
          <GridItem area={'QuerySelect'} justifyItems="center" alignSelf="center">
            <DatasetDropdownComponent selectedDataset={selectedDataset} setSelectedDataset={setSelectedDataset} />
          </GridItem>
          <GridItem pl='2' area={'querybuilder'}  overflow="scroll">
            <QueryBuilder datasetContextValue={datasetContext}
                          beforeQuerySubmit={()=>{
                            setQueryResultLoading(true);
                          }}
                          onQuerySubmit={(res)=>{
                            setQueryResultRes(res);
                            setQueryResultLoading(false);
                          }}/>
          </GridItem>
          <GridItem pl='2' area={'queryTable'}>
            {/* <ResultTableComponent data={mockData}/> */}
            <QueryResultDisplay queryResultRes={queryResultRes} loading={queryResultLoading}/>
          </GridItem>
        </Grid>
  )
}

export default App
