import React,{useEffect,useContext} from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import ListSeason from '../../../components/ListSeason'
import { ProfileContext } from '../../../context/profile'
import RecommentList from '../../../components/RecommentList'


function Video({details,recomment}) {
    const router = useRouter()
    const {isAuthenticated} = useContext(ProfileContext)

    useEffect(() => {
        if(!localStorage.getItem('profile')){
            router.push('/')
        }
    },[isAuthenticated])
    return (
        <div className="video-wr">
            <div className="tv-name">{details?.name || details?.title}</div>
            <div className="video">
                <iframe className="video-iframe" src={`https://2embed.org/embed/movie?tmdb=${router.query.movieid}`} width="100%" height="100%" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
            <div className="tv-ss">
              <RecommentList data={recomment} />
            </div>
        </div>
    )
}

export default Video
export async function getServerSideProps(ctx){
    const id = ctx.params.movieid
    const recomment = await axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.API_KEY}&language=vi`)
    const samilar = await axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.API_KEY}&language=vi`)
    const details = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=vi`)
   
    return {
        props: {
            recomment: recomment.data.results.length > 0 ? recomment.data : samilar.data,  
          details: details.data,
        }
    }
}

