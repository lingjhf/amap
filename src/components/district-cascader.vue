<template>
  <ElCascader
    :props="cascaderProps"
    @change="subdistrictChange"
    placeholder="请选择区域"
  />
</template>

<script setup lang="ts">
import { CascaderValue, ElCascader } from "element-plus";
import type { CascaderOption, CascaderProps } from "element-plus";
import { getDistrict } from "./api";

const emits = defineEmits<{ (e: "change", value: any): void }>();
const districtMap: Record<string, any> = {};
const cascaderProps: CascaderProps = {
  lazy: true,
  async lazyLoad(node, resolve) {
    let keywords = node.value;
    if (node.level === 0) {
      keywords = "中国";
    }
    const opts = await getSubDistrict(keywords as string);
    if (node.level === 2) {
      const key = node.pathValues.join("");
      for (const opt of opts) {
        opt.leaf = true;
        districtMap[key + opt.value] = opt;
      }
    }
    resolve(opts);
  },
};

async function getSubDistrict(keywords: string) {
  const districts = await getDistrict({ keywords: keywords });
  const opts: CascaderOption[] = [];
  for (const district of districts[0].districts) {
    opts.push({
      label: district.name,
      value: district.name,
      center: district.center,
      adcode: district.adcode,
    });
  }
  return opts;
}

function subdistrictChange(value: CascaderValue) {
  emits("change", districtMap[(value as string[]).join("")]);
}
</script>
