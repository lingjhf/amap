import '@amap/amap-jsapi-types'


type AMapType = (typeof AMap)
type Map = AMap.Map
type LngLatLike = AMap.LngLatLike
type Polygon = AMap.Polygon
type Polyline = AMap.Polyline
type PolygonOptions = AMap.PolygonOptions
type PolygonCallback = (polygon: AMap.Polygon) => void
type PolylineOptions = AMap.PolylineOptions
type PolylineCallback = (polyline: AMap.Polyline) => void

export type { AMapType, Map, LngLatLike, PolygonOptions, PolygonCallback, PolylineOptions, PolylineCallback, Polygon, Polyline }