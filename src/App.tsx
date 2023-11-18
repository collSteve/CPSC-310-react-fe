import { Grid, GridItem } from '@chakra-ui/react'
import './App.css'
import QueryBuilder from './components/query-builder'
import { DataSetType } from './shared/dataset-consts'
import ResultTableComponent from './components/result-table'

function App() {
  const mockData = [
		{
			"rooms_shortname": "OSBO",
			"maxSeats": 442
		},
		{
			"rooms_shortname": "HEBB",
			"maxSeats": 375
		},
		{
			"rooms_shortname": "LSC",
			"maxSeats": 350
		}
	];

  return (
      <Grid
        templateAreas={`"header header"
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
        <GridItem pl='2' area={'querybuilder'}  overflow="scroll">
          <QueryBuilder datasetContextValue={{type: DataSetType.Rooms, datasetPrefix: "rooms"}} />
        </GridItem>
        <GridItem pl='2' area={'queryTable'}>
          <ResultTableComponent data={mockData}/>
        </GridItem>
      </Grid>
  )
}

export default App
