import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
