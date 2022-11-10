<template>
  <div class="w-full h-full flex items-center justify-center relative">
    <p class="absolute top-4 left-4 text-2xl">{{ user.userName }} 欢迎你</p>
    <Vue3Lottie :animationData="HomeJson" :height="450" :width="450" />
  </div>
</template>

<script setup>
import { Vue3Lottie } from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'
import HomeJson from '/src/assets/home.json'

const user = JSON.parse(sessionStorage.getItem('user'))
</script>