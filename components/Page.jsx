import { Col, Row } from 'antd'
import React,{Fragment} from 'react'
import { imageUrl } from '../utils/contant'

function Page({data,handelModal,label}) {
  return (
    <div className="mv">
        <h2 className="mv-title">{label}</h2>
        <Row gutter={[6,10]} className="mv-row">
            {data?.pages.map((group, i) => (
                <Fragment key={i}>
                    {group?.results.map((item,index)=>(
                        <>
                            {item.backdrop_path && (
                                <Col
                                 className="mv-col"
                                 key={index} xxl={3} md={4} xs={12} 
                                 onClick={() =>handelModal(item)}
                                >
                                    <div className="mv-item">
                                        <div className="mv-item-img">
                                            <img src={`${imageUrl}${item.backdrop_path}`} />
                                        </div>
                                    </div>
                                    <div className="mv-info">
                                        <p className="mv-name">{item.name || item.title ||item.original_name || item.original_title}</p> 
                                        <div className="mv-play-icon">
                                            <img src="/play.png" alt="icon" />
                                        </div>
                                    </div>
                               </Col>
                            )}
                        </>
                    ))}
                </Fragment>
            ))}
        </Row>
        
    </div>
  )
}

export default Page