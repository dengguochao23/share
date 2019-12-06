import instance from './base'

export function getWeather () {
  return instance.get(`/weather`)
}
