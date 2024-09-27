import { Col, Row } from 'antd'
import { imageUrl } from '../utils/contant'
import { useContext, useState } from 'react'
import { ModalContext } from '../context/Modal'

function List({label,data,handelModal,setType}) {
  // console.log(data)

  const handelOnClick = (data)=>{
    if(label === 'Trending Movies' || label === 'Popular Movies' || label === 'Top Rated Movies'){
      setType('movie')
    }
    else{
      setType('tv')
    }
    handelModal(data)
  }

  return (
    <div className="list-wr">
      <h2 className="list-title">{label}</h2>
      <Row className="list-row" gutter={6}>
        {data?.results?.map((item,index) =>(
            <Col xxl={3} lg={4} md={6} xs={8} key={index} className="list-col"
              onClick={()=>handelOnClick(item)}
            >
              <div className="col-img-wr">
                <img className="col-item-img" src={`${imageUrl}${item.poster_path}`} alt="" />
                
                <div className="col-item-info">
                    <p className="movie-name">{item.title || item.name}</p>
                    <p className="relase-date">Ngày phát hành : {item.release_date}</p>
                    <p className="rated">Rate: {item.vote_average}</p>
                </div>
              </div>
            </Col>
        ))}
      </Row>

    </div>
  )
}

export default List