import {useRouter} from 'next/router'
import { AnimationContext } from '../context/Animation'
import React,{useContext} from 'react'

function Hero({data,backdrop,type}) {
    const {handleAnimation} = useContext(AnimationContext)

    const router = useRouter()
    const onHeroPlayClick = ()=>{
        router.push(`/watch/${type}/${data.id}`)
        handleAnimation()
    }
    return (
    <div
     className="hero-wr" 
     style={{backgroundImage:`url(${backdrop ? backdrop : `https://image.tmdb.org/t/p/w500${data.backdrop_path}`})`}} 
    >
        <div className="hero-ct">
            <div className="hero-movie-name">
                {data?.original_title || data?.name || data?.title || data?.original_name}
            </div>
            <div className="hero-btn">
                <button
                 className="btn-hero-play"
                 onClick={() =>onHeroPlayClick()}
                >
                    Play
                </button>
                <button className="btn-hero-info">More Info</button>
            </div>
            <div className="hero-movie-des">
                <p>{data?.overview}</p>
            </div>
            
        </div>
    </div>
  )
}

export default Hero