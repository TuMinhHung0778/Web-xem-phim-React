import React,{useEffect,useContext} from 'react'
import { Col, Row } from 'antd'
import { imageUrl } from '../utils/contant'
import {useRouter} from 'next/router'
import { AnimationContext } from '../context/Animation'
function RecommentList({data}) {
    console.log('data',data)
  const {handleAnimation} = useContext(AnimationContext)
  const router = useRouter()
  const handelOnClick = (item) =>{
    router.push(`/watch/${item.media_type}/${item.id}`)
    handleAnimation()
  }
  return (
    <div className="season-list">
        <div className="season-label">Phim hay bạn có thể bỏ lỡ </div>
        <Row className="list-row season-row" gutter={6}>
            {data?.results?.map((item,index) =>(
                <>
                    {item.backdrop_path && (
                        <Col xxl={4} lg={6} md={6} xs={12} key={index} className="list-col season-col"
                         onClick={()=>handelOnClick(item)}
                        >
                            <div className="episode-img-wr">
                                <img className="episode-img" src={`${imageUrl}${item.backdrop_path}`} alt="" />
                                
                                <div className="episode-info">
                                    <p className="episode-name">{item.title || item.name}</p>
                                </div>
                            </div>
                        </Col>
                    )}
                </>
            ))}
        </Row>

    </div>
  )
}

export default RecommentList