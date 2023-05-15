<template>
  <div class="h-screen w-screen flex">
    <div class="w-[100%] h-full">
      <a-map
        class="w-full h-full"
        :map-key="key"
        :center="center"
        :zoom="zoom"
        :polygons="polygons"
        @init="initMap"
      />
    </div>
    <div v-if="isInitMap" class="absolute left-2 top-2 right-2">
      <el-button class="mb-2" @click="openRegionCascader">{{
        currentRegion
      }}</el-button>
      <district-cascader
        v-show="visibleRegionCascader"
        @change="districtCascaderChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { PolygonCallback, Polygon, LngLatLike } from "./components/type";
import AMap from "./components/a-map.vue";
import DistrictCascader from "./components/district-cascader.vue";
import { getDistrict } from "./components/api";
import { CascaderValue, ElButton } from "element-plus";

const visibleRegionCascader = ref(false);
const currentRegion = ref("请选择区域");
const key = ref("84586d5935ca9f959b10ae84e7ace968");
const isInitMap = ref(false);
const center = ref<[number, number]>([116.407387, 39.904179]);
const zoom = ref(10);
const polygons = ref<PolygonCallback[]>([]);

function openRegionCascader() {
  visibleRegionCascader.value = !visibleRegionCascader.value;
}

async function initMap() {
  isInitMap.value = true;
}

async function districtCascaderChange({
  value,
  region,
}: {
  value: CascaderValue;
  region: any;
}) {
  currentRegion.value = (value as string[]).join(" / ");
  visibleRegionCascader.value = false;
  const c = region.center.split(",");
  center.value = [Number(c[0]), Number(c[1])];
  const districts = await getDistrict({
    keywords: region.adcode,
    subdistrict: 0,
    extensions: "all",
  });
  const district = districts[0];
  const lines = district.polyline.split("|").map((line: string) => {
    return (polygon: Polygon) => {
      const p = line.split(";").map((item: string) => {
        const i = item.split(",");
        return [Number(i[0]), Number(i[1])];
      });
      polygon.setOptions({
        path: p as LngLatLike[],
        strokeColor: "#dc2626",
        fillColor: "#3b82f6",
      });
    };
  });
  polygons.value = lines;
}
</script>

<style>
body {
  margin: 0;
}
</style>
