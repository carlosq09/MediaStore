import { expect } from '@jest/globals'
import Api from '.'

describe('Api', () => {
    const TEST_PRODUCT_ID = 'ZmGrkLRPXOTpxsU4jjAcv'
    const TEST_ITEM = {
        "id": "ZmGrkLRPXOTpxsU4jjAcv",
        "brand": "Acer",
        "model": "Iconia Talk S",
        "price": "170",
        "imgUrl": "https://front-test-api.herokuapp.com/images/ZmGrkLRPXOTpxsU4jjAcv.jpg",
        "options": {
            "colors": [
                {
                    "code": 1000,
                    "name": "Black"
                }
            ],
            "storages": [
                {
                    "code": 2000,
                    "name": "16 GB"
                },
                {
                    "code": 2001,
                    "name": "32 GB"
                }
            ]
        }
    }

    describe('products', () => {
        describe('product list', () => {
            it('should retrieve full list', async () => {
                try {
                    const res = await Api.getProductList()
                    expect(res).toBeDefined()
                    expect(res).toHaveLength
                } catch (error) {
                    throw Error(error)
                }
            })
        })

        describe('product details', () => {
            it('should retrieve product details', async () => {
                try {
                    const res = await Api.getProductDetails(TEST_PRODUCT_ID)
                    expect(res).toBeDefined()
                    expect(res).toHaveProperty('id')
                    expect(res).toHaveProperty('brand')
                    expect(res).toHaveProperty('price')
                    expect(res).toHaveProperty('cpu')
                    expect(res).toHaveProperty('ram')
                    expect(res).toHaveProperty('displayResolution')
                    expect(res).toHaveProperty('battery')
                    expect(res).toHaveProperty('dimentions')
                    expect(res).toHaveProperty('weight')
                } catch (error) {
                    throw Error(error)
                }
            })
        })

        describe('add to cart', () => {
            it('should add to cart on correct ID', async () => {
                try {
                    const res = await Api.AddToCart(TEST_PRODUCT_ID, TEST_ITEM.options.storages[0], TEST_ITEM.options.colors[0], TEST_ITEM)
                    expect(res).toBeDefined()
                    expect(res).toEqual(1)
                } catch (error) {
                    throw Error(error)
                }
            })
        })
    })
})
