import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import ManagerUser from './components/admin/ManagerUser'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AddNewTour from './components/tour/AddNewTour'
import ManagerTour from './components/tour/ManagerTour'
import DetailTour from './components/tour/DetailTour'
import Login from './components/login_logout/Login'
import HomePage from './components/home/HomePage'
import Register from './components/register/Register'
import SearchLocationOrPrice from './components/search/SearchLocationOrPrice'
import TourDetail from './components/detailTours/TourDetail'
import DetailUserBooked from './components/booking/DetailUserBooked'
import Tour from './components/tour/Tour'
import ForgetPassword from './components/login_logout/ForgetPassword'
import ChangPassword from './components/login_logout/ChangPassword'
import ResetPassword from './components/login_logout/ResetPassword'
import GlobalContext from './UseContext'

function App() {
  const { username, role } = GlobalContext()

  function AuthenticateRoute({ children }) {
    if (username && role) {
      return children
    }
    return <Navigate to="/login" />
  }
  function AuthenticateRouteForAdmin({ children }) {
    if (username && role == 'ADMIN') {
      return children
    }
    return <Navigate to="/login" />
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* page home */}
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="" element={<HomePage />}></Route>
        {/*http://localhost:5173/users */}
        <Route
          path="/users"
          element={
            <AuthenticateRouteForAdmin>
              <ManagerUser />
            </AuthenticateRouteForAdmin>
          }
        ></Route>

        {/*http://localhost:5173/users/id update user */}
        <Route
          path="/users/:id"
          element={
            <AuthenticateRouteForAdmin>
              <ManagerUser />
            </AuthenticateRouteForAdmin>
          }
        ></Route>
        <Route
          path="/tours/:add_new"
          element={
            <AuthenticateRouteForAdmin>
              <AddNewTour />
            </AuthenticateRouteForAdmin>
          }
        ></Route>
        <Route
          path="/tours/update/:idUpdate"
          element={
            <AuthenticateRouteForAdmin>
              <AddNewTour />
            </AuthenticateRouteForAdmin>
          }
        ></Route>
        <Route
          path="/tours"
          element={
            <AuthenticateRouteForAdmin>
              <ManagerTour />
            </AuthenticateRouteForAdmin>
          }
        ></Route>
        <Route path="/tours/view/detail/:id" element={<DetailTour />}></Route>
        {/* login */}
        <Route path="/login" element={<Login />}></Route>
        {/* register */}
        <Route path="/dang-ky" element={<Register />}></Route>
        {/* search theo vi tri or gia */}
        <Route
          path="/home/:search/:address"
          element={<SearchLocationOrPrice />}
        ></Route>
        {/* search tour theo ngay bat dau  */}
        <Route
          path="/home/:search/:start/:date"
          element={<SearchLocationOrPrice />}
        ></Route>
        {/* xem chi tiet  */}
        <Route path="/home/detail/:id" element={<TourDetail />}></Route>
        {/* xem chi tiet user da dat tours */}
        <Route
          path="/home/info"
          element={
            <AuthenticateRoute>
              <DetailUserBooked />
            </AuthenticateRoute>
          }
        ></Route>
        {/* tat ca ca tour */}
        <Route path="/home/tour" element={<Tour />}></Route>
        {/* forget password */}
        <Route path="/log/password/forget" element={<ForgetPassword />}></Route>
        {/* change password */}
        <Route path="/log/password/change" element={<ChangPassword />}></Route>
        {/* resetpasword */}
        <Route path="/resetpw" element={<ResetPassword />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
