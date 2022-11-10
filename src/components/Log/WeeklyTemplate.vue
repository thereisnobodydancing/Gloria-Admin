<!-- 周报模板 -->
<template>
  <div class="space-y-8">
    <!-- logSpan1: 本周完成工作 -->
    <div class="space-y-2">
      <h3 class="mb-2 text-lg font-bold">本周完成工作：</h3>
      <div class="text-gray-500">
        <div v-if="props.data.logSpan1" v-html="props.data.logSpan1" />
        <p v-else>-</p>
      </div>
    </div>
    <!-- logSpan2: 本周完成工作 -->
    <div class="space-y-2">
      <h3 class="mb-2 text-lg font-bold">本周工作总结：</h3>
      <div class="text-gray-500">
        <div v-if="props.data.logSpan2" v-html="props.data.logSpan2" />
        <p v-else>-</p>
      </div>
    </div>
    <!-- logSpan3: 本周完成工作 -->
    <div class="space-y-2">
      <h3 class="mb-2 text-lg font-bold">下周工作计划：</h3>
      <div class="text-gray-500">
        <div v-if="props.data.logSpan3" v-html="props.data.logSpan3" />
        <p v-else>-</p>
      </div>
    </div>
    <!-- logSpan4: 本周完成工作 -->
    <div class="space-y-2">
      <h3 class="mb-2 text-lg font-bold">需要协调与帮助：</h3>
      <div class="text-gray-500">
        <div v-if="props.data.logSpan4" v-html="props.data.logSpan4" />
        <p v-else>-</p>
      </div>
    </div>
    <!-- logSpan5: 本周完成工作 -->
    <div class="space-y-2">
      <h3 class="mb-2 text-lg font-bold">备注：</h3>
      <div class="text-gray-500">
        <div v-if="props.data.logSpan5" v-html="props.data.logSpan5" />
        <p v-else>-</p>
      </div>
    </div>
    <!-- picturePathList: 图片 -->
    <div class="space-y-2">
      <h3 class="mb-2 text-lg font-bold">图片：</h3>
      <div 
        v-if="props.data.picturePathList.length > 0" 
        class="grid grid-cols-6 gap-2"
      >
        <div 
          v-for="(item, index) in props.data.picturePathList"
          :key="index"
          class="w-[94px] h-[94px] border rounded cursor-pointer"
        >
          <n-image :src="item.url" :alt="`img${index}`" width="94" height="94" class="rounded" />
        </div>
      </div>
      <p v-else>-</p>
    </div>
    <!-- filePathList: 附件 -->
    <div class="space-y-2">
      <h3 class="mb-2 text-lg font-bold">附件：</h3>
      <div v-if="props.data.filePathList.length > 0">
        <n-upload
          v-model:file-list="props.data.filePathList"
          :show-remove-button="false"
          class="-mt-10"
        />
      </div>
      <p v-else>-</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: Object
})
</script>