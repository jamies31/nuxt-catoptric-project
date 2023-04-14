<script lang="ts" setup>
import { useMirrorManager } from '~/stores/mirrorManager';

definePageMeta({
	layout: 'dashboard',
	middleware: ['auth'],
})
const mirrorManager = useMirrorManager();
const allMirrors = mirrorManager.getAllMirrors;
const topLeftMirrors = computed(() => {
	return allMirrors.slice(0, 48);
});
const leftMostMirrors = computed(() => {
	return allMirrors.slice(48, 192);
})
const rightMostMirrors = computed(() => {
	return allMirrors.slice(192, 294);
})
const topRightMirrors = computed(() => {
	return allMirrors.slice(294, 358);
})
const bottomLeftMirrors = computed(() => {
	return allMirrors.slice(358, 518);
})
const bottomRightMirrors = computed(() => {
	return allMirrors.slice(518, 688);
})
</script>

<template>
	<PageWrapper>
		<PageBody class="flex">
			<PageSection class="flex-1 flex items-center flex-col justify-between">
				<div class="system-wrapper">
					<!-- top left -->
					<div class="wrapper panel-1">
						<div class="top-left">
							<div v-for="mirror in topLeftMirrors"
								:class="mirror.isSelected ? 'drag-select-option--selected' : 'drag-select-option'">
								{{ mirror.number }}
							</div>
						</div>
					</div>
					<!-- left most -->
					<div class="wrapper panel-2">
						<div class="left-most">
							<div v-for="mirror in leftMostMirrors"
								:class="mirror.isSelected ? 'drag-select-option--selected' : 'drag-select-option'">
								{{ mirror.number }}
							</div>
						</div>
					</div>
					<!-- right most -->
					<div class="wrapper panel-3">
						<div class="right-most">
							<div v-for="mirror in rightMostMirrors"
								:class="mirror.isSelected ? 'drag-select-option--selected' : 'drag-select-option'">
								{{ mirror.number }}
							</div>
						</div>
					</div>
					<!-- top right -->
					<div class="wrapper panel-4">
						<div class="top-right">
							<div v-for="mirror in topRightMirrors"
								:class="mirror.isSelected ? 'drag-select-option--selected' : 'drag-select-option'">
								{{ mirror.number }}
							</div>
						</div>
					</div>
					<!-- bottom left -->
					<div class="wrapper panel-5">
						<div class="bottom-left">
							<div v-for="mirror in bottomLeftMirrors"
								:class="mirror.isSelected ? 'drag-select-option--selected' : 'drag-select-option'">
								{{ mirror.number }}
							</div>
						</div>
					</div>
					<div class="hidden panel-6"></div>
					<div class="hidden panel-7"></div>
					<!-- bottom right -->
					<div class="wrapper panel-8">
						<div class="bottom-right">
							<div v-for="mirror in bottomRightMirrors"
								:class="mirror.isSelected ? 'drag-select-option--selected' : 'drag-select-option'">
								{{ mirror.number }}
							</div>
						</div>
					</div>
				</div>
				<MirrorController />
			</PageSection>
		</PageBody>
	</PageWrapper>
</template>

<style scoped lang="scss">
.system-wrapper {
	width: 100%;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: repeat(2, 1fr);
	grid-gap: 1rem;
}

.wrapper {
	position: relative;
	border: 1px solid #086f5a;
	overflow: auto;
	height: max-content;
}

.top-left {
	display: grid;
	grid-template-columns: repeat(8, 1fr);
	grid-template-rows: repeat(6, 1fr);
}

.left-most {
	display: grid;
	grid-template-columns: repeat(16, 1fr);
	grid-template-rows: repeat(6, 1fr);
}

.right-most {
	display: grid;
	grid-template-columns: repeat(17, 1fr);
	grid-template-rows: repeat(6, 1fr);
}

.top-right {
	display: grid;
	grid-template-columns: repeat(8, 1fr);
	grid-template-rows: repeat(6, 1fr);
}

.bottom-left {
	display: grid;
	grid-template-columns: repeat(16, 1fr);
	grid-template-rows: repeat(10, 1fr);
}

.bottom-right {
	display: grid;
	grid-template-columns: repeat(17, 1fr);
	grid-template-rows: repeat(10, 1fr);
}

.panel-8 {
	grid-column: 4 / 5;
	grid-row: 2 / 3;
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
	height: 2.5rem;
	margin: 0.5rem;
	color: #000000;
	border-radius: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #10ccc3;
}</style>