import instance from './base'

export function getAllShopOfType (type) {
  return instance.get(`/shop/type=${type}`)
}

export function sellMyShop (data) {
  return instance.post('/shop/sell', {
    'res': data
  })
}
