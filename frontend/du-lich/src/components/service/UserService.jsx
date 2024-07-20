import axios from "axios"

const URL_BASE = "http://localhost:8080/users"


// api add new user
export const apiAddNewUser = (user) => axios.post(URL_BASE, user)
// api get page user
export const apiGetAllUserByPage = () => axios.get(URL_BASE)
// api search by username or phone number
export const apiSearchByUserNameOrPhoneNumber = (phoneOrUsername) => axios.get(`${URL_BASE}\\${phoneOrUsername}`)