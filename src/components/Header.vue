<script setup lang="ts">
import { inject } from "vue";
import { GameEntity } from "../entities/GameEntity";

const game: GameEntity | undefined = inject("game");

function onShowHelpClick() {
  if (game) game.showHelp = true;
}

function onShowMenuClick() {
  if (game) game.showMenu = true;
}
</script>

<template>
  <div class="header">
    <h1 class="logo"  @click="onShowMenuClick()">
      <svg
        t="1736773720019"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="4369"
        width="24"
        height="24"
      >
        <path
          d="M0.021 292.554h292.533V0.021H0.02v292.533z m365.682 0h292.531V0.021H365.703v292.533zM731.448 0.02v292.533h292.531V0.02H731.448zM0.02 658.298h292.533V365.703H0.02v292.595z m365.682 0h292.531V365.703H365.703v292.595z m365.745 0h292.531V365.703H731.448v292.595zM0.02 1023.978h292.533V731.448H0.02v292.532z m365.682 0h292.531V731.448H365.703v292.532z m365.745 0h292.531V731.448H731.448v292.532z"
          fill="#666666"
          p-id="4370"
        ></path>
      </svg>
      <span style="margin-left: 10px">数独</span>
    </h1>
    <div class="side">
      <div class="help" @click="onShowHelpClick()">
        <svg
          t="1736773803900"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="5358"
          width="24"
          height="24"
        >
          <path
            d="M512 888c207.66 0 376-168.34 376-376S719.66 136 512 136 136 304.34 136 512s168.34 376 376 376z m0 72C264.576 960 64 759.424 64 512S264.576 64 512 64s448 200.576 448 448-200.576 448-448 448z m-32-160c-22.091 0-40-17.909-40-40s17.909-40 40-40 40 17.909 40 40-17.909 40-40 40z m32-188v68a8 8 0 0 1-8 8h-48a8 8 0 0 1-8-8v-68c0-35.346 28.654-64 64-64 71.797 0 130-58.203 130-130s-58.203-130-130-130-130 58.203-130 130h-64c0-107.143 86.857-194 194-194s194 86.857 194 194-86.857 194-194 194z"
            p-id="5359"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>
