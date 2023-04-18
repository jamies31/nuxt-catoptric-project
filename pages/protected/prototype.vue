<script setup lang="ts">

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth'],
})

</script>
<template>
  <PageWrapper>
    <PageBody>
      <PageSection>
        <div class="mirror"></div>
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>
<style lang="scss" scoped>
.mirror {
  width: 20px;
  height: 30px;
  border-radius: 50% / 100%;
  background-color: silver;
  transform: scaleY(1.5);
}
</style>