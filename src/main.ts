import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./vue/App.vue";

import { useGameStore } from "./ts/stores/game";
import { plants } from "./ts/plants";

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());

const game = useGameStore();
game.createMap(7, 7);
plants.forEach((p) => game.loadPlantInfo(p));

app.mount("#app");
