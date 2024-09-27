import { Col, Row } from 'antd'
import React ,{Fragment} from 'react'
import { imageUrl } from '../utils/contant'

function Search({data,handelModal,keyword}) {
  return (
    <div className="search">
        <h2 className="search-for">Search For {keyword}</h2>
        <Row gutter={[6,10]} className="search-list">
            {data?.pages.map((group, i) => (
                <Fragment key={i}>
                    {group?.results.map((item,index)=>(
                        <Col
                         className="search-col"
                         key={index} xxl={3} md={4} xs={8} 
                         onClick={() =>handelModal(item)}
                        >
                        <div className="search-item">
                            <div className="search-item-img">
                                <img src={`${imageUrl}${item.poster_path || item.backdrop_path}`} />
                            </div>
                        </div>
                        <div className="search-info">
                            <p className="search-name">{item.name || item.title ||item.original_name || item.original_title}</p> 
                            <div className="search-play-icon">
                                <img src="/play.png" alt="icon" />
                            </div>
                        </div>
                        </Col>
                    ))}
                </Fragment>
            ))}
        </Row>
        
    </div>
  )
}

export default Search