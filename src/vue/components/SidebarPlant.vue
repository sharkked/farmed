<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useGameStore } from "@/ts/stores/game";

const game = useGameStore();
const { plants } = storeToRefs(game);
</script>

<template>
  <div class="">text</div>
</template>
