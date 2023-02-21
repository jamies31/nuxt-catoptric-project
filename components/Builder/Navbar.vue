<script lang="ts" setup>
import { AppConfigInput } from '@nuxt/schema';

const app = useAppConfig() as AppConfigInput;
const navbar = ref(null);
</script>
<template>
    <div 
        ref="navbar"
        class="backdrop-filter backdrop-blur-md top-0 z-40 w-full flex-none transition-colors duration-300 lg:z-50 border-b border-gray-900/10 dark:border-gray-50/[0.2] bg-white/[0.5] dark:bg-slate-900/[0.5]"
        >
        <div class="w-full mx-auto">
            <div class="py-3 lg:px-8 mx-4 lg:mx-0">
                <div class="relative flex items-center">
                    <!-- title -->
                    <slot name="title">
                        <NuxtLink
                            tag="a"
                            class="mr-3 flex-none overflow-hidden md:w-auto text-md font-bold text-gray-900 dark:text-gray-200"
                            :to="{name: 'index'}"
                        >
                            <span class="flex items-center">
                                {{ app.name }}
                            </span>
                        </NuxtLink>
                    </slot>
                    <!-- menu -->
                    <slot name="menu" />
                </div>
            </div>
        </div>
    </div>
</template>