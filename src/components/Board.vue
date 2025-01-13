<script setup lang="ts">
import { computed } from "vue";

type Note = [
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

const grid = computed(() => {
  let grid: {
    id: number;
    class: string;
    value: string | null;
    notes: Note;
  }[][] = [];
  for (let i = 0; i < 9; i++) {
    let rows: {
      id: number;
      class: string;
      value: string | null;
      notes: Note;
    }[] = [];
    for (let j = 0; j < 9; j++) {
      rows.push({
        id: i * 9 + j,
        class: "",
        value: null,
        notes: [false, false, true, false, false, true, false, false, true],
      });
    }
    grid.push(rows);
  }
  return grid;
});

function onSelect(id: number) {}
</script>

<template>
  <div class="board-container">
    <div class="board">
      <div class="board-row" v-for="(row, r) in grid" :key="r">
        <div
          class="board-col board-cell"
          v-for="cell in row"
          :key="cell.id"
          :class="cell.class"
          @click="onSelect(cell.id)"
        >
          <div class="cell-value" v-if="cell.value">
            {{ cell.value }}
          </div>
          <div class="cell-notes" v-else-if="cell.notes.length > 0">
            <div class="notes-item" v-for="(note, n) in cell.notes" :key="n">
              {{ note ? n + 1 : " " }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
