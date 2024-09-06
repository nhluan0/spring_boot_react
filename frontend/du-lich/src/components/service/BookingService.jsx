import axios from "axios";

const URL_BASIC = "http://localhost:8080/booking"
// api add new Booking
export const apiAddNewBooking = (requestBooking) => axios.post(URL_BASIC, requestBooking);
// api detail user da booked
export const apiGetInfoUserBookedTours = (user) => axios.get(`${URL_BASIC}/info?username=${user}`)
// api delete booked
export const apiDeleteTourBooked = (id) => axios.delete(`${URL_BASIC}/${id}`)