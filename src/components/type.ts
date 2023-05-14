import '@amap/amap-jsapi-types'


type AMapType = (typeof AMap)
type Map = AMap.Map
type LngLatLike = AMap.LngLatLike
type PolygonOptions = AMap.PolygonOptions
type PolygonCallback =  (polygon: AMap.Polygon) => void


export type { AMapType, Map, LngLatLike, PolygonOptions,PolygonCallback }