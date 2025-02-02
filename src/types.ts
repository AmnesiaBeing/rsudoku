export enum CellStatus {
  FIXED,
  DRAFT,
  SOLVE,
}

export enum CellValue {
  INVAILD = 0,
  V1 = 1,
  V2 = 2,
  V3 = 3,
  V4 = 4,
  V5 = 5,
  V6 = 6,
  V7 = 7,
  V8 = 8,
  V9 = 9,
}

export type Drafts = [
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean
];

export const DraftsDefault: Drafts = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
];

export type Cell = {
  id: number;
  r: number;
  c: number;
  g: number;
  n: number;
  value: CellValue;
  drafts: Drafts;
};
