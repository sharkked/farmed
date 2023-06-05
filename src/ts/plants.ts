import { PlantType, type PlantInfo } from "./types";

export const plants: PlantInfo[] = [
  {
    id: "basicgrass",
    name: "Basic Grass",
    type: PlantType.GRASS,
    matureAge: 100,
    cost: 0,
    value: 1,
  },
  {
    id: "whiteflower",
    name: "White Flower",
    type: PlantType.GRASS,
    matureAge: 200,
    cost: 5,
    value: 10,
  },
];
