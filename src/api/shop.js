import instance from './base'

export function getAllShopOfType (type) {
  return instance.get(`/shop/type=${type}`)
}

export function sellMyShop (data) {
  return instance.post('/shop/sell', {
    'res': data
  })
}

export function getMyShopCart (pending) {
  return instance.get(`/shop/my/pending=${pending}`)
}
