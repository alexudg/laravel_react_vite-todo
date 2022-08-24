import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ShowProducts from './components/ShowProducts'
import EditProduct from './components/EditProduct'
import './App.css'

function App() { 

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<ShowProducts />} />
        <Route path='/store' element={<EditProduct />} />
        <Route path='/update/:id' element={<EditProduct />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
