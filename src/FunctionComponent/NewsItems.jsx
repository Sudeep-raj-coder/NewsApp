import React from 'react'

export default function NewsItems(props) {

  return (
    <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 mar'>
      <div className="card">
        {
          props.pic ?
            <img src={props.pic} height="200px" alt="..." className="card-img-top" /> :
            <img src="./images/noimage.jpg" height="200px" alt="..." className="card-img-top" />
        }
        <div className="card-body">
          <h5 className="card-title">{Date(props.date)}</h5>
          <div className='d-flex justify-content-between'>
            <h6 className='date'>{props.source}</h6>
            <h6 className='date'>{props.date}</h6>
          </div>
          <hr />
          <p className="h">{props.description}</p>
          <a href={props.url} target="-blank" className=" btn btn-primary"> Read Full Article</a>
        </div>
      </div>
    </div>
  )
}

