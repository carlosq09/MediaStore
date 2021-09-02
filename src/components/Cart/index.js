import React from 'react'
import { BiX } from 'react-icons/bi'
// styles
import './index.scss'

const Cart = ({ toggle, total, products, onRemoveCartProduct }) => {
  return (
        <div className="cart">
            <div className="cart__header">
                <h2>Current Cart</h2>
                <BiX onClick={toggle} color="red" size="30px" />
            </div>
            {products.length > 0
              ? products.map(({ id, count, brand, price, imgUrl, model, storage, color }, index) =>
                    <li key={id} className="cart__item">
                        <img className="cart__image" alt="cart" src={imgUrl} />
                        <div className="cart__content">
                            <div className="cart__data">{brand}</div>
                            <div className="cart__data">{model}</div>
                            <div className="cart__data">{storage.name}</div>
                            <div className="cart__data">{color.name}</div>
                            <div className="cart__price">Quantity: {count}</div>
                            {price && <div className="cart__price">Price: {price * count}</div>}
                        </div>
                        <div className="cart__remove" onClick={() => onRemoveCartProduct(index, price)}>
                            <BiX color="black" size="15px" />
                        </div>
                    </li>
              )
              : <span>Empty Cart</span>
            }
            {total > 0 && <div className="cart__data">Total: {total}</div>}

        </div >)
}

export default Cart
