<script lang="ts" setup>
import _ from "lodash";

interface MirrorState {
  pan: string;
  tilt: string;
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
    pan: '0',
    tilt: '0',
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
const visible = ref(false);
const isError = ref(false);
const errorMessage = ref("");
const isSuccess = ref(false);
const emit = defineEmits(["update-mirror-state"]);

const client = useSupabaseClient();
const auth = useSupabaseUser();

const convertKeyToSnakeCase = () => {
  for (const key of Object.entries(latestState.value)) {
    const newKey = key[0].replace(/([A-Z])/g, "_$1").toLowerCase();
    // @ts-expect-error
    latestState.value[newKey] = key[1];
    // @ts-expect-error
    delete latestState.value[key[0]];
  }
};

const getData = async () => {
  const { data, error } = await client
    .from("Prototype")
    .select("*")
    .order("id", { ascending: false })
    .limit(1);
  if (error) {
    console.error(error);
    return;
  }
  if (data.length === 0) return;
  const latestData = data[0];
  const latestMirrorState = _.pick(latestData, [
    "top_left",
    "top_right",
    "bottom_left",
    "bottom_right",
  ]);
  for (const key of Object.entries(latestMirrorState)) {
    const newKey = key[0].replace(/([_][a-z])/g, (g) => g[1].toUpperCase());
    // @ts-expect-error
    latestState.value[newKey] = key[1];
  }
};

await useAsyncData(getData);

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

const resetSelectedMirrors = async () => {
  const updateToLatestState = {
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
  };
  latestState.value = updateToLatestState;
  convertKeyToSnakeCase();
  const insertPayload = formatInsertPayload();
  const { data, error } = await useAsyncData("insertPrototype", async () => {
    const { data, error } = await client
      .from("Prototype")
      // @ts-expect-error
      .insert(insertPayload)
      .select();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  });
  if (error.value) {
    isError.value = true;
    visible.value = true;
    errorMessage.value = error.value.message;
    return;
  }
  await getData();
  isSuccess.value = true;
  visible.value = true;
  emit("update-mirror-state", latestState.value);
};

const formatInsertPayload = () => {
  const user_id = auth.value?.id;
  return {
    user_id,
    ...latestState.value,
  };
};

const saveChangesSelectedMirrors = async () => {
  if (_selectedMirrors.value.length === 0) {
    isError.value = true;
    visible.value = true;
    errorMessage.value = "Please select at least a mirror.";
    return;
  }
  const selectedMirrors = _selectedMirrors.value as string[];
  const currentSystemData = controllerValue.value[0];
  if (currentSystemData.pan === "" || currentSystemData.tilt === "") {
    isError.value = true;
    visible.value = true;
    errorMessage.value = "Please enter a value for both pan and tilt.";
    return;
  }
  for (let i = 0; i < selectedMirrors.length; i++) {
    const mirror = selectedMirrors[i];
    // @ts-expect-error
    latestState.value[mirror] = currentSystemData;
  }
  convertKeyToSnakeCase();
  const insertPayload = formatInsertPayload();
  const { data, error } = await useAsyncData("insertPrototype", async () => {
    const { data, error } = await client
      .from("Prototype")
      // @ts-expect-error
      .insert(insertPayload);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  });
  if (error.value) {
    isError.value = true;
    visible.value = true;
    errorMessage.value = error.value.message;
    return;
  }
  await getData();
  isSuccess.value = true;
  visible.value = true;
  emit("update-mirror-state", latestState.value);
};

const dpadUpdate = {
  up: async (value: Boolean) => {
    if (value) {
      if (_selectedMirrors.value.length === 0) {
        isError.value = true;
        visible.value = true;
        errorMessage.value = "Please select at least a mirror.";
        return;
      }
      const selectedMirrors = _selectedMirrors.value as string[];
      for (let i = 0; i < selectedMirrors.length; i++) {
        const mirror = selectedMirrors[i];
        // @ts-expect-error
        const intValue = parseInt(latestState.value[mirror].tilt);
        // @ts-expect-error
        latestState.value[mirror].tilt = intValue + 1;
      }
      convertKeyToSnakeCase();
      const insertPayload = formatInsertPayload();
      const { data, error } = await useAsyncData(
        "insertPrototype",
        async () => {
          const { data, error } = await client
            .from("Prototype")
            // @ts-expect-error
            .insert(insertPayload);
          if (error) {
            throw new Error(error.message);
          }
          return data;
        }
      );
      if (error.value) {
        isError.value = true;
        visible.value = true;
        errorMessage.value = error.value.message;
        return;
      }
      await getData();
      isSuccess.value = true;
      visible.value = true;
      emit("update-mirror-state", latestState.value);
    }
  },
  down: async (value: Boolean) => {
    if (value) {
      if (_selectedMirrors.value.length === 0) {
        isError.value = true;
        visible.value = true;
        errorMessage.value = "Please select at least a mirror.";
        return;
      }
      const selectedMirrors = _selectedMirrors.value as string[];
      for (let i = 0; i < selectedMirrors.length; i++) {
        const mirror = selectedMirrors[i];
        // @ts-expect-error
        const intValue = parseInt(latestState.value[mirror].tilt);
        // @ts-expect-error
        latestState.value[mirror].tilt = intValue - 1;
      }
      convertKeyToSnakeCase();
      const insertPayload = formatInsertPayload();
      const { data, error } = await useAsyncData(
        "insertPrototype",
        async () => {
          const { data, error } = await client
            .from("Prototype")
            // @ts-expect-error
            .insert(insertPayload);
          if (error) {
            throw new Error(error.message);
          }
          return data;
        }
      );
      if (error.value) {
        isError.value = true;
        visible.value = true;
        errorMessage.value = error.value.message;
        return;
      }
      await getData();
      isSuccess.value = true;
      visible.value = true;
      emit("update-mirror-state", latestState.value);
    }
  },
  left: async (value: Boolean) => {
    if (value) {
      if (_selectedMirrors.value.length === 0) {
        isError.value = true;
        visible.value = true;
        errorMessage.value = "Please select at least a mirror.";
        return;
      }
      const selectedMirrors = _selectedMirrors.value as string[];
      for (let i = 0; i < selectedMirrors.length; i++) {
        const mirror = selectedMirrors[i];
        // @ts-expect-error
        const intValue = parseInt(latestState.value[mirror].pan);
        // @ts-expect-error
        latestState.value[mirror].pan = intValue - 1;
      }
      convertKeyToSnakeCase();
      const insertPayload = formatInsertPayload();
      const { data, error } = await useAsyncData(
        "insertPrototype",
        async () => {
          const { data, error } = await client
            .from("Prototype")
            // @ts-expect-error
            .insert(insertPayload);
          if (error) {
            throw new Error(error.message);
          }
          return data;
        }
      );
      if (error.value) {
        isError.value = true;
        visible.value = true;
        errorMessage.value = error.value.message;
        return;
      }
      await getData();
      isSuccess.value = true;
      visible.value = true;
      emit("update-mirror-state", latestState.value);
    }
  },
  right: async (value: Boolean) => {
    if (value) {
      if (_selectedMirrors.value.length === 0) {
        isError.value = true;
        visible.value = true;
        errorMessage.value = "Please select at least a mirror.";
        return;
      }
      const selectedMirrors = _selectedMirrors.value as string[];
      for (let i = 0; i < selectedMirrors.length; i++) {
        const mirror = selectedMirrors[i];
        // @ts-expect-error
        const intValue = parseInt(latestState.value[mirror].pan);
        // @ts-expect-error
        latestState.value[mirror].pan = intValue + 1;
      }
      convertKeyToSnakeCase();
      const insertPayload = formatInsertPayload();
      const { data, error } = await useAsyncData(
        "insertPrototype",
        async () => {
          const { data, error } = await client
            .from("Prototype")
            // @ts-expect-error
            .insert(insertPayload);
          if (error) {
            throw new Error(error.message);
          }
          return data;
        }
      );
      if (error.value) {
        isError.value = true;
        visible.value = true;
        errorMessage.value = error.value.message;
        return;
      }
      await getData();
      isSuccess.value = true;
      visible.value = true;
      emit("update-mirror-state", latestState.value);
    }
  },
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
          <InputText v-model="data[field]" class="w-full" :key="field" />
        </template>
      </Column>
    </DataTable>
    <div class="flex-1"></div>
    <div class="flex flex-row items-center justify-center">
      <PrototypeDpad class="p-4" v-on="dpadUpdate" />
    </div>
    <Dialog v-model:visible="visible" modal>
      <template #header>
        <div v-if="isError" class="text-red-500 uppercase">Error</div>
        <div v-if="isSuccess" class="text-green-500 uppercase">Success</div>
      </template>
      <template #default>
        <div v-if="isError" class="text-red-500">
          {{ errorMessage }}
        </div>
        <div v-if="isSuccess" class="text-green-500">
          Changes were saved successfully! Hover over the mirror to see the
          changes.
        </div>
      </template>
    </Dialog>
  </div>
</template>
