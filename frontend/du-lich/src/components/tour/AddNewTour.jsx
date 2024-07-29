import { useState } from "react"
import CommonEditor from "../editor/CommonEditor"
import { apiAddNewTour, apiGetTourById } from "../service/TourService"


const AddNewTour = () => {
    const [tour, setTour] = useState({
        title: "",
        description: "",
        start_date: "",
        date_end: "",
        price: "",
        address: ""
    })
    const [errorMess, setErrorMess] = useState({
        title: "",
        description: "",
        start_date: "",
        date_end: "",
        price: "",
        address: "",
        file: ""
    })
    const [file, setFile] = useState(null)
    const [imagePreview, setImagePreview] = useState("")
    const [content, setContent] = useState("");
    const [showDescription, setShow] = useState("11")
    const [messSuccess, setMessSuccess] = useState("")
    const handleOnchange = (newContent) => {
        setContent(newContent)
        setTour({ ...tour, description: newContent })
        // setContent(e.target);
        // Gửi dữ liệu đến server hoặc lưu trữ ở đâu đó
        console.log('Content saved:', newContent);

    };

    // handle onChane input Tour
    const handleInputChange = (e) => {
        const name = e.target.name
        const value = e.target.value;
        setTour({ ...tour, [name]: value })
    }
    // xu ly file anh nhap tu may tinh 
    const handleInputFileChange = (e) => {
        const fileFromLaptop = e.target.files[0]
        console.log(fileFromLaptop)
        if (fileFromLaptop) {
            setFile(fileFromLaptop)
            setTour({ ...tour, file: fileFromLaptop })
            // chuyen doi file thanh blob => hien thi anh dc tren trinh duyet
            setImagePreview(URL.createObjectURL(fileFromLaptop))
        }
    }

    // submit form add a new tour 
    const handleSubmit = async (e) => {
        e.preventDefault()

        await apiAddNewTour(tour, file).then(response => {
            setMessSuccess("Thêm mới chuyến du lịch thành công")
            setTimeout(() => {
                setMessSuccess("")
            }, 10000)
            console.log(response)
        }).catch(err => {
            const errData = err.response.data
            const resetError = {
                title: "",
                description: "",
                start_date: "",
                date_end: "",
                price: "",
                address: "",
                file: ""
            }
            setErrorMess({ ...resetError, ...errData })
            setMessSuccess("Thêm mới chuyến du lịch thất bại")
            setTimeout(() => {
                setMessSuccess("")
            }, 10000)
        })
    }
    // get Tour by id 
    const handleClickGetTourById = async () => {
        await apiGetTourById(15).then(response => {
            let descriptionFromApi = response.data.description;

            // Loại bỏ dấu \

            setShow(descriptionFromApi);
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <div className='container-lg'>
            <br></br>
            {messSuccess && <div className="text-danger alert alert-success">{messSuccess}</div>}
            <form>
                <div className="row">
                    <div className='col-md-6  '>
                        <label className="form-label" htmlFor="title">Tên chuyến du lịch:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            value={tour.title}
                            onChange={handleInputChange}
                        ></input>
                        {errorMess.title && <div className="text-danger">{errorMess.title}</div>}
                    </div>
                    <div className='col-md-6 '>
                        <label className="form-label">Giá (VND):</label>
                        <input
                            type="number"
                            className="form-control"
                            id="price"
                            name="price"
                            value={tour.price}
                            onChange={handleInputChange}
                        ></input>
                        {errorMess.price && <div className="text-danger">{errorMess.price}</div>}
                    </div>
                </div>

                <div className="row">
                    <div className='col-md-6  '>
                        <label className="form-label" htmlFor="start_date">Ngày bắt đầu:</label>
                        <input
                            type="date"
                            className="form-control"
                            id="start_date"
                            name="start_date"
                            value={tour.start_date}
                            onChange={handleInputChange}
                        ></input>
                        {errorMess.start_date && <div className="text-danger">{errorMess.start_date}</div>}
                    </div>
                    <div className='col-md-6 '>
                        <label className="form-label" htmlFor="dateEnd">Ngày kết thúc:</label>
                        <input
                            type="date"
                            className="form-control"
                            id="dateEnd"
                            name="date_end"
                            value={tour.date_end}
                            onChange={handleInputChange}
                        ></input>
                        {errorMess.date_end && <div className="text-danger">{errorMess.date_end}</div>}
                    </div>
                </div>

                <div className="row">
                    <div className='col-md-6  '>
                        <label className="form-label" htmlFor="address">Địa chỉ:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                            value={tour.address}
                            onChange={handleInputChange}
                        ></input>
                        {errorMess.address && <div className="text-danger">{errorMess.address}</div>}
                    </div>
                    <div className='col-md-6 '>
                        <label className="form-label" htmlFor="file">Chọn ảnh:</label>
                        <input
                            type="file"
                            className="form-control"
                            id="file"
                            name="file"
                            onChange={handleInputFileChange}
                        ></input>

                    </div>
                </div>

                <div className="row col-md-6 ms-auto">
                    {errorMess.file && <div className="text-danger ">{errorMess.file}</div>}
                    <h5>Ảnh xem trước</h5>
                    <img
                        className=""
                        src={imagePreview}

                        style={{ maxHeight: "400px", maxWidth: "400px" }}></img>
                </div>
                <br></br>
                <h4>Mô tả</h4>
                {errorMess.description && <div className="text-danger">{errorMess.description}</div>}
                <CommonEditor initialContent={content} handleOnchange={handleOnchange} />
                <div className="d-flex">
                    <button
                        type="button"
                        className="btn btn-sm btn-secondary ms-auto mt-1 mx-1"
                    >Quay lại</button>
                    <button
                        type="submit"
                        className="btn btn-sm btn-primary  mt-1"
                        onClick={handleSubmit}
                    >Lưu</button>
                </div>
            </form>
            <div>
                <h2>Saved Content:</h2>
                <button
                    type="button"
                    className="btn btn-sm btn-info"
                    onClick={handleClickGetTourById}
                >Lay content Tour</button>
                <div dangerouslySetInnerHTML={{ __html: showDescription }} />
            </div>
        </div>
    )
}

export default AddNewTour
