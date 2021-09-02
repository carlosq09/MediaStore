import React, { useState, useEffect } from 'react'
import { withRouter, useParams } from 'react-router-dom'
// API
import Api from '../../api'
// components
import Specifications from './components/Specifications'
import AddCart from './components/AddCart'
// styles
import './index.scss'

function ProductDetails ({ history }) {
  const { id } = useParams()
  const [item, setItem] = useState([])

  const handleAddToCart = (e) => {
    e.preventDefault()

    const { target: { color: { value: color }, storage: { value: storage } } } = e

    Api.AddToCart(id, JSON.parse(color), JSON.parse(storage), item).then((count) =>
      history.push(`/products/${id}?addedTocart=${count}`)
    )
  }

  useEffect(() => {
    Api.getProductDetails(id).then((response) => setItem(response))
  }, [id])

  return <div className="productDetails" key={`${item.brand}`}>
        <div className="productDetails__image-container">
            <img className="productDetails__image" alt={item.model} src={item.imgUrl} />
            {item.dimentions && <p className="productDetails__dimention">{item.dimentions}</p>}
        </div>
        <div className="productDetails__content">
            <h1 className="productDetails__model"> {item.model}</h1>
            <h2 className="productDetails__brand"> {item.brand}</h2>
            <Specifications specs={{
              CPU: item.cpu,
              RAM: item.ram,
              OS: item.os,
              Battery: item.Battery,
              'Primary Camera': item.primaryCamera,
              'Secondary Camera': item.secondaryCamera,
              Display: item.displayResolution,
              Weight: item.weight
            }} />
            {item.options && <AddCart price={item.price} options={item.options} onAddtoCart={handleAddToCart} />}
        </div>
    </div>
}

export default withRouter(ProductDetails)
