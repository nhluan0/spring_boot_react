import axios from "axios"

const URL_BASIC = "http://localhost:8080/comment"

// api add new comment
export const apiAddNewComment = (requestComment) => axios.post(URL_BASIC, requestComment)
// api get all comment
export const apiGetAllComment = () => axios.get(`${URL_BASIC}/all`)
// api get comment by tour id
export const apiGetCommentByTourId = (tourId) => axios.get(`${URL_BASIC}/${tourId}`)