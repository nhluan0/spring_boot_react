import axios from "axios"

const URL_BASIC = "http://localhost:8080/tour"

// api search tour by address or price
export const apiSearchTourByAddressOrPrice = (addressOrPrice) => axios.get(`${URL_BASIC}/search/${addressOrPrice}`)
// api search tour by date start
export const apiSearchTourByStartDate = (startDate) => axios.get(`${URL_BASIC}/search/date/${startDate}`)