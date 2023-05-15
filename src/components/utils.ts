import type { Polygon, PolygonCallback, LngLatLike } from './type'

export function polylineStringToArray(value: string, callback: PolygonCallback) {
  return value.split('|').map((line: string) => {
    return (polygon: Polygon) => {
      const p = line.split(';').map((item: string) => {
        const i = item.split(',')
        return [Number(i[0]), Number(i[1])]
      })
      polygon.setOptions({
        path: p as LngLatLike[],
        // strokeColor: '#dc2626',
        // fillColor: '#3b82f6',
      })
      callback(polygon)
    }
  })
}