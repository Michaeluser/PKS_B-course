<!--
  PipeState
  One snapshot of a sliding-window transfer: sender, data pipe (->),
  ACK pipe (<-) and receiver.

  Usage:
  <PipeState :t="6" :data="[6, 5, 4]" :acks="[1, 2, 3]" :waiting="7" :received="3" :in-flight="6" />
  <PipeState :t="7" :data="[7, 6, 5]" :acks="[2, 3, 4]" :ack-at-sender="1" :fresh="7" :received="4" :in-flight="6" />

  data/acks are listed left to right as drawn (data travels right, ACKs travel left).
-->
<script setup lang="ts">
const props = defineProps<{
  t: number
  data: number[]
  acks: number[]
  received?: number
  waiting?: number
  ackAtSender?: number
  fresh?: number
  inFlight?: number
}>()

const box = 'w-8 h-8 flex items-center justify-center rounded-sm text-sm font-semibold'
</script>

<template>
  <div class="flex flex-col items-center gap-1 text-sm">
    <div class="w-full flex justify-between px-1 text-xs opacity-80">
      <span class="font-semibold">t = {{ props.t }}</span>
      <span v-if="props.inFlight !== undefined">In flight: {{ props.inFlight }}</span>
    </div>

    <div class="flex items-center gap-3">
      <!-- Sender -->
      <div class="flex flex-col items-center gap-1 w-16">
        <div class="h-8 flex items-center">
          <div
            v-if="props.waiting !== undefined"
            :class="box"
            style="border: 2px dashed #6b7280; color: #374151"
          >{{ props.waiting }}</div>
        </div>
        <div class="h-8 flex items-center">
          <div
            v-if="props.ackAtSender !== undefined"
            :class="box"
            class="text-xs"
            style="background: #d5e8d4; border: 2px solid #e11d48"
          >ack{{ props.ackAtSender }}</div>
        </div>
        <span class="text-xs">Sender</span>
      </div>

      <!-- Pipes -->
      <div class="flex flex-col gap-1">
        <div class="flex items-center gap-1">
        <div class="flex gap-1 px-3 py-0.5 rounded-full" style="border: 2px solid #6b7280">
          <div
            v-for="p in props.data"
            :key="'d' + p"
            :class="box"
            :style="{
              background: '#3399ff',
              color: 'white',
              outline: p === props.fresh ? '3px solid #e11d48' : 'none',
            }"
          >{{ p }}</div>
        </div>
        <span class="text-xs opacity-60">→</span>
        </div>
        <div class="flex items-center gap-1">
        <div class="flex gap-1 px-3 py-0.5 rounded-full" style="border: 2px solid #6b7280">
          <div
            v-for="a in props.acks"
            :key="'a' + a"
            :class="box"
            class="text-xs"
            style="background: #d5e8d4; border: 1px solid #82b366"
          >ack{{ a }}</div>
        </div>
        <span class="text-xs opacity-60">←</span>
        </div>
      </div>

      <!-- Receiver -->
      <div class="flex flex-col items-center gap-1 w-16">
        <div class="relative h-11 w-11">
          <div class="absolute" style="top: 6px; left: 6px; width: 32px; height: 32px; background: #bfdbfe; border: 1px solid #93c5fd" />
          <div class="absolute" style="top: 3px; left: 3px; width: 32px; height: 32px; background: #bfdbfe; border: 1px solid #93c5fd" />
          <div
            v-if="props.received !== undefined"
            class="absolute flex items-center justify-center text-sm font-semibold"
            style="top: 0; left: 0; width: 32px; height: 32px; background: #dbeafe; border: 1px solid #3399ff"
          >{{ props.received }}</div>
        </div>
        <span class="text-xs">Receiver</span>
      </div>
    </div>
  </div>
</template>
