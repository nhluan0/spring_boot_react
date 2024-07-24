
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ManagerUser from './components/admin/ManagerUser';
import { BrowserRouter, Routes, Route } from "react-router-dom"



function App() {
  // const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  return (
    <BrowserRouter>
      <Routes>
        {/*http://localhost:5173/users */}
        <Route path='/users' element={<ManagerUser />}></Route>
        {/*http://localhost:5173/users/id update user */}
        <Route path='/users/:id' element={<ManagerUser />}></Route>
      </Routes>
      {/* <PaginationCommon itemsPerPage={2} items={items} /> */}

    </BrowserRouter>


  )
}

export default App
