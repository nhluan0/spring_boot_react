import { useEffect, useState } from 'react'
import Footer from '../home/Footer'
import Header from '../home/Header'
import HeaderBody from '../home/HeaderBody'
import { apiGet4TourByNumPage } from '../service/TourService'
import TourCard from '../home/TourCard'

const Tour = () => {
  const [numPage, setNumPage] = useState(0)
  const [tours, setTours] = useState([])
  const [totalPage, setTotalPage] = useState(0)

  useEffect(() => {
    if (numPage === 0) {
      getTourByPageNumber(numPage)
    } else if (numPage < totalPage) {
      getTourByPageNumber(numPage)
    }
  }, [numPage])
  // api get all tour by numer page
  const getTourByPageNumber = async (numberPage) => {
    await apiGet4TourByNumPage(numberPage)
      .then((response) => {
        console.log(response.data)

        setTours([...tours, ...response.data.content])
        if (!totalPage) {
          setTotalPage(response.data.totalPages)
        }
      })
      .catch((err) => {
        console.log(err.response.data)
      })
  }
  return (
    <div className="container-lg">
      <div className="top-home-page">
        <Header />
        <HeaderBody />
      </div>
      <div className="bg-light">
        <div className=" silde-tour">
          {tours &&
            tours.length > 0 &&
            tours.map((tour, index) => {
              return (
                <>
                  <TourCard tour={tour} index={index} />
                </>
              )
            })}
        </div>
        <div className="text-center m-2">
          {numPage < totalPage - 1 && totalPage > 0 ? (
            <button
              className="btn btn-sm btn-danger"
              onClick={() => setNumPage((n) => n + 1)}
            >
              xem thêm
            </button>
          ) : null}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Tour
