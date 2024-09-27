import React,{useEffect,useContext} from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useQuery } from 'react-query'
import { imageUrl } from '../../../utils/contant'
import ListSeason from '../../../components/ListSeason'
import { ProfileContext } from '../../../context/profile'
import RecommentList from '../../../components/RecommentList'

function Watch({recomment,TvDetails,seasons}) {
  const router = useRouter()
  const id = router.query.watchId
  const {isAuthenticated} = useContext(ProfileContext)

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
                  {TvDetails?.name || TvDetails?.title || TvDetails?.original_title || TvDetails?.original_name}
              </div>
              <div className="tv-sr-overview">
                <span>Mô tả : </span> {TvDetails?.overview}
              </div>
          </div>
          <div className="tv-sr-more-info">
            <div className="tv-sr-poster">
                <img src={`${imageUrl}${TvDetails?.poster_path}`} alt="" />
            </div>
            <div className="tv-sr-des">
                <div className="tv-des-detail"><span>Thể Loại : </span> {TvDetails?.genres?.map(g=> `${g?.name}, `)}</div>
                <div className="tv-des-detail"><span>Nước sản xuất : </span> {TvDetails?.production_countries[0]?.name}</div>
                <div className="tv-des-detail"><span>Năm phát hành : </span> {TvDetails?.first_air_date}</div>
                <div className="tv-des-detail"><span>Danh mục : </span> {TvDetails?.status}</div>
            </div>
          </div>
        </div>
        <div className="mv-d-mobile">
        <div className="mv-mb-bg">
          <img src={`${imageUrl}/${TvDetails.backdrop_path}`} alt="" />
        </div>
        <div className="mv-mb-info">
          <div className="mv-mb-name">
            {TvDetails?.name || movie?.title || "Unknown"}
          </div>
          <div className="mv-mb-des ">
              <div className="mv-mb-des-detail">
                <span>Thể Loại : </span> {TvDetails?.genres.map(g=> `${g.name}, `)}
              </div>
              <div className="mv-mb-des-detail">
                <span>Nước sản xuất : </span> {TvDetails?.production_countries.map(c=> `${c.name}, `)}
              </div>
              <div className="mv-mb-des-detail">
                <span>Năm phát hành : </span> {TvDetails?.first_air_date}
              </div>
              <div className="mv-mb-des-detail">
                <span>Trạng thái : </span> {TvDetails?.status}
              </div>
          </div>
        </div>
      </div>
        <div className="tv-ss">
          {seasons.map((s,i) => (
            <ListSeason data={s} key={i} id={id}/>
          ))}
          <RecommentList data={recomment} />
        </div>
    </div>
  )
}

export default Watch
export async function getServerSideProps(ctx){
    const id = ctx.params.watchId
    const seasons = [];
    const recomment = await axios.get(`https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${process.env.API_KEY}&language=vi`)
    const samilar = await axios.get(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=${process.env.API_KEY}&language=vi`)
    const tvDetails = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.API_KEY}&language=vi`)
    const fetchTvSeason = async (s)=>{
      for(let i = 1;i<=s;i++){
        const res = await axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${i}?api_key=${process.env.API_KEY}&language=vi`)
        seasons.push(res.data)
      }
    }
    if(tvDetails.data.number_of_seasons){
      await fetchTvSeason(tvDetails.data.number_of_seasons)
    }
    return {
        props: {
          recomment: recomment.data.results.length > 0 ? recomment.data : samilar.data,  
          TvDetails: tvDetails.data,
          seasons: seasons
        }
    }
}