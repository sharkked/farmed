import { defineStore } from "pinia";
import { CellStatus } from "../types";
import type { Plant, PlantInfo } from "../types";

export interface Cell {
  plant: Plant | null;
  status: CellStatus;
}

interface GameState {
  data: {
    coins: number;
    map: {
      w: number;
      h: number;
      cells: Cell[][];
    };
  };
  currPlant?: PlantInfo;
  plants: PlantInfo[];
}

export const useGameStore = defineStore({
  id: "game",
  state: () =>
    ({
      data: {
        coins: 0,
        map: {
          w: 0,
          h: 0,
          cells: [[]],
        },
      },
      plants: [],
    } as GameState),
  getters: {
    cellInBounds: (state) => (i: number, j: number) =>
      i >= 0 && i < state.data.map.w && j >= 0 && j < state.data.map.h,
    cellIsEmpty: (state) => (i: number, j: number) =>
      state.data.map.cells[i][j].plant == null,
    cellIsMature: (state) => (i: number, j: number) => {
      const plant = state.data.map.cells[i][j].plant;
      if (plant == null) return false;
      const info = state.plants.find((p) => p.id == plant.id);
      if (info == null) return false;
      return plant.age >= info.matureAge;
    },
    getCellMaturity: (state) => (i: number, j: number) => {
      const plant = state.data.map.cells[i][j].plant;
      if (plant === null || plant.age == null) return -1;
      const info = state.plants.find((p) => p.id == plant.id);
      if (info == null) return -1;
      return (100 * plant.age) / info.matureAge;
    },
    getCellPlant: (state) => (i: number, j: number) =>
      state.data.map.cells[i][j].plant,
    getPlantInfo: (state) => (id: string) => {
      const plant = state.plants.find((p) => p.id == id);
      return plant;
    },
    map: (state) => state.data.map,
    coins: (state) => state.data.coins,
  },
  actions: {
    addCoins(n: number) {
      this.data.coins += n;
    },
    createMap(w: number, h: number) {
      this.map.w = w;
      this.map.h = h;
      this.map.cells = [];
      for (let j = 0; j < h; j++) {
        this.map.cells[j] = [];
        for (let i = 0; i < w; i++) {
          this.map.cells[j][i] = {
            plant: null,
            status: CellStatus.NORMAL,
          };
        }
      }
    },
    // Plants
    setMapSize(w: number, h: number) {
      const lastmap = this.map.cells;
      const lastw = this.map.w;
      const lasth = this.map.h;
      this.createMap(w, h);

      for (let j = 0; j < lasth; j++) {
        for (let i = 0; i < lastw; i++) {
          if (!this.cellInBounds(i, j)) continue;
          this.map.cells[i][j] = lastmap[i][j];
        }
      }
    },
    loadPlantInfo(plant: PlantInfo) {
      this.plants.push(plant);
    },
    setPlant(i: number, j: number, id: string) {
      this.map.cells[i][j].plant = { id: id, age: 0 };
    },
    clearPlant(i: number, j: number) {
      this.map.cells[i][j].plant = null;
    },
    buyPlant(i: number, j: number, plant: PlantInfo) {
      if (!this.cellIsEmpty(i, j)) return;
      if (this.coins < plant.cost) return;
      this.addCoins(-plant.cost);
      this.setPlant(i, j, plant.id);
    },
    harvestPlant(i: number, j: number) {
      if (!this.cellIsMature(i, j)) return;
      const plant = this.getCellPlant(i, j);
      this.clearPlant(i, j);
      const info = this.plants.find((p) => p.id == plant?.id);
      if (!info) return;
      this.addCoins(info.value);
    },
    addPlantAge(i: number, j: number, t: number) {
      const plant = this.map.cells[i][j].plant;
      if (plant == null) return;
      plant.age += t;
    },
    tick() {
      for (let j = 0; j < this.map.h; j++) {
        for (let i = 0; i < this.map.w; i++) {
          if (this.cellIsEmpty(i, j) || this.cellIsMature(i, j)) continue;
          this.addPlantAge(i, j, 1);
        }
      }
    },
  },
});
