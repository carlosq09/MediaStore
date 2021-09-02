import React from 'react'
// styles
import './index.scss'

const AddCart = ({ options, price, onAddtoCart }) => <div className="addCart">
    <h3>Add to cart</h3>
    <div className="addCart__content">
        {price && <div className="addCart__price">{price}€</div>}
        <form onSubmit={onAddtoCart}>
            <div className="addCart__options">
                <label htmlFor="color">Choose color:</label>
                <select name="color">
                    {options.colors.map(color => <option key={color.code} value={JSON.stringify(color)}>
                        {color.name}
                    </option>)}
                </select>
                <label htmlFor="storage">Choose storage:</label>
                <select name="storage">
                    {options.storages.map(storage => <option key={storage.code} value={JSON.stringify(storage)}>
                        {storage.name}
                    </option>)}
                </select>
            </div>
            <input className="addCart__button" type="submit" value="Add to cart" />
        </form>
    </div >
</div >

export default AddCart
