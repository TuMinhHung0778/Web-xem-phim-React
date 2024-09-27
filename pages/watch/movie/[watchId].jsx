import React,{useEffect,useContext} from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { imageUrl } from '../../../utils/contant'
import ListSeason from '../../../components/ListSeason'
import { ProfileContext } from '../../../context/profile'
import { AnimationContext } from '../../../context/Animation'
import { PlayCircleOutlined } from '@ant-design/icons'
import RecommentList from '../../../components/RecommentList'

function Watch({recomment,movie}) {
  const router = useRouter()
  const id = router.query.watchId
  const {isAuthenticated} = useContext(ProfileContext)
  const {handleAnimation} = useContext(AnimationContext)

  const handlePlayBtnClick = ()=>{

    router.push(`/video/movie/${id}`)
    handleAnimation()
  }
  useEffect(() => {
    if(!localStorage.getItem('profile')){
      router.push('/')
    }
  },[isAuthenticated])
  return (
    <div className="main-wr">
      <div className="tv-sr-thumbnail-desktop">
        <div className="tv-sr-info">
            <div className="tv-sr-name">
                {movie?.name || movie?.title || movie?.original_title || movie?.original_name}
            </div>
            <div className="tv-sr-overview">
              <span>Mô tả : </span> {movie?.overview}
            </div>
            <button
             style={{ marginTop:'20px',width:'200px',height:'40px'}}
             className="btn btn-play "
             onClick={() =>handlePlayBtnClick()}
            >
              <PlayCircleOutlined /> Play
            </button>
        </div>
        <div className="tv-sr-more-info">
          <div className="tv-sr-poster">
              <img src={`${imageUrl}${movie?.poster_path}`} alt="" />
          </div>
          <div className="tv-sr-des">
              <div className="tv-des-detail"><span>Thể Loại : </span> {movie?.genres?.map(g=> `${g?.name}, `)}</div>
              <div className="tv-des-detail"><span>Nước sản xuất : </span>{movie?.production_countries?.map(c=> `${c?.name}, `)}</div>
              <div className="tv-des-detail"><span>Năm phát hành : </span> {movie?.first_air_date}</div>
              <div className="tv-des-detail"><span>Danh mục : </span> {movie?.status}</div>
          </div>
        </div>
        
      </div>
      
      <div className="mv-d-mobile">
        <div className="mv-mb-bg">
          <img src={`${imageUrl}/${movie.backdrop_path}`} alt="" />
        </div>
        <div className="mv-mb-info">
          <div className="mv-mb-name">
            {movie?.name || movie?.title || "Unknown"}
          </div>
          <div className="mv-mb-des ">
              <div className="mv-mb-des-detail">
                <span>Thể Loại : </span> {movie?.genres.map(g=> `${g.name}, `)}
              </div>
              <div className="mv-mb-des-detail">
                <span>Nước sản xuất : </span> {movie?.production_countries.map(c=> `${c.name}, `)}
              </div>
              <div className="mv-mb-des-detail">
                <span>Năm phát hành : </span> {movie?.first_air_date}
              </div>
              <div className="mv-mb-des-detail">
                <span>Trạng thái : </span> {movie?.status}
              </div>
          </div>
        </div>
        <button
         className="mv-mb-play-btn"
         onClick={() =>handlePlayBtnClick()}
        >
          <PlayCircleOutlined /> Play
        </button>
      </div>
      <div className="tv-ss tv-rcm">
        <RecommentList data={recomment} />
      </div>
    </div>
  )
}

export default Watch
export async function getServerSideProps(ctx){
    const id = ctx.params.watchId
    const recomment = await axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.API_KEY}&language=vi`)
    const samilar = await axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.API_KEY}&language=vi`)
    const movie = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=vi`)
    
    return {
        props: {
          recomment: recomment.data.results.length > 0 ? recomment.data : samilar.data,  
          movie: movie.data,
        }
    }
}