<script setup>
import { ref } from "vue";
// import { GameState } from "../enum.js";

// const props = defineProps(["game", "board"]);

const numbers = ref([1, 2, 3, 4, 5, 6, 7, 8, 9]);

const game = {
  prompted: 0,
  maxPrompts: 3,
};

// // 注册事件
// const emit = defineEmits([
//   "onInput",
//   "onErase",
//   "toggleNote",
//   "onPrompt",
//   "onValidate",
//   "onOver",
//   "onCompleted",
// ]);

// // 处理输入事件
// function onInput(num) {
//   if (props.board.set(num)) {
//     emit("onInput", num);

//     // 如果笔记模式开启，则不会执行下面逻辑
//     if (props.board.active) {
//       return;
//     }

//     // 验证输入的值是否正确
//     if (!props.board.validate()) {
//       props.board.mistakes[props.board.selected] = num;
//       emit("onValidate");

//       // 增加错误次数
//       if (props.game.mistaken < props.game.maxMistakes) {
//         props.game.mistaken++;
//       }

//       // 如果错误次数超过指定数量，则挑战失败
//       if (props.game.mistaken >= props.game.maxMistakes) {
//         emit("onOver");
//       }
//     }

//     // 验证是否填写完整，如果填写完整，则挑战成功
//     else if (props.board.getIsCompleted()) {
//       emit("onCompleted");
//     }
//   }
// }

// // 处理擦除事件
// function onErase() {
//   props.board.remove();
//   emit("onErase");
// }

// // 处理切换笔记模式事件
// function toggleNote() {
//   props.board.toggle();
//   emit("toggleNote");
// }

// // 处理提示事件
// function onPrompt() {
//   if (props.game.prompted < props.game.maxPrompts && props.board.prompt()) {
//     props.game.prompted++;
//     emit("onPrompt");

//     if (props.board.getIsCompleted()) {
//       emit("onCompleted");
//     }
//   }
// }

// // 定义快捷键
// window.addEventListener("keydown", (event) => {
//   if (props.board.selected === null) {
//     return;
//   }

//   console.log("keydown", event);
//   let keyNum = parseInt(event.key);
//   if (event.key === "Backspace" || event.key === "Delete") {
//     onErase();
//   } else if (event.key === "Tab") {
//     toggleNote();
//   } else if (event.key === "Enter") {
//     onPrompt();
//   } else if (event.code === "Space") {
//     if (props.game.state === GameState.STARTED) {
//       props.game.pause();
//     } else if (props.game.state === GameState.PAUSED) {
//       props.game.start();
//     }
//   } else if (event.key === "ArrowLeft" && props.board.selected > 0) {
//     props.board.selected--;
//   } else if (event.key === "ArrowRight" && props.board.selected < 80) {
//     props.board.selected++;
//   } else if (event.key === "ArrowUp" && props.board.selected >= 9) {
//     props.board.selected -= 9;
//   } else if (event.key === "ArrowDown" && props.board.selected <= 71) {
//     props.board.selected += 9;
//   } else if (numbers.value.includes(keyNum)) {
//     onInput(keyNum);
//   }
// });
</script>

<template>
  <div class="keyboard mt-3" style="--wails-draggable: no-drag">
    <div
      class="btn-num"
      v-for="num in numbers"
      :key="num"
      @click="onInput(num)"
    >
      {{ num }}
    </div>
  </div>

  <div class="actions mt-3" style="--wails-draggable: no-drag">
    <div class="action-item">
      <div class="btn-action" @click="onErase">
        <svg
          t="1716282197424"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2733"
          width="28"
          height="28"
        >
          <path
            d="M789.3 907.3h-40.9 16.2c13.8-0.8 24.7-12.2 24.7-26.2v26.2zM209.2 907.1v-40.9 16.2c0.8 13.8 12.2 24.7 26.2 24.7h-26.2zM43.2 171.1c0 22.6 18.3 41 41 41h838.1c22.6 0 41-18.3 41-41 0-22.6-18.3-41-41-41H84.2c-22.6 0.1-41 18.4-41 41z"
            fill="#1e293b"
            p-id="2734"
          ></path>
          <path
            d="M532.7 40.7h-51.4c-22.6 0-41 18.3-41 41v89.5c0 22.6 18.3 41 41 41h51.4c22.6 0 41-18.3 41-41V81.6c0-22.6-18.4-40.9-41-40.9zM391.8 291.9c-22.6 0-41 18.3-41 41V791c0 22.6 18.3 41 41 41 22.6 0 41-18.3 41-41V332.8c-0.1-22.6-18.4-40.9-41-40.9zM607 291.9c-22.6 0-41 18.3-41 41V791c0 22.6 18.3 41 41 41 22.6 0 41-18.3 41-41V332.8c-0.1-22.6-18.4-40.9-41-40.9z"
            fill="#1e293b"
            p-id="2735"
          ></path>
          <path
            d="M187.7 988.6H809c34.6-3.2 61.7-32.3 61.7-67.8v-0.5h0.1V332.8c0-22.6-18.3-41-41-41-22.6 0-41 18.3-41 41v573.9h-579V170.1c0-22.6-18.3-41-41-41s-41 18.3-41 41V925c2.1 33 27.5 59.7 59.9 63.6z"
            fill="#1e293b"
            p-id="2736"
          ></path>
        </svg>
      </div>
      <div class="text">擦除</div>
    </div>
    <div class="action-item note">
      <div class="btn-action" :class="'note-active'" @click="toggleNote">
        <i class="badge">{{ "ON" }}</i>
        <svg
          t="1716282283949"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3116"
          id="mx_n_1716282283950"
          width="28"
          height="28"
        >
          <path
            d="M807.4 293.5l-28.9 28.9 11.5-11.5c9.2-10.3 8.8-26.1-1.1-36l18.5 18.6zM650.5 136.3l28.9 28.9-11.5-11.5c-10.3-9.2-26.1-8.8-36 1.1l18.6-18.5zM960.3 925.6c0-22.6-18.3-41-41-41H100.1c-22.6 0-41 18.3-41 41 0 22.6 18.3 41 41 41h819.3c22.6-0.1 40.9-18.4 40.9-41zM164.8 820.6c22.6 0 41-18.3 41-41V564.7c0-22.6-18.3-41-41-41-22.6 0-41 18.3-41 41v214.9c0 22.7 18.4 41 41 41z"
            fill="#1e293b"
            p-id="3117"
          ></path>
          <path
            d="M123.8 779.7c0 22.6 18.3 41 41 41h214.3c22.6 0 41-18.3 41-41 0-22.6-18.3-41-41-41H164.8c-22.6 0-41 18.4-41 41z"
            fill="#1e293b"
            p-id="3118"
          ></path>
          <path
            d="M874.9 245.5c-0.1-0.1-0.3-0.2-0.4-0.4L695.1 65.7c-26.7-23.2-67.3-22.2-92.7 3.3-0.1 0.1-0.2 0.3-0.4 0.4L135.4 535.9c-16 16-16 41.9 0 57.9s41.9 16 57.9 0l457-457L807 293.4 350.1 750.3c-16 16-16 41.9 0 57.9s41.9 16 57.9 0l471.4-471.4c21.9-26.7 20.4-66.3-4.5-91.3z"
            fill="#1e293b"
            p-id="3119"
          ></path>
        </svg>
      </div>
      <div class="text">笔记</div>
    </div>
    <div class="action-item">
      <div class="btn-action" @click="onPrompt">
        <i class="badge">{{ game.maxPrompts - game.prompted }}</i>
        <svg
          t="1716282341431"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3458"
          id="mx_n_1716282341431"
          width="28"
          height="28"
        >
          <path
            d="M516.2 376c-76.2 0-138 61.8-138 138s61.8 138 138 138 138-61.8 138-138c0.1-76.2-61.7-138-138-138z m0 194.2c-31 0-56.1-25.1-56.1-56.1s25.1-56.1 56.1-56.1 56.1 25.1 56.1 56.1c0.1 31-25.1 56.1-56.1 56.1zM516.2 247.3c-22.6 0-41-18.3-41-41v-158c0-22.6 18.3-41 41-41 22.6 0 41 18.3 41 41v158.1c0 22.6-18.4 40.9-41 40.9zM516.2 1020.7c-22.6 0-41-18.3-41-41V821.6c0-22.6 18.3-41 41-41 22.6 0 41 18.3 41 41v158.1c0 22.7-18.4 41-41 41zM249.5 514c0 22.6-18.3 41-41 41h-158c-22.6 0-41-18.3-41-41 0-22.6 18.3-41 41-41h158.1c22.6 0 40.9 18.4 40.9 41zM1022.9 514c0 22.6-18.3 41-41 41H823.8c-22.6 0-41-18.3-41-41 0-22.6 18.3-41 41-41h158.1c22.7 0 41 18.4 41 41z"
            fill="#1e293b"
            p-id="3459"
          ></path>
          <path
            d="M516.2 97c-230.3 0-417 186.7-417 417 0 171.3 103.3 318.5 251 382.7l41-71.7C268 775.5 181.1 655 181.1 514.1c0-185.1 150-335.1 335.1-335.1s335.1 150 335.1 335.1c0 185.1-150 335.1-335.1 335.1v81.9c230.3 0 417-186.7 417-417C933.3 283.7 746.6 97 516.2 97z"
            fill="#1e293b"
            p-id="3460"
          ></path>
          <path
            d="M368.4 859.8m-40.9 0a40.9 40.9 0 1 0 81.8 0 40.9 40.9 0 1 0-81.8 0Z"
            fill="#1e293b"
            p-id="3461"
          ></path>
        </svg>
      </div>
      <div class="text">提示</div>
    </div>
  </div>
</template>
