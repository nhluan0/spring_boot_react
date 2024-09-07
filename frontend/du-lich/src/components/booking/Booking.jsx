import { useEffect, useState } from 'react'
import { getUserFromSession } from '../service/LoginService'
import { apiAddNewBooking } from '../service/BookingService'
import GlobalContext from '../../UseContext'

export default function Booking({ priceAdult, priceChildren, id, tour }) {
    const [adult, setAdult] = useState("")
    const [children, setChildren] = useState("")
    const [totalPrice, setTotalPrice] = useState(0)
    const [giaAdult, setGiaAdult] = useState(0)
    const [giaChildren, setGiaChildren] = useState(0)
    const [bookSuccess, setBookSuccess] = useState("")
    const { username } = GlobalContext()

    useEffect(() => {
        setBookSuccess("")
        if (adult && children && tour) {

            const adultPrice = parseFloat(adult) * parseFloat(priceAdult);
            const childrenPrice = parseFloat(children) * parseFloat(priceChildren);

            setGiaAdult(adultPrice);
            setGiaChildren(childrenPrice);

            const total_price = adultPrice + childrenPrice + parseFloat(tour.price); // Use the calculated values directly
            console.log(total_price);
            setTotalPrice(total_price);
        }
    }, [adult, children, tour, priceAdult, priceChildren]);
    const handleSubmitBooking = async () => {

        setBookSuccess("")
        if (!username) {
            alert("dang nhap truoc khi booking")
            return
        }

        if (!adult || !children) {
            alert("dien day du thong tin truoc khi booking")
            return
        }
        if (id) {
            const requestBooking = {
                "quantityAdults": adult,
                "quantityChildren": children,
                "tourId": id,
                "username": username
            }
            await apiAddNewBooking(requestBooking).then(response => {
                console.log(response.data)
                setTimeout(() => {
                    setBookSuccess("")
                }, 5000);
                setBookSuccess("Booking thanh cong")

            }).catch(err => {
                console.log(err.response.data)
                setTimeout(() => {
                    setBookSuccess("")
                }, 5000);
                setBookSuccess(err.response.data)
            })
        }

    }
    return (
        <div className='px-4'>
            <form>
                <div className='row'>
                    <div className='col-6 '>
                        <label
                            htmlFor="adult"
                            className='form-label fw-bold'

                        >

                            Số lượng/người lớn({parseFloat(priceAdult).toLocaleString('vi-VN')} vnd/người)
                        </label>
                        <input
                            className='form-control'
                            id="adult"
                            value={adult}
                            onChange={(e) => setAdult(e.target.value)}
                        ></input>
                    </div>
                    <div className='col-6 '>
                        <label
                            htmlFor="children"
                            className='form-label fw-bold'

                        >
                            Số lượng/trẻ em({parseFloat(priceChildren).toLocaleString('vi-VN')} vnd/người)
                        </label>
                        <input
                            className='form-control'
                            id="children"
                            value={children}
                            onChange={(e) => setChildren(e.target.value)}
                        ></input>
                    </div>
                </div>
                <div className='d-grid'>
                    <button
                        className='btn btn-danger  btn-md mt-3'
                        type='button'
                        onClick={handleSubmitBooking}
                    >
                        Booking
                    </button>
                </div>


            </form>
            {(tour && children && adult) &&
                <div>
                    {bookSuccess &&
                        <h2 className='text-center mt-2 text-danger'>{bookSuccess}</h2>
                    }
                    <h2 className='text-center mt-2 text-danger'>Booking  {tour.address} </h2>
                    <div className='text-center text-success'>start :{tour.start_date} to {tour.end_date}</div>
                    <div className='row'>
                        <div className='col-6 fw-bold'>  Số lượng/người lớn({parseFloat(priceAdult).toLocaleString('vi-VN')} vnd/người): {adult}</div>
                        <div className='col-6 text-end fw-bold text-warning'>{giaAdult.toLocaleString('vi-VN')} VND</div>
                    </div >

                    <div className='row'>
                        <div className='col-6 fw-bold'>Số lượng/trẻ em({parseFloat(priceChildren).toLocaleString('vi-VN')} vnd/người): {children}</div>
                        <div className='col-6 text-end fw-bold text-warning'>{giaChildren.toLocaleString('vi-VN')} VND</div>
                    </div >

                    <div className='row'>
                        <div className='col-6 fw-bold'>Giá tour: </div>
                        <div className='col-6 text-end fw-bold text-warning'>{parseFloat(tour.price).toLocaleString('vi-VN')} VND</div>
                    </div >
                    <div className='row'>
                        <div className='col-6 fw-bold'>Tổng: </div>
                        <div className='col-6 text-end fw-bold text-danger'>{totalPrice.toLocaleString('vi-VN')} VND</div>
                    </div >

                </div>
            }

        </div>
    )
}
