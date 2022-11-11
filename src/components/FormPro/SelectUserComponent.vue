<!-- 选择成员【组件】 -->
<template>
  <div class="w-full flex flex-wrap">
    <div
      v-for="(item, index) in addUser.options"
      :key="index"
      class="mr-6 mb-8 w-10 h-10 rounded-md cursor-pointer hover:opacity-90 relative"
      :class="{'bg-primary': !item.picture}"
      @click="showCard(item.id)"
    >
      <base-avatar :image="item.picture" :name="item.name" />
      <!-- 删除符号 -->
      <div
        class="absolute -top-3 -right-4" 
        @click.prevent.stop="removeUser(item.key, item.id, index)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 text-gray-300 hover:text-red-500">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
        </svg>
      </div>
      <p class="mt-1 text-xs text-gray-500 line-1">{{ item.name }}</p>
    </div>
    <button
      v-if="!props.options.useMax || props.options.useMax && props.options.max > addUser.options.length"
      aria-label="选择成员"
      class="w-10 h-10 rounded-md border border-dashed border-gray-300 text-gray-600 hover:border-primary hover:text-primary"
      @click="showSelUserModal"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mx-auto">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
      </svg>
    </button>
    <p v-if="props.options.desc" class="text-xs text-gray-400">{{ props.options.desc }}</p>
  </div>
  <!-- 选择人员Modal -->
  <add-user-modal 
    ref="addUserRef" 
    :max="props.options.useMax ? props.options.max : null"
    @confirm="changeUser" 
  />
  <!-- 名片Modal -->
  <business-card-modal ref="cardRef" />
</template>
  
<script setup>

const props = defineProps({
  options: Object
})

/******* 选择部门负责人 *******/
const addUserRef = ref()
const addUser = reactive({
  keys: [],     // 选中项的key数组
  ids: [],      // 选中项的id数组
  options: []   // 选中项的内容数组
})
// 弹出人员弹窗
const showSelUserModal = function() {
  addUserRef.value.showModal(addUser.options, addUser.keys, addUser.ids)
}
// 人员变化
const changeUser = function({options, keys, ids}) {
  addUser.options = options
  addUser.keys = keys
  addUser.ids = ids
}
// 删除人员
const removeUser = function(key, id, index) {
  addUser.keys.splice(addUser.keys.indexOf(key), 1)
  addUser.ids.splice(addUser.ids.indexOf(id), 1)
  addUser.options.splice(index, 1)
}

/******** 名片 ********/
const cardRef = ref()
const showCard = function(id) {
  cardRef.value.showCard(id)
}
</script>