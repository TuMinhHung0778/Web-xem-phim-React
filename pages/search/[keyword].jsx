import React,{useState,useContext,useEffect} from 'react'
import { useRouter } from 'next/router'
import Search from '../../components/Search'
import Modal from '../../components/Modal'
import { ModalContext } from '../../context/Modal'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from 'react-query'
import axios from 'axios'
import { ProfileContext } from '../../context/profile'


function SearchPage() {
  const router = useRouter()
  const {isAuthenticated} = useContext(ProfileContext)
  const {showModal,setShowModal} = useContext(ModalContext)
  const [modalData,setModalData] = useState({})

  const query = router.query.keyword
  const  handelModal = (data) => {
      setModalData(data)
      setShowModal(true)
  }
  const fetchSearch = async({pageParam = 1})=>{
    const res = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=7292f619013a396c80612a34da77ddaa&language=vi&query=${router.query.keyword}&page=${pageParam}&include_adult=false`
      )
    return res.data
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
  } = useInfiniteQuery(['search-movies',query],fetchSearch,{
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
      <Search  handelModal={handelModal} data={data} keyword={router.query.keyword}/>
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

      {showModal && <Modal type="movie" data={modalData} />}
    </>
  )
}

export default SearchPage