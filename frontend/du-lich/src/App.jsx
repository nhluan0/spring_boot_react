
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ManagerUser from './components/admin/ManagerUser';
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {


  return (
    <BrowserRouter>
      <Routes>
        {/*http://localhost:5173/users */}
        <Route path='/users' element={<ManagerUser />}></Route>
      </Routes>

    </BrowserRouter>


  )
}

export default App
