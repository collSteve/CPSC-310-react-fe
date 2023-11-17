import './App.css'
import WhereQueryComponent from './components/query-builder/where-query'
import { EmptyQueryType } from './shared/query/query-consts'

function App() {

  return (
    <>
      <WhereQueryComponent onChange={()=>{}} filter={{type: EmptyQueryType.EMPTY}}/>
    </>
  )
}

export default App
