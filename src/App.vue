<template>
  <n-config-provider :theme-overrides="themeOverrides" :locale="zhCN" :date-locale="dateZhCN" preflight-style-disabled>
    <n-message-provider container-style="padding:12px">
      <n-dialog-provider>
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" v-if="$route.meta.keepAlive" />
          </keep-alive>
          <component :is="Component" v-if="!$route.meta.keepAlive" />
        </router-view>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { NConfigProvider } from 'naive-ui'
import { zhCN, dateZhCN } from 'naive-ui'
import { debounce } from 'lodash'
const themeOverrides = {
  common: {
    primaryColor: '#FF432A',
    primaryColorHover: '#FF432A',
    primaryColorPressed: '#FF432A'
  },
}
const fangdou = debounce(() => { location.reload() }, 300, {
  leading: true,  // 延长开始后调用
	trailing: false  // 延长结束前调用
})
const clientHeight = ref(document.documentElement.clientHeight)
onMounted(() => {
  window.onresize = () => {
    clientHeight.value = document.documentElement.clientHeight
  }
})
watch(() => clientHeight.value, value => {
  fangdou()
})
onUnmounted(() => {
  fangdou.cancel()
})
</script>

<style>
html { overflow-y: overlay }

::-webkit-scrollbar { @apply w-1.5 h-2 }
::-webkit-scrollbar-thumb { @apply bg-gray-300 w-2 rounded-lg cursor-pointer }

.n-tree-node-content {
  @apply h-8 !important
}
.n-tree .n-tree-node {
  @apply items-center !important
}
.n-tree .n-tree-node.n-tree-node--disabled .n-tree-node-content {
  @apply cursor-default text-gray-900 !important
}
.n-checkbox {
  @apply items-center !important
}
.n-card > .n-card__content, .n-card > .n-card__footer {
  @apply p-0 !important
}
input, button, select, textarea {
  outline: none !important
}
textarea {
  resize: none !important
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none
}
.member-form,.rpo-form input[type="number"] {
  -moz-appearance: textfield
}
</style>