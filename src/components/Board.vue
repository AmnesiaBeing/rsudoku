<script setup>
import { computed } from "vue";

// import { computed, ref, watch } from "vue";

// const props = defineProps({
//   board: Object,
// });

// // const board = inject('board')
// const cells = ref(props.board.getCells());

// const grid = computed(() => {
//   let grid = [];
//   for (let i = 0; i < 9; i++) {
//     let rows = [];
//     for (let j = 0; j < 9; j++) {
//       let index = i * 9 + j;
//       rows.push(cells.value[index]);
//     }
//     grid.push(rows);
//   }
//   return grid;
// });

// watch(props.board, (newBoard, oldVal) => {
//   cells.value = newBoard.getCells();
// });

// // 选中事件
// const emit = defineEmits(["onSelect"]);

// function onSelect(id) {
//   props.board.selected = id;
//   emit("onSelect", cells.value[id]);
// }

const grid = computed(() => {
  let grid = [];
  for (let i = 0; i < 9; i++) {
    let rows = [];
    for (let j = 0; j < 9; j++) {
      rows.push({
        id: i * 9 + j,
        class: "",
        value: "9",
        notes: [],
      });
    }
  }
});
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
          <div class="cell-notes" v-else-if="cell.notes.length">
            <div class="notes-item" v-for="(note, n) in cell.notes" :key="n">
              {{ note }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
