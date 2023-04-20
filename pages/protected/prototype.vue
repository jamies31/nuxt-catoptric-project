<template>
  <PageWrapper>
    <PageHeader>
      <PageTitle
        text="Prototype of the system"
        class="uppercase flex justiy-center"
      />
    </PageHeader>
    <PageBody>
      <PageSection>
        <div class="h-4 w-3/4 bg-gray-600"></div>
        <div class="flex flex-col">
          <div class="flex flex-row">
            <div class="w-4 h-96 bg-gray-600"></div>
            <div class="flex flex-col justify-between">
              <div class="h-4 w-10 bg-gray-600 mt-24"></div>
              <div class="h-4 w-10 bg-gray-600 mb-24"></div>
            </div>
            <div class="flex flex-col">
              <button
                type="button"
                class="rounded-md dark:bg-cyan-500 bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 mt-10 h-2/6"
              >
                Top Left
              </button>
              <button
                type="button"
                class="rounded-md dark:bg-cyan-500 bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 mt-10 h-2/6"
              >
                Bottom Left
              </button>
            </div>
            <div class="flex flex-col justify-between">
              <div class="h-4 w-56 bg-gray-600 mt-24"></div>
              <div class="h-4 w-56 bg-gray-600 mb-24"></div>
            </div>
          </div>
        </div>
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>
<script lang="ts" setup>
definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});
</script>
