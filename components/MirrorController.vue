<script lang="ts" setup>
import _ from "lodash";

interface MirrorState {
  pan: number;
  tilt: number;
}

const props = defineProps({
  selectedMirrors: {
    type: Array,
    required: true,
  },
});

const _selectedMirrors = toRef(props, "selectedMirrors");
const controllerValue = ref<MirrorState[]>([
  {
    pan: 0,
    tilt: 0,
  },
]);
const columns = ref([
  { field: "pan", header: "Pan" },
  { field: "tilt", header: "Tilt" },
]);
const latestState = ref({
  topLeft: {
    pan: 0,
    tilt: 0,
  },
  topRight: {
    pan: 0,
    tilt: 0,
  },
  bottomLeft: {
    pan: 0,
    tilt: 0,
  },
  bottomRight: {
    pan: 0,
    tilt: 0,
  },
});
const emit = defineEmits(["update-mirror-state"]);

const client = useSupabaseClient();

const onUpdateTableValue = (event: any) => {
  const { newData } = event;
  const arrayFormatedNewValue = [
    {
      pan: newData.pan,
      tilt: newData.tilt,
    },
  ];
  controllerValue.value = arrayFormatedNewValue;
};

const resetSelectedMirrors = () => {
  _selectedMirrors.value = [];
};

const convertKeyToSnakeCase = () => {
  for (const key of Object.entries(latestState.value)) {
    const newKey = key[0].replace(/([A-Z])/g, "_$1").toLowerCase();
      // @ts-expect-error
    latestState.value[newKey] = key[1];
      // @ts-expect-error
    delete latestState.value[key[0]];
  }
}

const saveChangesSelectedMirrors = async () => {
  if (_selectedMirrors.value.length === 0) {
    // will show a toast message that no mirrors are selected
    return;
  }
  const selectedMirrors = _selectedMirrors.value as string[];
  const currentSystemData = controllerValue.value[0];
  // @ts-expect-error
  if (currentSystemData.pan === '' || currentSystemData.tilt === '') {
    // will show a toast message that the values are not valid
    return;
  }
  for (let i = 0; i < selectedMirrors.length; i++) {
    const mirror = selectedMirrors[i];
    // @ts-expect-error
    latestState.value[mirror] = currentSystemData;
  }  
  convertKeyToSnakeCase();
  const { data, error } = await useAsyncData('insertPrototype', async () => {
    const { data, error } = await client
      .from("Prototype")
        // @ts-expect-error
      .insert(latestState.value)
      .select();
    if (error) {
      throw error;
    }
    return data;
  });
  if (error.value) {
    // will show a toast message that there was an error
    return;
  }
  // will show a toast message that the changes were saved
  emit("update-mirror-state", latestState.value);
};
</script>
<template>
  <div class="flex flex-col w-full xs:w-9/12">
    <DataTable
      stripedRows
      :value="controllerValue"
      editMode="cell"
      @cell-edit-complete="onUpdateTableValue"
      tableClass="editable-cells-table"
      class="w-full"
    >
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="text-xl text-gray-900 dark:text-white font-bold"
            >Mirror Controller</span
          >
          <div class="flex-1"></div>
          <Button
            icon="pi pi-refresh"
            rounded
            raised
            @click="resetSelectedMirrors"
          />
          <Button
            icon="pi pi-save"
            rounded
            raised
            @click="saveChangesSelectedMirrors"
          />
        </div>
      </template>
      <Column
        v-for="col in columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
        style="width: 50%"
      >
        <template #editor="{ data, field }">
          <InputText
            v-model="data[field]"
            autofocus="true"
            class="w-full"
            :key="field"
          />
        </template>
      </Column>
    </DataTable>
    <div class="flex-1"></div>
    <div class="flex flex-row items-center justify-center">
      <ControllerDpad class="p-4" />
    </div>
  </div>
</template>
