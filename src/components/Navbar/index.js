import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
// Components
import { BiCart } from 'react-icons/bi'
import Cart from '../Cart'
// API
import Api from '../../api'
// Styles
import './index.scss'

const Navbar = ({ history }) => {
  const [openCart, setOpenCart] = useState(false)
  const [CartQuantity, setCartQuantity] = useState(0)
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)

  const toggleCart = () => setOpenCart(!openCart)

  const handleRemoveCartProduct = (itemIndex) => {
    Api.removeCartProduct(itemIndex).then(({ products, totalPrice, totalQuantity }) => {
      setCartQuantity(totalQuantity)
      setTotal(totalPrice)
      setProducts(products)
    })
  }

  useEffect(() => {
    Api.getCartProducts().then(({ products, totalPrice, totalQuantity }) => {
      setCartQuantity(totalQuantity)
      setTotal(totalPrice)
      setProducts(products)
    })
  }, [history.location])

  return <nav className="navbar">
        <div className="navbar__container">
            <div className="navbar__cartIndicator" onClick={toggleCart} >
                <BiCart size="30px" color="red" />
                <span >{CartQuantity}</span>
            </div>
            <h3 onClick={() => history.push('/products')}>MEDIASTORE</h3>
        </div>
        {openCart && <Cart
            toggle={toggleCart}
            products={products}
            total={total}
            onRemoveCartProduct={handleRemoveCartProduct}
        />}
    </nav>
}

export default withRouter(Navbar)
