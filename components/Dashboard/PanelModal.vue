<script lang="ts" setup>
import { VueSelecto } from "vue3-selecto";
import { TransitionRoot, Dialog, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/vue';


const props = defineProps({
  enabled: {
    type: Boolean,
    required: true,
  },
  selections: {
    type: Array,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  cubes: {
    type: Array,
    required: true,
  },
});

const _enabled = toRef(props, "enabled");
const _id = toRef(props, "id");
const _selections = toRef(props, "selections");
const emit = defineEmits(["close", "confirm", "cancel"]);

const closeModal = () => {
  emit("close", false);
};
const confirmSelection = () => {
  emit("confirm", false);
};

const cancelSelection = () => {
  emit("cancel", false);
};

// const _name = computed(() => {
//   return _id.value.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
//     return str.toUpperCase();
//   });
// });

const displaySelections = computed(() => {
  return _selections.value.join(", ");
});

const onSelect = (e: any) => {
  e.added.forEach((el: HTMLElement) => {
    el.classList.add("selected");
  });
  e.removed.forEach((el: HTMLElement) => {
    el.classList.remove("selected");
  });
};
</script>
<template>
  <!-- <Dialog v-model:visible="_enabled" modal header="Hello" class="modal">
    <div class="temp">
      <div class="container">
        <vue-selecto
          dragContainer=".elements"
          v-bind:selectableTargets="['.selecto-area .cube']"
          v-bind:hitRate="10"
          v-bind:selectByClick="true"
          v-bind:selectFromInside="true"
          v-bind:ratio="0"
          @select="onSelect"
          v-bind:toggleContinueSelect="['shift']"
          v-bind:toggleContinueSelectWithoutDeselect="['ctrl', 'command']"
        />
        <div class="elements selecto-area" id="select1">
          <div class="cube" v-for="cube in cubes">
            <span class="flex items-center text-gray-800">{{ cube }}</span>
          </div>
        </div>
      </div>
    </div>
    <p class="text-md leading-6 font-medium text-gray-900">
      Current selections are {{ displaySelections }}
    </p>
    <template #footer>
      <div class="flex flex-row mt-4">
        <button
          type="button"
          class="inline-flex justify-center rounded-md border border-transparent bg-sky-500 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          @click="confirmSelection"
        >
          Confirm
        </button>
        <button
          type="button"
          class="inline-flex ml-4 justify-center rounded-md border border-transparent bg-rose-500 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          @click="cancelSelection"
        >
          Cancel
        </button>
      </div>
    </template>
  </Dialog> -->
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
                <div class="container">
                  <vue-selecto
                    dragContainer=".elements"
                    v-bind:selectableTargets="['.selecto-area .cube']"
                    v-bind:hitRate="10"
                    v-bind:selectByClick="true"
                    v-bind:selectFromInside="true"
                    v-bind:ratio="0"
                    @select="onSelect"
                    v-bind:toggleContinueSelect="['shift']"
                    v-bind:toggleContinueSelectWithoutDeselect="['ctrl', 'command']"
                  />
                  <div class="elements selecto-area" id="select1">
                    <div class="cube" v-for="cube in cubes">
                      <span class="flex items-center text-gray-800">{{ cube }}</span>
                    </div>
                  </div>
                </div>
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

<style scoped>
.container {
  max-width: 800px;
}

.logo {
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0px auto;
  font-size: 0;
  text-align: left;
}

.logo.logos {
  width: 320px;
  text-align: center;
}

.logos .selecto {
  padding: 16px;
}

.logo img {
  position: relative;
  height: 100%;
  box-sizing: border-box;
}

.cube {
  display: inline-block;
  border-radius: 5px;
  width: 40px;
  height: 40px;
  margin: 4px;
  background: #eee;
  --color: #4af;
}

h1,
.description {
  text-align: center;
}

.button {
  border: 1px solid #333;
  color: #333;
  background: transparent;
  appearance: none;
  -webkit-appearance: none;
  box-sizing: border-box;
  cursor: pointer;
  width: 120px;
  height: 42px;
  font-size: 14px;
  letter-spacing: 1px;
  transition: all ease 0.2s;
  margin: 0px 5px;
}

.button:hover {
  background: #333;
  color: white;
}

.elements {
  margin-top: 40px;
  border: 2px solid #eee;
}

.selecto-area {
  padding: 20px;
}

#selecto1 .cube {
  transition: all ease 0.2s;
}

.moveable #selecto1 .cube {
  transition: none;
}

.selecto-area .selected {
  color: #fff;
  background: var(--color);
}

.scroll {
  overflow: auto;
  padding-top: 10px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.infinite-viewer,
.scroll {
  width: 100%;
  height: 300px;
  box-sizing: border-box;
}

.infinite-viewer .viewport {
  padding-top: 10px;
}

.empty.elements {
  border: none;
}
</style>
