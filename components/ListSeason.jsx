import React,{useEffect,useContext} from 'react'
import { Col, Row } from 'antd'
import { imageUrl } from '../utils/contant'
import {useRouter} from 'next/router'
import { AnimationContext } from '../context/Animation'
function ListSeason({data,id}) {
  const {handleAnimation} = useContext(AnimationContext)
  const router = useRouter()
  const handelOnClick = (item) =>{
    router.push(`/video/tv/${id}?s=${item.season_number}&e=${item.episode_number}`)
    handleAnimation()
  }
  return (
    <div className="season-list">
        <div className="season-label">{data?.name || 'Season'}</div>
      <Row className="list-row season-row" gutter={6}>
        {data?.episodes?.map((item,index) =>(
            <>
            {item.still_path && (
                <Col xxl={4} lg={6} md={6} xs={12} key={index} className="list-col season-col"
                  onClick={()=>handelOnClick(item)}
                >
                    <div className="episode-img-wr">
                        <img className="episode-img" src={`${imageUrl}${item.still_path}`} alt="" />
                        
                        <div className="episode-info">
                            <p className="episode-name">{`Tập ${index + 1}`}</p>
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

export default ListSeason