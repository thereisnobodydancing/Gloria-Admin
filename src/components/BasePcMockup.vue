<template>
  <div class="w-full h-full rounded-xl bg-white shadow-xl">
    <div class="h-12 rounded-t-xl bg-gradient-to-b from-gray-400/10 to-gray-400/20 shadow px-6 flex items-center space-x-2.5">
      <div class="mt-1 w-3.5 h-3.5 bg-red-900/20 rounded-full" />
      <div class="mt-1 w-3.5 h-3.5 bg-orange-900/20 rounded-full" />
      <div class="mt-1 w-3.5 h-3.5 bg-teal-900/20 rounded-full" />
    </div>
    <slot/>
  </div>
</template>