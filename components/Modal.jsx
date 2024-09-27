import { useRouter } from 'next/router'
import React, {useState, useEffect,useContext} from 'react'
import { AnimationContext } from '../context/Animation'
import { ModalContext } from '../context/Modal'
import { imageUrl } from '../utils/contant'

function Modal({data,type}) {
    const router = useRouter()
    const [movie,setMovies] = useState(data)
    const {setShowModal} = useContext(ModalContext)
    const {handleAnimation} = useContext(AnimationContext)

    useEffect(() => {
        setMovies(data)
    },[data])

    const handelOnClick = (e) => {
        router.push(`/watch/${e.media_type || type}/${e.id}`)
        handleAnimation()
        setShowModal(false)
    }
    return (
    <div className="modal-wr">
        <div
         className="modal-overlay"
         onClick={() =>setShowModal(false)}
        ></div>
        <div className="modal-ct">
            <div className="modal-close" onClick={() =>setShowModal(false)}></div>

            <div className="modal-head" style={{backgroundImage:`url(${imageUrl}${data?.backdrop_path})`}}>
                <div className="play-btn">
                    <button
                     className="btn btn-play"
                     onClick={() =>handelOnClick(data)}
                    >
                        Xem
                    </button>
                </div>
            </div>
            <div className="modal-body">
                <h2 className="modal-movie-name">{data?.name || data?.title || data?.original_title || data?.original_name}</h2> 
                <p className="modal-movie-overview">
                    {data?.overview}
                </p>
            </div>
            <div className="modal-ft">
                <h2 className="modal-ft-title">
                    Thông tin về {data?.name || data?.title || data?.original_title || data?.original_name}
                </h2>
                <p className="modal-ft-info">
                    Ngày phát hành : <span className="span-bold">{data?.release_date}</span>
                </p>
                <p className="modal-ft-info">
                    Điểm : <span className="span-bold">{data?.vote_average}</span>
                </p>
                <p className="modal-ft-info">
                    Ngôn ngữ gốc : <span className="span-bold">{data?.original_language}</span>
                </p>
                <p className="modal-ft-info">
                    Vote : <span className="span-bold">{data?.vote_count}</span>
                </p>
            </div>
        </div>
    </div>
  )
}

export default Modal