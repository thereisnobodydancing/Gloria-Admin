<template>
  <!-- 有头像 -->
  <template v-if="props.image && props.image.length > 0">
    <img 
      :src="props.image" 
      :alt="props.name" 
      :width="props.width" 
      :height="props.height"
      :style="{ borderRadius: `${props.radius}px` }"
    />
  </template>
  <!-- 没有头像 -->
  <template v-else>
    <div 
      class="bg-primary flex items-center justify-center"
      :style="{ width: `${props.width}px`, height: `${props.height}px`, borderRadius: `${props.radius}px` }"
    >
      <p
        class="text-center text-white leading-none"
        :style="{fontSize: `${props.fontSize}px`}"
      >
        {{ toNameAvatar(props.name) }}
      </p>
    </div>
  </template>
</template>

<script setup>
import { toNameAvatar } from '/src/until/index.js'
const props = defineProps({
  name: String,
  image: [String, null],
  radius: {
    type: Number,
    default: 6
  },
  width: {
    type: Number,
    default: 40
  },
  height: {
    type: Number,
    default: 40
  },
  fontSize: {
    type: Number,
    default: 14
  },
})
</script>