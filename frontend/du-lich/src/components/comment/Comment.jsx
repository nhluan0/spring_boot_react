import { useEffect, useState } from 'react'

import GlobalContext from '../../UseContext'
import { apiAddNewComment, apiGetCommentByTourId } from '../service/CommentService'
import { FaStar } from 'react-icons/fa'

export default function Comment({ id }) {
    const [commentList, setCommentList] = useState([])
    const [commentRequest, setCommentRequest] = useState("")
    const [quantityStar, setQuantityStar] = useState(0)

    const { username } = GlobalContext()
    const arr = [1, 2, 3, 4, 5]
    useEffect(() => {
        getCommented()
    }, [])

    const getCommented = async () => {
        console.log(id)
        if (id) {
            await apiGetCommentByTourId(id).then(response => {
                console.log(response.data)
                setCommentList(response.data)
            }).catch(err => {
                console.log(err.response.data)
            })
        }

    }
    // gui comment 
    const handleSubmitComment = async () => {
        if (!username) {
            alert("dang nhap truoc khi comment")
            return
        }
        const requestComment = {
            tourId: id,
            username: username,
            comment: commentRequest,
            rate: quantityStar
        }
        if (commentRequest) {
            await apiAddNewComment(requestComment).then(response => {
                console.log(response.data)
                setCommentRequest("")
                getCommented(id);
            }).catch(err => {
                console.log(err.response.data)
            })
        }

    }

    const handleOnMuoseLeave = (index) => {

        setQuantityStar(index)
    }
    const handleOnMuoseEnter = (index) => {

        setQuantityStar(index)
    }
    return (
        <div className='bg-light px-4'>
            {commentList.length > 0 &&
                <h4>{commentList.length} comment</h4>
            }
            {commentList.length > 0 &&

                commentList.map((comment, index) => {
                    <br></br>
                    return <div className='px-4' key={index}>
                        <div className='text-uppercase'>{comment.username} </div>
                        <div className='fst-italic' style={{ opacity: "0.5" }}>{comment.dateCreated}</div>
                        <div className='fst-italic'>{comment.comment}</div>

                        <div
                            className='fst-italic mt-1'
                            style={{ opacity: "0.5" }}
                        >{comment.rate} sao
                        </div>
                        <br></br>
                    </div>
                })
            }

            <div className='d-flex align-items-center'>
                <i className='mx-1'>Đánh giá</i>
                {arr.map(e => {
                    return <FaStar
                        key={e}
                        style={{ cursor: "pointer" }}
                        onMouseLeave={() => handleOnMuoseLeave(e)}
                        onMouseEnter={() => handleOnMuoseEnter(e)}
                        className={(quantityStar > 0 && e <= quantityStar) ? `fs-2 text-warning` : `fs-2`}
                    />
                })

                }
                <i className='mx-1 text-danger fw-bold'>{quantityStar} sao</i>
            </div>
            <br></br>
            <textarea className='form-control' style={{ height: "250px" }}
                value={commentRequest}
                onChange={(e) => setCommentRequest(e.target.value)}
            ></textarea>
            <div className='d-grid my-2'>
                <button className='btn btn-danger btn-lg'
                    onClick={handleSubmitComment}
                >post comment</button>
            </div>


        </div>
    )
}
