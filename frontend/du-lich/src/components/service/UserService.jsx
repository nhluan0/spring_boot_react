import axios from 'axios'
import { GlobalToken } from '../login_logout/Login'

// chan moi request , dien vao token phan header
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = GlobalToken()
    // set thuoc tinh Authorization phan header
    if (token != null) {
      config.headers['Authorization'] = token
    }

    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

const URL_BASE = 'http://localhost:8080/users'

// api add new user
export const apiAddNewUser = (user) => axios.post(URL_BASE, user)
// api get page user
export const apiGetAllUserByPage = () => axios.get(URL_BASE)
// api search by username or phone number
export const apiSearchByUserNameOrPhoneNumber = (phoneOrUsername) =>
  axios.get(`${URL_BASE}/${phoneOrUsername}`)
// api update user
export const apiUpdateUserById = (id, user) =>
  axios.put(`${URL_BASE}/${id}`, user)
// api get user by id
export const apiGetById = (id) => axios.get(`${URL_BASE}/get/${id}`)
// api patch user by id
export const apiPatchById = (id) => axios.patch(`${URL_BASE}/${id}`)
// api get paginate
export const apiPaginateByPage = (page) =>
  axios.get(`${URL_BASE}/phan-trang/${page}`)
// api get user theo so phan trang
export const apiGetListUserByNumPagePaginate = (page) =>
  axios.get(`${URL_BASE}/page/${page}`)
