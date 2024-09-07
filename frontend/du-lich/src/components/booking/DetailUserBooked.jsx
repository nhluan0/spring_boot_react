import { useEffect, useState } from 'react'
import Header from '../home/Header'
import HeaderBody from '../home/HeaderBody'
import Footer from '../home/Footer'

import { apiDeleteTourBooked, apiGetInfoUserBookedTours } from '../service/BookingService'
import GlobalContext from '../../UseContext'

export default function DetailUserBooked() {
    const [booked, setBooked] = useState([])
    // const [user, setUser] = useState("")
    const { username } = GlobalContext()
    useEffect(() => {
        getListBookedByUser()
    }, [])

    const getListBookedByUser = async () => {


        if (username) {

            await apiGetInfoUserBookedTours(username).then(response => {
                console.log(response.data)
                setBooked(response.data)
            }).catch(err => {
                console.log(err.response.data)
            })
        }

    }

    const handleDeleteTourBooked = async (id, name) => {
        const result = confirm(`Ban co muon xoa tour ${name} da dat ko`)
        if (result) {
            await apiDeleteTourBooked(id).then(response => {
                console.log(response.data)
                getListBookedByUser()
            }).catch(err => {
                console.log(err.response.data)
            })
        }

    }
    return (
        <div className='container-lg'>
            <div className='top-home-page'>
                <Header />
                <HeaderBody />
            </div>
            <div className='bg-light'>
                <div className='than-page-home p-5'>
                    {username &&
                        <div className='text-dark fs-3 py-2'>Thông tin Anh/Chị <i className='text-primary'>{username}</i> đã booked tour</div>
                    }
                    {booked.length > 0 &&
                        <table className='table table-bordered table-responsive'>
                            <thead>
                                <tr>
                                    <th>Tên</th>
                                    <th>Ảnh</th>
                                    <th>Ngày bắt đầu</th>
                                    <th>Ngày kết thúc</th>
                                    <th>Số người lớn</th>
                                    <th>Số trẻ nhỏ</th>
                                    <th>Ngày Đặt</th>
                                    <th>Tổng giá</th>
                                    <th>Hoạt động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {booked.map((book) => {
                                    return <tr key={book.id}>
                                        <td className='text-info fw-bold'>{book.tourDto.name}</td>
                                        <td>
                                            <img
                                                src={`data:image/jpeg;base64,${book.tourDto.image}`}
                                                style={{ height: "150px", width: "200px" }}
                                            />
                                        </td>
                                        <td>
                                            {book.tourDto.start_date}
                                        </td>
                                        <td>
                                            {book.tourDto.end_date}
                                        </td>
                                        <td>{book.quantityAdults}</td>
                                        <td>{book.quantityChildren}</td>
                                        <td className='text-warning fw-bold'>{book.created_date}</td>

                                        <td className='text-danger fw-bold'>{parseFloat(book.total_price).toLocaleString('vi-VN')} VND</td>
                                        <td >
                                            <div>

                                                <button
                                                    className='btn btn-sm btn-success'
                                                    onClick={() => handleDeleteTourBooked(book.id, book.tourDto.name)}
                                                >hủy
                                                </button>
                                            </div>

                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}
