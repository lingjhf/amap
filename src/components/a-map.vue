<template>
  <div id="container"></div>
</template>

<script setup lang="ts">
import AMapLoader from "@amap/amap-jsapi-loader";
import type { AMapType, Map, LngLatLike, PolygonOptions } from "./type";
import { watch } from "vue";

const props = withDefaults(
  defineProps<{
    mapKey: string;
    center?: LngLatLike;
    zoom?: number;
    polygons?: PolygonOptions[];
  }>(),
  { zoom: 8, polygons: () => [] }
);
const emits = defineEmits<{ (e: "init", amap: any): void }>();

let AMap: AMapType;
let amap: Map | undefined;

watch(
  () => props.mapKey,
  async (value) => {
    AMap = await initMap(value);
    amap = new AMap.Map("container");
    if (props.center) {
      setCenter(props.center);
    }
    setZoom(props.zoom);
    setPolygons(props.polygons);
    emits("init", amap);
  },
  { immediate: true }
);

watch(
  () => props.center,
  (value) => {
    if (value) {
      setCenter(value);
    }
  }
);

watch(
  () => props.zoom,
  (value) => {
    setZoom(value);
  }
);

watch(
  () => props.polygons,
  (value) => {
    setPolygons(value);
  }
);

async function initMap(key: string) {
  const AMap = await AMapLoader.load({
    key: key,
    version: "2.0",
    plugins: [],
  });

  return AMap;
}

function setCenter(value: LngLatLike) {
  amap?.setCenter(value);
}

function setZoom(value: number) {
  amap?.setZoom(value);
}

function setPolygons(value: PolygonOptions[]) {
  for (const opt of value) {
    const polygon = new AMap.Polygon(opt);
    amap?.add(polygon);
  }
}
</script>
