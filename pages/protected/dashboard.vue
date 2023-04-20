<script lang="ts" setup>
import { useMirrorManager } from "~/stores/mirrorManager";

interface IMirror {
  number: string;
  isSelected: boolean;
}

const router = useRouter();

definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});

const topLeft = reactive({
  enabled: false,
  selections: [] as number[],
  numMirrorsArray: [...Array(48).keys()].map((i) => i + 1),
});

const leftMost = reactive({
  enabled: false,
  selections: [] as number[],
  numMirrorsArray: [...Array(144).keys()].map((i) => i + 49),
});

const rightMost = reactive({
  enabled: false,
  selections: [] as number[],
  numMirrorsArray: [...Array(102).keys()].map((i) => i + 193),
});

const topRight = reactive({
  enabled: false,
  selections: [] as number[],
  numMirrorsArray: [...Array(64).keys()].map((i) => i + 295),
});

const bottomLeft = reactive({
  enabled: false,
  selections: [] as number[],
  numMirrorsArray: [...Array(160).keys()].map((i) => i + 359),
});

const bottomRight = reactive({
  enabled: false,
  selections: [] as number[],
  numMirrorsArray: [...Array(170).keys()].map((i) => i + 519),
});

const openTopLeftModal = () => {
  topLeft.enabled = true;
};

const openLeftMostModal = () => {
  leftMost.enabled = true;
};

const openRightMostModal = () => {
  rightMost.enabled = true;
};

const openTopRightModal = () => {
  topRight.enabled = true;
};

const openBottomLeftModal = () => {
  bottomLeft.enabled = true;
};

const openBottomRightModal = () => {
  bottomRight.enabled = true;
};

const updateTopLeft = {
  close: (value: boolean) => {
    topLeft.enabled = value;
  },
  confirm: (value: boolean) => {
    topLeft.enabled = value;
  },
  cancel: (value: boolean) => {
    topLeft.enabled = value;
    topLeft.selections = [];
  },
};

const updateLeftMost = {
  close: (value: boolean) => {
    leftMost.enabled = value;
  },
  confirm: (value: boolean) => {
    leftMost.enabled = value;
  },
  cancel: (value: boolean) => {
    leftMost.enabled = value;
    leftMost.selections = [];
  },
};

const updateRightMost = {
  close: (value: boolean) => {
    rightMost.enabled = value;
  },
  confirm: (value: boolean) => {
    rightMost.enabled = value;
  },
  cancel: (value: boolean) => {
    rightMost.enabled = value;
    rightMost.selections = [];
  },
};

const updateTopRight = {
  close: (value: boolean) => {
    topRight.enabled = value;
  },
  confirm: (value: boolean) => {
    topRight.enabled = value;
  },
  cancel: (value: boolean) => {
    topRight.enabled = value;
    topRight.selections = [];
  },
};

const updateBottomLeft = {
  close: (value: boolean) => {
    bottomLeft.enabled = value;
  },
  confirm: (value: boolean) => {
    bottomLeft.enabled = value;
  },
  cancel: (value: boolean) => {
    bottomLeft.enabled = value;
    bottomLeft.selections = [];
  },
};

const updateBottomRight = {
  close: (value: boolean) => {
    bottomRight.enabled = value;
  },
  confirm: (value: boolean) => {
    bottomRight.enabled = value;
  },
  cancel: (value: boolean) => {
    bottomRight.enabled = value;
    bottomRight.selections = [];
  },
};

const removeArrayBrackets = (array: number[]) => {
  return array.toString().replace(/,/g, " ");
};

const totalMirrors = computed(() => {
  return removeArrayBrackets([
    ...topLeft.selections,
    ...leftMost.selections,
    ...rightMost.selections,
    ...topRight.selections,
    ...bottomLeft.selections,
    ...bottomRight.selections,
  ]);
});

const totalMirrorsCount = computed(() => {
  if (totalMirrors.value === "") {
    return 0;
  }
  return totalMirrors.value.split(" ").length;
});

const clearAllSelections = () => {
  topLeft.selections = [];
  leftMost.selections = [];
  rightMost.selections = [];
  topRight.selections = [];
  bottomLeft.selections = [];
  bottomRight.selections = [];
};

const initializeMirrors = () => {
  const mirrorsArray: IMirror[] = [];
  for (let i = 1; i <= 689; i++) {
    const mirror: IMirror = {
      number: i.toString(),
      isSelected: false,
    };
    mirrorsArray.push(mirror);
  }
  return mirrorsArray;
};

const updateMirrors = (selectedMirrors: number[], mirrorArray: IMirror[]) => {
  selectedMirrors.forEach((mirror) => {
    mirrorArray[mirror - 1].isSelected = true;
  });
};

const mirrors = initializeMirrors();

const mirrorManager = useMirrorManager();

const confirmSelections = () => {
  const totalSelected = [
    ...topLeft.selections,
    ...leftMost.selections,
    ...rightMost.selections,
    ...topRight.selections,
    ...bottomLeft.selections,
    ...bottomRight.selections,
  ];
  updateMirrors(totalSelected, mirrors);
  mirrorManager.addMirrors(mirrors);
  router.replace("controller");
};

const tableValuesFormatted = computed(() => {
  return [
    {
      topLeft: removeArrayBrackets(topLeft.selections),
      leftMost: removeArrayBrackets(leftMost.selections),
      rightMost: removeArrayBrackets(rightMost.selections),
      topRight: removeArrayBrackets(topRight.selections),
      bottomLeft: removeArrayBrackets(bottomLeft.selections),
      bottomRight: removeArrayBrackets(bottomRight.selections),
      totalMirrors: totalMirrors.value,
      totalMirrorsCount: totalMirrorsCount.value,
    },
  ];
});
const onSelect = (e: any) => {
  e.added.forEach((el: HTMLElement) => {
    console.log(el);
    el.classList.add("selected");
  });
  e.removed.forEach((el: HTMLElement) => {
    el.classList.remove("selected");
  });
};
</script>
<template>
  <PageWrapper>
    <PageHeader>
      <PageTitle
        text="Group Mirrors Selection"
        class="uppercase flex justify-center"
      />
    </PageHeader>
    <PageBody>
      <PageSection>
        <div class="panel-interface h-screen-40">
          <button
            type="button"
            @click="openTopLeftModal"
            class="rounded-md dark:bg-cyan-500 bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Top Left
          </button>
          <button
            type="button"
            @click="openLeftMostModal"
            class="rounded-md dark:bg-cyan-500 bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Left Most
          </button>
          <button
            type="button"
            @click="openRightMostModal"
            class="rounded-md dark:bg-cyan-500 bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Right Most
          </button>
          <button
            type="button"
            @click="openTopRightModal"
            class="rounded-md dark:bg-cyan-500 bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Top Right
          </button>
          <div class="hidden panel-6"></div>
          <div class="hidden panel-7"></div>
          <button
            type="button"
            @click="openBottomLeftModal"
            class="panel-8 rounded-md dark:bg-cyan-500 bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Bottom Left
          </button>
          <button
            type="button"
            @click="openBottomRightModal"
            class="rounded-md dark:bg-cyan-500 bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Bottom Right
          </button>
        </div>
        <DashboardPanelModal
          :enabled="topLeft.enabled"
          :selections="topLeft.selections"
          id="topLeft"
          :cubes="topLeft.numMirrorsArray"
          v-on="updateTopLeft"
        />
        <DashboardPanelModal
          :enabled="leftMost.enabled"
          :selections="leftMost.selections"
          id="leftMost"
          :cubes="leftMost.numMirrorsArray"
          v-on="updateLeftMost"
        />
        <DashboardPanelModal
          :enabled="rightMost.enabled"
          :selections="rightMost.selections"
          id="rightMost"
          :cubes="rightMost.numMirrorsArray"
          v-on="updateRightMost"
        />
        <DashboardPanelModal
          :enabled="topRight.enabled"
          :selections="topRight.selections"
          id="topRight"
          :cubes="topRight.numMirrorsArray"
          v-on="updateTopRight"
        />
        <DashboardPanelModal
          :enabled="bottomLeft.enabled"
          :selections="bottomLeft.selections"
          id="bottomLeft"
          :cubes="bottomLeft.numMirrorsArray"
          v-on="updateBottomLeft"
        />
        <DashboardPanelModal
          :enabled="bottomRight.enabled"
          :selections="bottomRight.selections"
          id="bottomRight"
          :cubes="bottomRight.numMirrorsArray"
          v-on="updateBottomRight"
        />
      </PageSection>
      <PageSection>
        <div class="rounded-lg">
          <DataTable
            showGridlines
            tableStyle="min-width: 50rem; background-color: #1a202c;"
            :value="tableValuesFormatted"
          >
            <template #header>
              <div
                class="flex flex-wrap align-items-center justify-between gap-2"
              >
                <span class="text-xl text-900 dark:text-white font-bold">
                  Current Mirrors Selection
                </span>
                <Button
                  icon="pi pi-refresh"
                  rounded
                  raised
                  @click="clearAllSelections"
                />
              </div>
            </template>
            <Column field="topLeft" header="Top Left"></Column>
            <Column field="leftMost" header="Left Most"></Column>
            <Column field="rightMost" header="Right Most"></Column>
            <Column field="topRight" header="Top Right"></Column>
            <Column field="bottomLeft" header="Bottom Left"></Column>
            <Column field="bottomRight" header="Bottom Right"></Column>
            <Column field="totalMirrors" header="Total Mirrors"></Column>
            <Column
              field="totalMirrorsCount"
              header="Total Mirrors Selected"
            ></Column>
          </DataTable>
        </div>
      </PageSection>
      <PageSection>
        <div class="flex justify-end gap-4 mt-6">
          <button
            type="button"
            @click="confirmSelections"
            class="rounded-md dark:bg-blue-500 bg-amber-500 px-4 py-2 text-sm font-bold text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
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

.container {
  max-width: 800px;
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
