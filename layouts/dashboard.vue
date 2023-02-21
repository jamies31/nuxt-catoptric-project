<template>
	<div>
		<slot name="app-before"></slot>
		<div id="app-before"></div>
		<div class="flex flex-col min-h-screen">
			<slot name="header">
				<DashboardNavbar></DashboardNavbar>
			</slot>
			<div class="flex-1 w-full flex flex-col">
				<div class="relative flex-1 flex flex-row mx-auto w-full h-full">
					<div class="lg:pl-8">
						<DashboardSidebar></DashboardSidebar>
					</div>
					<div class="flex flex-col lg:ml-60 xl:ml-80 w-full">
						<slot />
					</div>
				</div>
			</div>
		</div>
		<slot name="app-after"></slot>
		<div id="app-after"></div>
	</div>
</template>