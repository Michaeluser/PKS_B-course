<script setup lang="ts">
import { palette, type ColorName } from './colors'

const props = withDefaults(defineProps<{
  items: { value: string; label: string; active?: boolean }[]
  color?: ColorName
}>(), {
  color: 'red',
})

const activeColor = palette[props.color]
</script>

<template>
  <div class="flex flex-col gap-2 mt-2 mb-2">
    <div
      v-for="(item, i) in items"
      :key="i"
      class="flex items-center gap-3"
    >
      <span
        class="font-mono text-sm px-2 py-0.5 rounded border-2 whitespace-nowrap"
        :style="{
          borderColor: item.active ? activeColor : '#9ca3af',
          color: item.active ? activeColor : 'inherit',
          fontWeight: item.active ? 'bold' : 'normal',
        }"
      >{{ item.value }}</span>
      <span class="opacity-40">&rarr;</span>
      <span :style="{ color: item.active ? activeColor : 'inherit', fontWeight: item.active ? 'bold' : 'normal' }">{{ item.label }}</span>
    </div>
  </div>
</template>
