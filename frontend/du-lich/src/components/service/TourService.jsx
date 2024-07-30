import axios from "axios"

const URL_BASIC = "http://localhost:8080/tours"


// api add new Tour
export const apiAddNewTour = (tour, file) => {
    const formData = new FormData();

    formData.append("title", tour.title)
    formData.append("file", file)
    formData.append("description", tour.description)
    formData.append("start_date", tour.start_date)
    formData.append("date_end", tour.date_end)
    formData.append("price", tour.price)
    formData.append("address", tour.address)

    return axios.post(URL_BASIC, formData);
}
// api get Tour by id 
export const apiGetTourById = (id) => axios.get(`${URL_BASIC}/${id}`)
// api get All Tour 
export const apiGetAllTour = () => axios.get(URL_BASIC)
// api search Tour By address
export const apiSearchTourByAddress = (address) => axios.get(`${URL_BASIC}/search/${address}`)
// api update Tour By id
export const apiUpdateTourById = (id, tour, file) => {
    const formData = new FormData()

    formData.append("title", tour.title)
    formData.append("file", file)
    formData.append("description", tour.description)
    formData.append("start_date", tour.start_date)
    formData.append("date_end", tour.date_end)
    formData.append("price", tour.price)
    formData.append("address", tour.address)

    return axios.put(`${URL_BASIC}/${id}`, formData)
}