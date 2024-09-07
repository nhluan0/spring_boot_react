
import { useEffect, useState } from "react";
import { FaRedhat } from "react-icons/fa";
import { FaHeartbeat } from "react-icons/fa";
import { GiCooler } from "react-icons/gi";
import { TbBuildingSkyscraper } from "react-icons/tb";
import { apiGet10TourByPriceDesc } from "../service/TourService";
import { FaStar } from "react-icons/fa";
import { IoBookSharp } from "react-icons/io5";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import HeaderBody from "./HeaderBody";

const HomePage = () => {
    const [listTour, setListTour] = useState([])

    const [tourFilter, setTourFilter] = useState([])
    const [idex, setIdex] = useState(4); // Đặt idex vào state

    const navigator = useNavigate();

    // Khi vừa load trang đầu tiên thì load 10 tour theo price desc 
    useEffect(() => {
        get10TourByPriceDesc();

    }, []);

    // Set slide ảnh 
    useEffect(() => {
        const interval = setInterval(() => {
            let newIndex = idex;
            if (newIndex > 9) {
                newIndex = 4;
            }
            const tours = listTour.filter((_, index) => index >= newIndex - 4 && index < newIndex);
            setTourFilter(tours);
            console.log(tours, newIndex);
            setIdex(newIndex + 1); // Cập nhật giá trị của idex

        }, 2000);
        return () => clearInterval(interval);
    }, [idex, listTour]); // Thêm listTour vào dependency array

    const get10TourByPriceDesc = async () => {
        await apiGet10TourByPriceDesc().then(
            response => {
                console.log(response.data)
                let newIndex = idex;
                const tours = response.data.filter((_, index) => index >= newIndex - 4 && index < newIndex);
                setTourFilter(tours);
                setListTour(response.data)

            }
        ).catch(err => {
            console.log(err)
        })
    }


    const handleClickDetail = (e) => {
        const id = e.currentTarget.id
        console.log(e.currentTarget.id)
        navigator(`/home/detail/${id}`)
    }
    return (
        <div className='container-lg'>
            <div className='top-home-page'>
                <Header />
                <HeaderBody />
            </div>

            {/* phan than page home */}
            <div className='bg-light'>
                <div className='than-page-home p-5'>
                    <div className='row '>
                        <div className='col-3  text-center p-1'>
                            <div className=' bg-white  rounded m-1'>
                                <FaRedhat className='text-danger' style={{ fontSize: "50px" }} />
                                <h5 >Best price</h5>
                                <div className='text-start p-1'>A small river named Dudans flows by their picture and supplies</div>
                            </div>

                        </div>
                        <div className='col-3  text-center p-1'>
                            <div className='bg-white  rounded m-1'>
                                <FaHeartbeat className='text-danger' style={{ fontSize: "50px" }} />
                                <h5 >Best price</h5>
                                <div className='text-start p-1'>A small river named Dudans flows by their picture and supplies</div>
                            </div>
                        </div>
                        <div className='col-3  text-center p-1'>
                            <div className=' bg-white rounded m-1'>
                                <GiCooler className='text-danger' style={{ fontSize: "50px" }} />
                                <h5 >Best price</h5>
                                <div className='text-start p-1'>A small river named Dudans flows by their picture and supplies</div>
                            </div>
                        </div>
                        <div className='col-3 p-1'>
                            <div className='bg-white  text-center rounded m-1'>
                                <TbBuildingSkyscraper className='text-danger' style={{ fontSize: "50px" }} />
                                <h5 >Best price</h5>
                                <div className='text-start p-1'>A small river named Dudans flows by their picture and supplies</div>
                            </div>
                        </div>
                    </div>

                </div>
                {/* phan than thu 2 */}
                <div>
                    <h3 className='text-center'>Top tour packages</h3>
                    <div className='silde-tour'>
                        {tourFilter.length > 0 &&
                            tourFilter.map((tour, index) => {
                                return <div
                                    id={tour.id}
                                    className="card mx-1 my-1"
                                    style={{ overflow: "hidden", cursor: "pointer" }}
                                    key={index}
                                    onClick={(e) => handleClickDetail(e)}
                                >
                                    <img
                                        src={`data:image/jpeg;base64,${tour.image}`}
                                        style={{ height: "150px", width: "auto" }}
                                    />
                                    <div className="row  ps-1">
                                        <h5 className="col-8 " >{tour.name}</h5>
                                        <h6 className="text-center col-4 text-danger">{tour.price}</h6>


                                    </div>
                                    <div className="row ps-1 justify-content-center">
                                        <div className=" col-8 ">
                                            <FaStar className="text-warning" />
                                            <FaStar className="text-warning" />
                                            <FaStar className="text-warning" />
                                            <FaStar className="text-warning" />
                                            <FaStar className="text-warning" />
                                            <label className="form-label ps-2">5 sao</label>
                                        </div>
                                        <div className="text-center text-info col-4">VND</div>
                                    </div>
                                    <div className="ps-1">
                                        from {tour.start_date} to {tour.end_date}
                                    </div>
                                    <hr style={{ margin: "0", padding: "0" }}></hr>
                                    <div className="row ps-1 justify-content-center my-2">
                                        <div className="col-8">
                                            <IoBookSharp /> {tour.address}
                                        </div>
                                        <div className="col-4 ">
                                            <button className="btn btn-success btn-sm">Book now</button>
                                        </div>
                                    </div>
                                </div>
                            }

                            )
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    )
}

export default HomePage
