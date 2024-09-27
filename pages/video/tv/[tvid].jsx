import React,{useEffect,useContext} from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import ListSeason from '../../../components/ListSeason'
import { ProfileContext } from '../../../context/profile'
import RecommentList from '../../../components/RecommentList'


function Video({details,seasons,recomment}) {
    const router = useRouter()
    const {isAuthenticated} = useContext(ProfileContext)
    useEffect(() => {
      if(!localStorage.getItem('profile')){
        router.push('/')
      }
    },[isAuthenticated])
    return (
        <div className="video-wr">
            <div className="tv-name">{details?.name}</div>
            <div className="video">
              <iframe
               className="video-iframe" 
               src={`https://2embed.org/embed/series?tmdb=${router.query.tvid}&sea=${router.query.s ||1}&epi=${router.query.e || 1}`} width="100%" 
               height="100%" 
               frameBorder="0" 
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
               allowFullScreen>
              </iframe>
            </div>
            <div className="tv-ss">
              {seasons.map((s,i) => (
                <ListSeason data={s} key={i} id={details.id}/>
              ))}
              <RecommentList data={recomment} />
            </div>
        </div>
    )
}

export default Video
export async function getServerSideProps(ctx){
    const id = ctx.params.tvid
    const seasons = [];
    const recomment = await axios.get(`https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${process.env.API_KEY}&language=vi`)
    const samilar = await axios.get(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=${process.env.API_KEY}&language=vi`)

    const details = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.API_KEY}&language=vi`)
    const fetchTvSeason = async (s)=>{
      for(let i = 1;i<=s;i++){
        const res = await axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${i}?api_key=${process.env.API_KEY}&language=vi`)
        seasons.push(res.data)
      }
    }
    if(details.data.number_of_seasons){
      await fetchTvSeason(details.data.number_of_seasons)
    }
    return {
        props: {
          recomment: recomment.data.results.length > 0 ? recomment.data : samilar.data,  
          details: details.data,
          seasons: seasons
        }
    }
}

