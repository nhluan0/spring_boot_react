
import { useEffect, useState } from 'react'
import HeaderSearch from './HeaderSearch'
import { useParams } from 'react-router-dom'

import { apiSearchTourByAddressOrPrice, apiSearchTourByStartDate } from '../service/TourPublicService'
import BodySearchOrDetail from './BodySearchOrDetail'
import Footer from '../home/Footer'
import ErrorSearch from './ErrorSearch'

export default function SearchLocationOrPrice() {
    const [tours, setTours] = useState([])
    const [searchOrDetail, setSearchOrDetail] = useState("")
    const [keySearch, setKeySearch] = useState("")
    const [showError, setShowError] = useState(false)
    const { search, address, start, date } = useParams()
    useEffect(() => {
        console.log(search)
        if (search && address && !start) {
            if (search == "search" || search == "detail") setSearchOrDetail(search)
            setKeySearch(address)
            console.log(searchOrDetail)
            searchLocationOrPrice(address)
        }
        if (search && date && start) {
            if (search == "search" || search == "detail") setSearchOrDetail(search)
            setKeySearch(date)
            console.log(date)
            searchTourByStartDate(date)
        }

    }, [])

    const searchLocationOrPrice = async (addressOrPrice) => {
        setTours([])
        await apiSearchTourByAddressOrPrice(addressOrPrice).then(
            response => {
                console.log(response.data)
                setShowError(false)
                setTours(response.data)
            }
        ).catch(err => {
            console.log(err)
            setShowError(true)
        })
    }
    const searchTourByStartDate = async () => {
        setTours([])
        if (date) {
            await apiSearchTourByStartDate(date).then(
                response => {
                    console.log(response.data)
                    setShowError(false)
                    setTours(response.data)
                }
            ).catch(err => {
                console.log(err)
                setShowError(true)
            })
        }
    }

    return (
        <div className='container-lg'>
            <HeaderSearch search={searchOrDetail} keys={keySearch} />
            {!showError &&
                <BodySearchOrDetail tours={tours} />
            }
            {showError &&
                <ErrorSearch />
            }

            <Footer />
        </div>
    )
}
