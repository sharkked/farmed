export enum CellStatus {
  NORMAL,
}

export enum PlantType {
  GRASS,
}

export interface PlantBase {
  id: string;
}

export interface PlantInfo extends PlantBase {
  name: string;
  description?: string;
  type: PlantType;
  matureAge: number;
  cost: number;
  value: number;
}

export interface Plant extends PlantBase {
  age: number;
}
