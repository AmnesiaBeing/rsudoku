<script setup lang="ts">
import { computed, inject, ref } from "vue";
import { GameEntity } from "../entities/GameEntity";
import { Cell } from "../types";

const hoveredCell = ref<Cell | null>(null);

const game: GameEntity | undefined = inject("game");

const grid_render = game?.board;

function onSelect(cell: Cell) {}

function onHover(cell: Cell) {
  hoveredCell.value = cell;
}

function onLeave() {
  hoveredCell.value = null;
}

function isHighlighted(cell: Cell) {
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
          <div class="cell-notes" v-else-if="cell.drafts">
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
