import axios from "axios";
const URL_BASE = "http://localhost:8080/log"

// api register new user 
export const apiRegisterUser = (registerRequestUser) => axios.post(`${URL_BASE}/dang-ky`, registerRequestUser);
