<template>
  <div class="w-full h-full rounded-xl bg-white shadow-xl">
    <div class="h-12 rounded-t-xl bg-gradient-to-r from-primary/10 to-gray-400 px-6 flex items-center space-x-3">
      <div v-for="i in 3" :key="i" class="mt-1 w-3 h-3 bg-gray-400 rounded-full" />
    </div>
    <slot/>
  </div>
</template>