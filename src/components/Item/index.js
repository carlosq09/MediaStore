import React from 'react'
// styles
import './index.scss'

const Item = ({ id, brand, price, model, imgUrl, onDetails }) => {
  return <div className="item" onClick={() => onDetails(id)}>
        <img className="item__image" alt={model} src={imgUrl} />
        <div className="item__content">
            <div className="item__brand">{brand}</div>
            <div className="item__model">{model}</div>
            <div className="item__price">Price: {price || 'See details'}</div>
        </div>
    </div>
}

export default Item
