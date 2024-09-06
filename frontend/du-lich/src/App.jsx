
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ManagerUser from './components/admin/ManagerUser';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AddNewTour from './components/tour/AddNewTour';
import ManagerTour from './components/tour/ManagerTour';
import DetailTour from './components/tour/DetailTour';
import Login from './components/login_logout/Login';
import HomePage from './components/home/HomePage';
import Register from './components/register/Register';
import SearchLocationOrPrice from './components/search/SearchLocationOrPrice';
import TourDetail from './components/detailTours/TourDetail';
import DetailUserBooked from './components/booking/DetailUserBooked';



function App() {
  // const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  return (
    <BrowserRouter>
      <Routes>
        {/* page home */}
        <Route path='/home' element={<HomePage />}></Route>

        {/*http://localhost:5173/users */}
        <Route path='/users' element={<ManagerUser />}></Route>

        {/*http://localhost:5173/users/id update user */}
        <Route path='/users/:id' element={<ManagerUser />}></Route>
        <Route path='/tours/:add_new' element={<AddNewTour />}></Route>
        <Route path='/tours/update/:idUpdate' element={<AddNewTour />}></Route>
        <Route path='/tours' element={<ManagerTour />}></Route>
        <Route path='/tours/view/detail/:id' element={<DetailTour />}></Route>
        {/* login */}
        <Route path='/login' element={<Login />}></Route>
        {/* register */}
        <Route path='/dang-ky' element={<Register />}></Route>
        {/* search theo vi tri or gia */}
        <Route path='/home/:search/:address' element={<SearchLocationOrPrice />}></Route>
        {/* search tour theo ngay bat dau  */}
        <Route path='/home/:search/:start/:date' element={<SearchLocationOrPrice />}></Route>
        {/* xem chi tiet  */}
        <Route path='/home/detail/:id' element={<TourDetail />}></Route>
        {/* xem chi tiet user da dat tours */}
        <Route path='/home/info' element={<DetailUserBooked />}></Route>

      </Routes>
      {/* <PaginationCommon itemsPerPage={2} items={items} /> */}

    </BrowserRouter>


  )
}

export default App
