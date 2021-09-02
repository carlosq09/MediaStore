import { request } from '../helpers'
/**
 * Application Logic
 */
const Api = {
  __url__: 'https://front-test-api.herokuapp.com/api',
  cartStorageName: 'mediaStoreCart',

  getProductList () {
    return request(`${this.__url__}/product`, {
      useCache: true,
      expirationTimeCache: 3600000
    })
  },

  getProductDetails (id) {
    if (!id) throw Error('Id is Required')

    return request(`${this.__url__}/product/${id}`, {
      useCache: true,
      expirationTimeCache: 3600000
    })
      .then(data => {
        if (data?.code >= 0) {
          throw new Error(getErrorMessage(data.code))
        } else {
          data.primaryCamera = convertAttributeToString(data.primaryCamera)
          // in server is with secondaryCmera key instead of secondaryCamera
          data.secondaryCamera = convertAttributeToString(data.secondaryCmera)
          return data
        }
      }).catch(error => { throw Error(error.message) })
  },

  AddToCart (id, storage, color, { brand, model, price, imgUrl }) {
    return request(`${this.__url__}/cart`, {
      method: 'POST',
      body: {
        id,
        colorCode: color.code,
        storageCode: storage.code
      }
    }).then(({ count }) => {
      const cartStoredProducts = JSON.parse(localStorage.getItem(this.cartStorageName)) || [] // if empty
      const alreadyInCart = cartStoredProducts.findIndex(product =>
        product.id === id &&
        product.color.code === color.code &&
        product.storage.code === storage.code
      )

      if (alreadyInCart >= 0) {
        cartStoredProducts[alreadyInCart].count += count
      } else {
        cartStoredProducts.push({
          id,
          count,
          price,
          color,
          storage,
          brand,
          model,
          imgUrl
        })
      }

      localStorage.setItem(this.cartStorageName, JSON.stringify(cartStoredProducts))

      return alreadyInCart >= 0 ? cartStoredProducts[alreadyInCart].count : count
    })
  },

  filterDataByBrandOrModel (query, items = []) {
    const filtered = items.filter(item =>
      item.brand?.toUpperCase().includes(query.toUpperCase()) ||
      item.model?.toUpperCase().includes(query.toUpperCase()))

    return filtered.length ? filtered : items
  },

  removeCartProduct (itemIndex) {
    return new Promise((resolve, reject) => {
      const storedProducts = JSON.parse(localStorage.getItem(this.cartStorageName))

      if (storedProducts[itemIndex].count > 1) {
        storedProducts[itemIndex].count--
      } else {
        storedProducts.splice(itemIndex, 1)
      }

      localStorage.setItem(this.cartStorageName, JSON.stringify(storedProducts))

      // instead of new promise, can be done a request to remove cart from server and get fresh data
      const totalPrice = storedProducts.reduce((total, { price, count }) => total + (price * count), 0)
      const totalQuantity = storedProducts.reduce((total, { count }) => total + count, 0)

      resolve({ products: storedProducts, totalPrice, totalQuantity })
    })
  },

  getCartProducts () {
    return new Promise((resolve, reject) => {
      const products = JSON.parse(localStorage.getItem(this.cartStorageName)) || []

      const totalPrice = products.reduce((total, { price, count }) => total + (price * count), 0)
      const totalQuantity = products.reduce((total, { count }) => total + count, 0)
      // instead of new promise, can be done a request to bring cart items from server
      resolve({ products, totalPrice, totalQuantity })
    })
  }
}

const getErrorMessage = statusCode => {
  switch (statusCode) {
    case 0:
      return 'Product with ID is not available'

    default:
      return 'Product with ID is not available'
  }
}

/**
 * To transform values into string from server that comes with an array or just an string
 * @param {*} camera
 * @returns
 */
const convertAttributeToString = attribute =>
  Array.isArray(attribute) ? attribute.join(' - ') : attribute

export default Api
