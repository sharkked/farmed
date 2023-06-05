<script setup lang="ts">
defineProps<{
  progress: number;
}>();
</script>

<template>
  <div class="w-full h-full">
    <div class="bg-green-100" :style="`width:100%;height:${progress}%`"></div>
  </div>
</template>
