<template>
	<BuilderNavbar>
		<template #menu>
			<div class="relative hidden lg:flex items-center ml-auto">
				<div class="flex items-center justify-center">
					<!-- This image is just a placeholder image, it will be substitued by a logic when we are fetching from database -->
					<img class="w-6 h-6 rounded-full" src="https://cdn.vuetifyjs.com/images/lists/1.jpg" alt="avatar" />
					<!-- this user name is a placeholder, it will be replaced by a logic when we are fetching from database -->
					<span class="ml-2 text-sm font-semibold">Quan Khuc</span>
				</div>
				<div class="flex space-x-4 border-l ml-6 pl-6 border-gray-900/10 dark:border-gray-50/[0.2]">
					<ThemeSwitcher />
				</div>
			</div>
		</template>
	</BuilderNavbar>
</template>