import axios from 'axios'
import React, {Fragment, useEffect, useState,useContext} from 'react'
import { useInView } from 'react-intersection-observer'
import { QueryClient, useInfiniteQuery } from 'react-query'
import Hero from '../../components/Hero'
import Modal from '../../components/Modal'
import Page from '../../components/Page'
import { ModalContext } from '../../context/Modal'
import { useRouter } from 'next/router'
import { ProfileContext } from '../../context/profile'

const fetchTrending = async({pageParam = 1})=>{
    const res = await axios.get('https://api.themoviedb.org/3/trending/all/day?api_key=7292f619013a396c80612a34da77ddaa&language=vi&page=' + pageParam)
    return res.data
}
function TrendingPage({hero}) {
    const router = useRouter()
    const {isAuthenticated} = useContext(ProfileContext)
    const {showModal,setShowModal} = useContext(ModalContext)
    const [modalData,setModalData] = useState({})
    
    const  handelModal = (data) => {
        setModalData(data)
        setShowModal(true)
    }

    const { ref, inView } = useInView()
    const {
        status,
        data,
        error,
        isFetching,
        isFetchingNextPage,
        isFetchingPreviousPage,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage,
    } = useInfiniteQuery('trending-movies',fetchTrending,{
       
        getNextPageParam: (lastpage,pages) =>{
            return pages.length + 1
        }
    })
    useEffect(() => {
        if (inView) {
            fetchNextPage()
        }
    }, [inView])
    useEffect(() => {
        if(!localStorage.getItem('profile')){
            router.push('/')
        }
    },[isAuthenticated])
    return (
    <>
    <Hero data={hero} backdrop="/moon-fall.jpg" type="movie"/>
    <Page data={data} handelModal={handelModal} label="Trending"/>
    <div>
            <button
              ref={ref}
              onClick={() => fetchNextPage()}
              className="Load More"
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? 'Loading more...'
                : hasNextPage
                ? 'Load Newer'
                : 'Nothing more to load'}
            </button>
        </div>
          <div>
            {isFetching && !isFetchingNextPage
              ? 'Background Updating...'
              : null}
    </div>
    {showModal && <Modal type="movie" data={modalData}/>}
    </>
  )
}

export default TrendingPage
export async function getServerSideProps(ctx){
    const hero = await axios.get(`https://api.themoviedb.org/3/movie/406759?api_key=${process.env.API_KEY}&language=vi`)

    return {
        props:{
            hero: hero.data
        }
    }
}
