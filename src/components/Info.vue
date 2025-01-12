<script setup>
// import { inject } from "vue";

// const game = inject("game");
const game = {
  prompted: 0,
  maxPrompts: 3,

  mistaken: 0,
  maxMistakes: 3,
};
</script>

<template>
  <div class="info">
    <div class="prompt">
      <label>提示:</label>
      <span>
        <b :class="game.prompted > 0 ? 'prompted' : ''">{{ game.prompted }}</b>
        /
        <b>{{ game.maxPrompts }}</b>
      </span>
    </div>
    <div class="mistake">
      <label>错误:</label>
      <span>
        <b :class="game.mistaken > 0 ? 'mistaken' : ''">{{ game.mistaken }}</b>
        / <b>{{ game.maxMistakes }}</b></span
      >
    </div>
  </div>
</template>
