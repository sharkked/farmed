<script setup lang="ts">
import { storeToRefs } from "pinia";
import GameBoard from "../components/game/GameBoard.vue";
import Sidebar from "../components/SidebarBase.vue";

import { useGameStore } from "@/ts/stores/game";
import type { PlantInfo } from "@/ts/types";
const game = useGameStore();
const { plants } = storeToRefs(game);

function onExpandClicked() {
  game.setMapSize(game.map.w + 1, game.map.h + 1);
}

function onPlantClicked(plant: PlantInfo) {
  game.currPlant = plant;
}
</script>

<template>
  <div
    id="game"
    class="h-full flex flex-auto justify-center items-center select-none"
  >
    <GameBoard />
  </div>
  <Sidebar>
    <div class="">coins: {{ game.coins }}</div>

    <input type="button" value="hi" @click="onExpandClicked" />

    <div
      v-for="plant in plants"
      :key="plant.id"
      class=""
      @click="onPlantClicked(plant)"
    >
      <div>{{ plant.name }}</div>
      <div>buy: {{ plant.cost }}</div>
      <div>sell: {{ plant.value }}</div>
    </div>
  </Sidebar>
</template>
