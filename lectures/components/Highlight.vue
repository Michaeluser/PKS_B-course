<script setup lang="ts">
import { palette, type ColorName } from './colors'

const props = withDefaults(defineProps<{
  top: number
  left: number
  w: number
  h?: number
  color?: ColorName
  n?: number
}>(), {
  h: 18,
  color: 'red',
})
</script>

<template>
  <div
    class="absolute"
    :style="{
      boxSizing: 'border-box',
      top: `${props.top / 4}rem`,
      left: `${props.left / 4}rem`,
      width: `${props.w}px`,
      height: `${props.h}px`,
      border: `2px solid ${palette[props.color]}`,
    }"
  >
    <span
      v-if="n"
      class="absolute flex items-center justify-center rounded-full text-white font-bold"
      :style="{
        top: '-14px',
        left: '-7px',
        width: '18px',
        height: '18px',
        fontSize: '11px',
        lineHeight: '1',
        background: palette[props.color],
      }"
    >{{ n }}</span>
  </div>
</template>
