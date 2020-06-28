import instance from './base'

export function getWeather (province, city) {
  return instance.post(`/weather`, {
    'province': province,
    'city': city
  })
}
