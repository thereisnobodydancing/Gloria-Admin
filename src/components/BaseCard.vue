<template>
  <div class="w-full h-full bg-white rounded shadow">
    <n-spin :show="props.loading">
      <!-- title -->
      <div class="flex-shrink-0 w-full h-16 border-b px-6 flex items-center">
        <h2 class="flex-shrink-0 text-lg font-bold text-gray-900/70 leading-[4rem]">{{ props.title }}</h2>
        <slot name="title-right"></slot>
      </div>
      <!-- body -->
      <div class="w-full" :style="{ height: `${clientHeight - 150}px` }">
        <slot />
      </div>
    </n-spin>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  loading: {
    type: Boolean,
    default: true
  }
})

const clientHeight = ref(document.documentElement.clientHeight)
</script>