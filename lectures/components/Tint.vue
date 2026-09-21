<script setup lang="ts">
import { palette, type ColorName } from './colors'

const props = defineProps<{
  color: ColorName
  n?: number
}>()
</script>

<template>
  <div class="mb-2 flex items-start gap-2">
    <span
      v-if="n"
      class="flex-none flex items-center justify-center rounded-full text-white font-bold"
      :style="{
        width: '18px',
        height: '18px',
        fontSize: '11px',
        lineHeight: '1',
        marginTop: '2px',
        background: palette[props.color],
      }"
    >{{ n }}</span>
    <span><slot /></span>
  </div>
</template>
