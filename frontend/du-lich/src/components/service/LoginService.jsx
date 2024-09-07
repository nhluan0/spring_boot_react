import axios from "axios";

const URL_BASIC = "http://localhost:8080/log"

// login api
export const apiLogin = (userInfo) => axios.post(`${URL_BASIC}/login`, userInfo)

// get token 
// export const getToken = () => {
//     let token = "";
//     token = localStorage.getItem("token")
//     return token;
// }
// lay username tu session 
// export const getUserFromSession = () => {
//     let username = sessionStorage.getItem("user")
//     return username;

// }
// check user da dang nhap nhay hay chua 
// export const userLoged = () => {
//     const username = getUserFromSession()
//     if (!username) return false
//     return true
// }
// xoa token trong header 
// export const clearTokenHeader = () => {
//     localStorage.removeItem("token")
// }
// xoa session giu user name
// export const clearSessionHoldUsername = () => {
//     sessionStorage.removeItem("user")
// }

// // logout service 
// export const logout = () => {
//     // xoa token 
//     clearTokenHeader()
//     // xoa session
//     clearSessionHoldUsername()
//     // clear role 
//     localStorage.removeItem("role")

// }
// // lay role 
// export const getRole = () => {
//     return localStorage.getItem("role")
// }
// api log out 
export const apiLogout = () => axios.post(`${URL_BASIC}/logout`)