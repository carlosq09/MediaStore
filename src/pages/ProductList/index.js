import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
// API
import Api from '../../api'
// components
import Search from '../../components/Search'
import Item from '../../components/Item'
// styles
import './index.scss'

function ProductList ({ history }) {
  const [items, setItems] = useState([])
  const [listItems, setListItems] = useState([])

  const handleDetails = (id) => {
    history.push(`/product/${id}`)
  }

  const handleFilter = (query) => {
    const filtered = Api.filterDataByBrandOrModel(query, items)

    setListItems(filtered)
  }

  useEffect(() => {
    Api.getProductList().then(results => {
      setListItems(results)
      setItems(results)
    })
  }, [history.location])

  return <div>
        <div className="productList__heading">
            <h1>MediaStore</h1>
            <div className="productList__search">
                <Search onSearch={handleFilter} />
            </div>
        </div>
        <div className="productList__list">
            {
                listItems?.length > 0
                  ? listItems.map((item, index) => <Item
                    onDetails={handleDetails}
                    key={`${index}${item.id}`}
                    {...item}
                />)
                  : <div>Loading...</div>
            }
        </div>
    </div >
}

export default withRouter(ProductList)
