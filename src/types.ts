type Drafts = [
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

type Cell = {
  id: number;
  r: number;
  c: number;
  g: number;
  n: number;
  value: number | null; // 0-8 null
  drafts: Drafts | null;
};
