import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGetTourById } from '../service/TourService'

const DetailTour = () => {
    const [detailTour, setDeTailTour] = useState({})
    const { id } = useParams()
    console.log(id)
    useEffect(() => {
        if (id) {
            getDetailTour(id)
        }
    }, [id])
    async function getDetailTour(id) {
        await apiGetTourById(id).then(
            response => {
                console.log(response)
                setDeTailTour(response.data)
            }
        )
    }
    return (
        <div className='container-md'>
            <div dangerouslySetInnerHTML={{ __html: detailTour.description }} />
        </div>

    )
}

export default DetailTour
