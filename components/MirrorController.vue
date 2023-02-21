<script lang="ts" setup>

const pan = ref(0)
const tilt = ref(0)
const resetPanAndTilt = () => {
  pan.value = 0
  tilt.value = 0
}
</script>
<template>
  <div class="flex flex-col items-center">
    <div class="flex flex-col items-center rounded-xl bg-teal-300">
      <div class="flex flex-row w-100 bg-gray-300 p-2 mx-4 mt-4 rounded">
        <div class="w-40 flex flex-col">
          <span class="flex justify-center mr-3">Pan</span>
          <input v-model="pan" type="number" class="mr-3" />
        </div>
        <div class="w-40 flex flex-col">
          <span class="flex justify-center">Tilt</span>
          <input v-model="tilt" type="number" class="ml-3" />
        </div>
      </div>
      <div class="flex flex-row items-center w-100">
        <ControllerDpad />
        <button @click="resetPanAndTilt" color="danger">
          Reset
        </button>
      </div>
    </div>
  </div>
</template>