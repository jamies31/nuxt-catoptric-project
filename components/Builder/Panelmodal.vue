<script lang="ts" setup>
import { TransitionRoot, Dialog, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/vue';

const props = defineProps({
  enabled: {
    type: Boolean,
    required: true
  },
  selections: {
    type: Array,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})
const _enabled = toRef(props, 'enabled')
const _name = toRef(props, 'name')
const _selections = toRef(props, 'selections')
const emit = defineEmits(['close', 'confirm', 'cancel'])
const closeModal = () => {
  emit('close', false)
}
const confirmSelection = () => {
  emit('confirm', false)
}
const cancelSelection = () => {
  emit('cancel', false)
}

const displaySelections = computed(() => {
  return _selections.value.join(', ')
})

</script>
<template>
  <TransitionRoot :show="_enabled" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild as="template" enter="transition ease-out duration-300" enter-from="opacity-0"
        enter-to="opacity-100" leave="transition ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 overflow-y-auto overlow-x bg-black/30">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 sclae-95"
              enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95">
              <DialogPanel
                class="w-full max-w-lg transform overfow-x rounded-2xl bg-white p-4 text-left align-middle shadow-xl transition-all my-10">
                <button type="button"
                  class="absolute top-0 right-0 mt-4 mr-4 text-red-600 hover:text-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="closeModal"
                >
                X
                </button>
                <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
                  {{ _name }}
                </DialogTitle>
                <slot name="content" />
                <p class="text-md leading-6 font-medium text-gray-900">Current selections are {{ displaySelections }}</p>
                <div class="flex flex-row mt-4">
                  <button type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-sky-500 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    @click="confirmSelection">
                    Confirm
                  </button>
                  <button type="button"
                    class="inline-flex ml-4 justify-center rounded-md border border-transparent bg-rose-500 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    @click="cancelSelection">
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </TransitionChild>
    </Dialog>
  </TransitionRoot>
</template>