<script setup lang="ts">
import { computed, ref } from "vue";

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

type GridRender = {
  id: number;
  r: number;
  c: number;
  g: number;
  n: number;
  cell_class: string;
  value: string | null;
  drafts: Drafts;
};

const hoveredCell = ref<GridRender | null>(null);

const grid_render = computed(() => {
  let grid: GridRender[][] = [];
  for (let r = 0; r < 9; r++) {
    let rows: GridRender[] = [];
    for (let c = 0; c < 9; c++) {
      let g = Math.floor(r / 3) * 3 + Math.floor(c / 3);
      let n = r * 9 + c;
      let cell_class = "";

      rows.push({
        id: r * 9 + c,
        r,
        c,
        g,
        n,
        cell_class,
        value: null,
        drafts: [false, false, true, false, false, true, false, false, true],
      });
    }
    grid.push(rows);
  }
  return grid;
});

function onSelect(cell: GridRender) {}

function onHover(cell: GridRender) {
  hoveredCell.value = cell;
}

function onLeave() {
  console.log("leave");
  hoveredCell.value = null;
}

function isHighlighted(cell: GridRender) {
  if (hoveredCell.value) {
    const { r: r1, c: c1, g: g1 } = hoveredCell.value;
    const { r: r2, c: c2, g: g2 } = cell;
    return r1 === r2 || c1 === c2 || g1 === g2;
  }
}
</script>

<template>
  <div class="board-container">
    <div class="board" @mouseleave="onLeave">
      <div class="board-row" v-for="(row, r) in grid_render" :key="r">
        <div
          class="board-col board-cell"
          v-for="cell in row"
          :key="cell.id"
          :class="isHighlighted(cell) ? 'cell-highlight' : ''"
          @click="onSelect(cell)"
          @mouseover="onHover(cell)"
        >
          <div class="cell-value" v-if="cell.value">
            {{ cell.value }}
          </div>
          <div class="cell-notes" v-else-if="cell.drafts.length > 0">
            <div
              class="notes-item"
              :class="note ? 'notes-item-highlight' : ''"
              v-for="(note, n) in cell.drafts"
              :key="n"
            >
              {{ note ? n + 1 : " " }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
