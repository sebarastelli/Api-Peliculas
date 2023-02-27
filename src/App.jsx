
import { RouterProvider } from 'react-router-dom'
import './App.css'
import  myroutes  from './routers/routes'
function App() {
  return (
    <div className="App">
     <h1 className='title'>Películas</h1>
    <RouterProvider router={myroutes}/>
    </div>
  )
}

export default App
