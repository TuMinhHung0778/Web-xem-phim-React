import { useContext, useState, useEffect } from 'react'
import { useRouter} from 'next/router'
import Hero from "../components/Hero"
import axios from "axios"
import { popularMovies, top_ratedMovies, trending, tvShowPopular, tvShowTopRated } from "../utils/contant"
import List from "../components/List"
import { ModalContext } from '../context/Modal'
import Modal from '../components/Modal'
import { ProfileContext } from '../context/profile'

function HomePage ({hero,popular,top_rated,tvShowPopular,tvShowTopRated,trendingMovies}){
    const {isAuthenticated} = useContext(ProfileContext)
    const router = useRouter()

    const {showModal,setShowModal} = useContext(ModalContext)
    const [modalData,setModalData] = useState({})
    const [type,setType] = useState('')
    const  handelModal = (data) => {
        setModalData(data)
        setShowModal(true)
    }

   
    useEffect(() => {
        if(!localStorage.getItem('profile')){
            router.push('/')
        }
    },[isAuthenticated])

    return (
        <div className="Home-wr">
            <Hero data={hero} backdrop='/home-hero.jpg' type="movie"/>
            <div className="lists-of-list-movies">
                <List
                 label="Trending Movies" 
                 data={trendingMovies}
                 setShowModal={setShowModal}
                 handelModal={handelModal}
                 setType={setType}
                 
                />
                <List
                 label="Popular Movies" 
                 data={popular}
                 setShowModal={setShowModal} handelModal={handelModal}
                 setType={setType}
                />
                <List
                 label="Top Rated Movies"
                 data={top_rated}
                 setShowModal={setShowModal} handelModal={handelModal}
                 setType={setType}
                />
                <List
                 label="Tv Shows Popular"
                 data={tvShowPopular}
                 setShowModal={setShowModal} handelModal={handelModal}
                 setType={setType}
                />
                <List
                 label="Tv Shows Top Rated" 
                 data={tvShowTopRated}
                 setShowModal={setShowModal} handelModal={handelModal}
                 setType={setType}
                />
            </div>
            {showModal && <Modal type={type} data={modalData}/>}
        </div>
    )
}

export default HomePage

export async function getServerSideProps(ctx){
    const hero = await axios.get(`https://api.themoviedb.org/3/movie/425909?api_key=${process.env.API_KEY}&language=vi`)
    const popular = await axios.get(`${popularMovies}`)
    const topratedMovies = await axios.get(`${top_ratedMovies}`)
    const tvShowPopularMovies = await axios.get(`${tvShowPopular}`)
    const tvShowTopratedMovies = await axios.get(`${tvShowTopRated}`)
    const trendingMovies = await axios.get(`${trending}`)

    return {
        props: {
            hero : hero.data,
            popular : popular.data,
            top_rated: topratedMovies.data,
            tvShowPopular: tvShowPopularMovies.data,
            tvShowTopRated:tvShowTopratedMovies.data,
            trendingMovies: trendingMovies.data
        }
    }
}