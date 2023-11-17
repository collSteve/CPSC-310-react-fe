import './App.css'
import QueryBuilder from './components/query-builder'
import { DataSetType } from './shared/dataset-consts'

function App() {

  return (
    <>
      <QueryBuilder datasetType={DataSetType.Sections}/>
    </>
  )
}

export default App
