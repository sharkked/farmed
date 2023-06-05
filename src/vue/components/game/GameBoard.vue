<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useGameStore } from "@/ts/stores/game";
import Cell from "./GameCell.vue";

const game = useGameStore();
const { cellIsEmpty, getCellMaturity } = storeToRefs(game);

function onClick(i: number, j: number) {
  if (game.cellIsEmpty(i, j)) {
    if (game.currPlant) game.buyPlant(i, j, game.currPlant);
  } else {
    game.harvestPlant(i, j);
  }
}

setInterval(() => {
  game.tick();
}, 100);
</script>

<template>
  <table class="border border-collapse">
    <tr v-for="(_, i) in game.map.h" :key="i">
      <td
        v-for="(_, j) in game.map.w"
        :key="i + '-' + j"
        :class="`w-10 h-10 border text-center bg-${
          cellIsEmpty(i, j)
            ? 'gray'
            : ['blue', 'purple', 'red', 'orange', 'yellow', 'green'][
                Math.floor(getCellMaturity(i, j) / 20)
              ]
        }-100`"
        @click="onClick(i, j)"
      >
        <Cell :progress="getCellMaturity(i, j)" />
      </td>
    </tr>
  </table>
</template>
