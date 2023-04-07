<script lang="ts" setup>
import { useMirrorManager } from '~/stores/mirrorManager'

interface IMirror {
  number: string;
  isSelected: boolean;
}

const router = useRouter()

definePageMeta({
  layout: 'dashboard',
})

onBeforeMount(async () => {
  await useAuth()
})

const topLeft = reactive({
  enabled: false,
  selections: [] as number[],
  numMirrorsArray: [...Array(48).keys()].map((i) => i + 1)
})

const leftMost = reactive({
  enabled: false,
  selections: [] as number[],
  numMirrorsArray: [...Array(144).keys()].map((i) => i + 49)
})

const rightMost = reactive({
  enabled: false,
  selections: [] as number[],
  numMirrorsArray: [...Array(102).keys()].map((i) => i + 193)
})

const topRight = reactive({
  enabled: false,
  selections: [] as number[],
  numMirrorsArray: [...Array(64).keys()].map((i) => i + 295)
})

const bottomLeft = reactive({
  enabled: false,
  selections: [] as number[],
  numMirrorsArray: [...Array(160).keys()].map((i) => i + 359)
})

const bottomRight = reactive({
  enabled: false,
  selections: [] as number[],
  numMirrorsArray: [...Array(170).keys()].map((i) => i + 519)
})

const openTopLeftModal = () => {
  topLeft.enabled = true
}

const openLeftMostModal = () => {
  leftMost.enabled = true
}

const openRightMostModal = () => {
  rightMost.enabled = true
}

const openTopRightModal = () => {
  topRight.enabled = true
}

const openBottomLeftModal = () => {
  bottomLeft.enabled = true
}

const openBottomRightModal = () => {
  bottomRight.enabled = true
}

const updateTopLeft = {
  'close': (value: boolean) => {
    topLeft.enabled = value
  },
  'confirm': (value: boolean) => {
    topLeft.enabled = value
  },
  'cancel': (value: boolean) => {
    topLeft.enabled = value
    topLeft.selections = []
  }
}

const updateLeftMost = {
  'close': (value: boolean) => {
    leftMost.enabled = value
  },
  'confirm': (value: boolean) => {
    leftMost.enabled = value
  },
  'cancel': (value: boolean) => {
    leftMost.enabled = value
    leftMost.selections = []
  }
}

const updateRightMost = {
  'close': (value: boolean) => {
    rightMost.enabled = value
  },
  'confirm': (value: boolean) => {
    rightMost.enabled = value
  },
  'cancel': (value: boolean) => {
    rightMost.enabled = value
    rightMost.selections = []
  }
}

const updateTopRight = {
  'close': (value: boolean) => {
    topRight.enabled = value
  },
  'confirm': (value: boolean) => {
    topRight.enabled = value
  },
  'cancel': (value: boolean) => {
    topRight.enabled = value
    topRight.selections = []
  }
}

const updateBottomLeft = {
  'close': (value: boolean) => {
    bottomLeft.enabled = value
  },
  'confirm': (value: boolean) => {
    bottomLeft.enabled = value
  },
  'cancel': (value: boolean) => {
    bottomLeft.enabled = value
    bottomLeft.selections = []
  }
}

const updateBottomRight = {
  'close': (value: boolean) => {
    bottomRight.enabled = value
  },
  'confirm': (value: boolean) => {
    bottomRight.enabled = value
  },
  'cancel': (value: boolean) => {
    bottomRight.enabled = value
    bottomRight.selections = []
  }
}

const removeArrayBrackets = (array: number[]) => {
  return array.toString().replace(/,/g, ' ')
}

const totalMirrors = computed(() => {
  return removeArrayBrackets([
    ...topLeft.selections,
    ...leftMost.selections,
    ...rightMost.selections,
    ...topRight.selections,
    ...bottomLeft.selections,
    ...bottomRight.selections
  ])
})

const totalMirrorsCount = computed(() => {
  if (totalMirrors.value === '') {
    return 0
  }
  return totalMirrors.value.split(' ').length
})

const clearAllSelections = () => {
  topLeft.selections = []
  leftMost.selections = []
  rightMost.selections = []
  topRight.selections = []
  bottomLeft.selections = []
  bottomRight.selections = []
}

const initializeMirrors = () => {
  const mirrorsArray: IMirror[] = []
  for (let i = 1; i <= 689; i++) {
    const mirror: IMirror = {
      number: i.toString(),
      isSelected: false
    }
    mirrorsArray.push(mirror)
  }
  return mirrorsArray
}

const updateMirrors = (selectedMirrors: number[], mirrorArray: IMirror[]) => {
  selectedMirrors.forEach((mirror) => {
    mirrorArray[mirror - 1].isSelected = true
  })
}

const mirrors = initializeMirrors()

const mirrorManager = useMirrorManager()

const confirmSelections = () => {
  const totalSelected = [
    ...topLeft.selections,
    ...leftMost.selections,
    ...rightMost.selections,
    ...topRight.selections,
    ...bottomLeft.selections,
    ...bottomRight.selections
  ]
  updateMirrors(totalSelected, mirrors)
  mirrorManager.addMirrors(mirrors)
  router.replace('controller')
}

</script>
<template>
  <PageWrapper>
    <PageHeader>
      <PageTitle text="Group Mirrors Selection" class="capitalize"></PageTitle>
    </PageHeader>
    <PageBody class="flex h-10/11">
      <PageSection class="flex-col flex-1 flex justify-between">
        <div class="panel-interface h-screen-40">
          <button type="button" @click="openTopLeftModal"
            class="rounded-md dark:bg-cyan-500 bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            Top Left
          </button>
          <button type="button" @click="openLeftMostModal"
            class="rounded-md dark:bg-cyan-500 bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            Left Most
          </button>
          <button type="button" @click="openRightMostModal"
            class="rounded-md dark:bg-cyan-500 bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            Right Most
          </button>
          <button type="button" @click="openTopRightModal"
            class="rounded-md dark:bg-cyan-500 bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            Top Right
          </button>
          <div class="hidden panel-6"></div>
          <div class="hidden panel-7"></div>
          <button type="button" @click="openBottomLeftModal"
            class="panel-8 rounded-md dark:bg-cyan-500 bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            Bottom Left
          </button>
          <button type="button" @click="openBottomRightModal"
            class="rounded-md dark:bg-cyan-500 bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            Bottom Right
          </button>
        </div>
        <!-- Top Left Panel -->
        <BuilderPanelmodal :enabled="topLeft.enabled" name="Top Left" v-on="updateTopLeft"
          :selections="topLeft.selections">
          <template #content>
            <DragSelect v-model="topLeft.selections" id="topleft">
              <DragSelectOption v-for="item in topLeft.numMirrorsArray" :key="item" :value="item">
                {{ item }}
              </DragSelectOption>
            </DragSelect>
          </template>
        </BuilderPanelmodal>
        <!-- Left Most Panel -->
        <BuilderPanelmodal :enabled="leftMost.enabled" name="Left Most" v-on="updateLeftMost"
          :selections="leftMost.selections">
          <template #content>
            <DragSelect v-model="leftMost.selections" id="leftmost">
              <DragSelectOption v-for="item in leftMost.numMirrorsArray" :key="item" :value="item">
                {{ item }}
              </DragSelectOption>
            </DragSelect>
          </template>
        </BuilderPanelmodal>
        <!-- Right Most Panel -->
        <BuilderPanelmodal :enabled="rightMost.enabled" name="Right Most" v-on="updateRightMost"
          :selections="rightMost.selections">
          <template #content>
            <DragSelect v-model="rightMost.selections" id="rightmost">
              <DragSelectOption v-for="item in rightMost.numMirrorsArray" :key="item" :value="item">
                {{ item }}
              </DragSelectOption>
            </DragSelect>
          </template>
        </BuilderPanelmodal>
        <!-- Top Right Panel -->
        <BuilderPanelmodal :enabled="topRight.enabled" name="Top Right" v-on="updateTopRight"
          :selections="topRight.selections">
          <template #content>
            <DragSelect v-model="topRight.selections" id="topright">
              <DragSelectOption v-for="item in topRight.numMirrorsArray" :key="item" :value="item">
                {{ item }}
              </DragSelectOption>
            </DragSelect>
          </template>
        </BuilderPanelmodal>
        <!-- Bottom Left Panel -->
        <BuilderPanelmodal :enabled="bottomLeft.enabled" name="Bottom Left" v-on="updateBottomLeft"
          :selections="bottomLeft.selections">
          <template #content>
            <DragSelect v-model="bottomLeft.selections" id="bottomleft">
              <DragSelectOption v-for="item in bottomLeft.numMirrorsArray" :key="item" :value="item">
                {{ item }}
              </DragSelectOption>
            </DragSelect>
          </template>
        </BuilderPanelmodal>
        <!-- Bottom Right Panel -->
        <BuilderPanelmodal :enabled="bottomRight.enabled" name="Bottom Right" v-on="updateBottomRight"
          :selections="bottomRight.selections">
          <template #content>
            <DragSelect v-model="bottomRight.selections" id="bottomright">
              <DragSelectOption v-for="item in bottomRight.numMirrorsArray" :key="item" :value="item">
                {{ item }}
              </DragSelectOption>
            </DragSelect>
          </template>
        </BuilderPanelmodal>
        <!-- display for all current selections -->
        <!-- create a  -->
        <span class="text-xl">Current Mirrors Selection</span>
        <div class="flex flex-col">
          <span class="text-lg">Top Left: {{ removeArrayBrackets(topLeft.selections) }}</span>
          <span class="text-lg">Left Most: {{ removeArrayBrackets(leftMost.selections) }}</span>
          <span class="text-lg">Right Most: {{ removeArrayBrackets(rightMost.selections) }}</span>
          <span class="text-lg">Top Right: {{ removeArrayBrackets(topRight.selections) }}</span>
          <span class="text-lg">Bottom Left: {{ removeArrayBrackets(bottomLeft.selections) }}</span>
          <span class="text-lg">Bottom Right: {{ removeArrayBrackets(bottomRight.selections) }}</span>
        </div>
        <div class="flex flex-col">
          <span class="text-lg">Total Mirrors: {{ totalMirrors }}</span>
          <span class="text-lg">Total Mirrors Selected: {{ totalMirrorsCount }}</span>
        </div>
        <div class="flex justify-end gap-4">
          <button type="button" @click="clearAllSelections"
            class="rounded-md dark:bg-slate-500 bg-amber-500 px-4 py-2 text-sm font-bold text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            Clear All Selections
          </button>
          <button type="button" @click="confirmSelections"
            class="rounded-md dark:bg-blue-500 bg-amber-500 px-4 py-2 text-sm font-bold text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            Confirm Selections
          </button>
        </div>
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>

<style scoped lang="scss">
.panel-interface {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 1rem;

  :last-child {
    grid-column: 4 / 5;
    grid-row: 2 / 3;
  }
}

#topleft {
  :deep(.drag-select) {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(6, 1fr);
  }
}

#leftmost {
  :deep(.drag-select) {
    display: grid;
    grid-template-columns: repeat(16, 1fr);
    grid-template-rows: repeat(6, 1fr);
    width: 100%;
  }
}

#rightmost {
  :deep(.drag-select) {
    display: grid;
    grid-template-columns: repeat(17, 1fr);
    grid-template-rows: repeat(6, 1fr);
  }
}

#topright {
  :deep(.drag-select) {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(8, 1fr);
  }
}

#bottomleft {
  :deep(.drag-select) {
    display: grid;
    grid-template-columns: repeat(16, 1fr);
    grid-template-rows: repeat(10, 1fr);
  }
}

#bottomright {
  :deep(.drag-select) {
    display: grid;
    grid-template-columns: repeat(17, 1fr);
    grid-template-rows: repeat(10, 1fr);
  }
}

.drag-select__wrapper {
  position: relative;
  border: 1px solid #086f5a;
  overflow-x: auto;
}

.drag-select__area {
  background: rgba(66, 153, 225, 0.5);
}

.drag-select__area::after {
  display: block;
  position: absolute;
  content: " ";
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border: 1px solid rgb(66, 153, 225);
}

.drag-select-option {
  height: 2.5rem;
  margin: 0.5rem;
  color: #ffffff;
  background: #E37E26;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.drag-select-option--selected {
  color: #000000;
  background: #10ccc3;
}
</style>