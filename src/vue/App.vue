<script setup lang="ts">
import Header from "./components/AppHeader.vue";
import GameView from "./views/GameView.vue";
</script>

<template>
  <div class="flex flex-col h-full">
    <Header />
    <GameView />
  </div>
</template>

<style>
#app {
  width: 100%;
  height: 100vh;

  margin: 0 auto;
}
</style>
