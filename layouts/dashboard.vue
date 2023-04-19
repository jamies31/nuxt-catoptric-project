<template>
  <div>
    <slot name="app-before" />
    <div id="app-before"></div>
    <div class="flex flex-col min-h-screen">
      <slot name="header">
        <DashboardNavbar>
          <template #drawer>
            <DashboardSidebar mode="mobile" />
          </template>
        </DashboardNavbar>
      </slot>
      <div class="flex-1 w-full flex flex-col">
        <div
          class="relative flex-1 flex flex-row mx-auto max-w-8xl w-full h-full justify-center"
        >
          <div class="lg:pl-8 py-4">
            <DashboardSidebar />
          </div>
          <div class="flex-col flex lg:ml-60 xl:ml-78 w-full h-full content">
            <slot />
          </div>
        </div>
      </div>
    </div>
    <slot name="app-after" />
    <div id="app-after"></div>

    <slot name="top-left" />
    <div id="top-left"></div>

    <slot name="left-most" />
    <div id="left-most"></div>

    <slot name="right-most" />
    <div id="right-most"></div>

    <slot name="top-right" />
    <div id="top-right"></div>

    <slot name="bottom-left" />
    <div id="bottom-left"></div>

    <slot name="bottom-right" />
    <div id="bottom-right"></div>
  </div>
</template>
<style lang="scss" scoped>
.content{
  max-width: stretch;
}
</style>