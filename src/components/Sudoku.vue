<script setup>
// import { provide, reactive, ref, watch } from "vue";
// import { GameState } from "../enum.js";
// import { Sudoku } from "../sudoku.js";
// import html2canvas from "html2canvas";

import Board from "./Board.vue";
import Header from "./Header.vue";
import Timer from "./Timer.vue";
import Info from "./Info.vue";
import Keyboard from "./Keyboard.vue";
import Dialog from "./Dialog.vue";
import Loading from "./Loading.vue";
// import { Screenshot } from "../../wailsjs/go/main/App.js";

// const sudoku = reactive(Sudoku());
// sudoku.init();
// provide("sudoku", sudoku);

// // 载入数独游戏选项
// const options = reactive(sudoku.getOptions());
// watch(options, (o) => sudoku.setOptions(o));

// // 实例化数独游戏
// const game = reactive(sudoku.game());
// sudoku.enter(game, options);
// watch(game, (g) => {
//   if (g.state === GameState.STARTED) {
//     sudoku.saveArchive(g);
//   }
// });
// provide("game", game);

// function newGame(test = false) {
//   if (test) {
//     game.test();
//   } else {
//     game.new(test ? { difficulty: -1 } : options);
//   }
//   sudoku.showMenu = false;
// }

// // 继续游戏
// function onContinue() {
//   game.start();
// }

// function onOver() {
//   game.board.selected = null;
//   game.failure();
//   sudoku.removeArchive();
// }

// function onCompleted() {
//   game.board.selected = null;
//   game.successful();
//   sudoku.removeArchive();
// }

// function onOpenMenu() {
//   game.init();
//   sudoku.showMenu = true;
// }

// function switchLevel(level) {
//   options.difficulty = level;
// }

// // TODO 加入保存游戏截图功能
// const wrapperDom = ref(null);
// provide("wrapperDom", wrapperDom);

const game = {
  state: "",
};
</script>

<template>
  <main ref="wrapperDom" :class="`state-${game.state}`">
    <div class="sudoku" style="--wails-draggable: no-drag">
      <Board />
    </div>

    <div class="sidebar">
      <Header />
      <Timer />
      <Info />
      <Keyboard @onOver="onOver" @onCompleted="onCompleted" />
    </div>
  </main>

  <!-- <Dialog
    type="menu"
    show-close
    show-quit
    show-info
    :show-replay="game.state !== 'pending'"
    v-model:visible="sudoku.showMenu"
  >
    <h2>选择游戏难度</h2>
    <div class="levels">
      <div
        class="level-item"
        v-for="(item, i) in sudoku.levels"
        :key="i"
        :class="options.difficulty === i ? 'active' : ''"
        @click="switchLevel(i)"
      >
        {{ item.label }}
      </div>
    </div>
    <div style="margin-top: 30px; display: flex">
      <div class="btn" @click="newGame()">开始新游戏</div>
    </div>
    <div
      class="btn"
      style="
        margin-top: 24px;
        border: 2px dashed #1e293b;
        background-color: #fff;
        color: #1e293b;
      "
      v-if="sudoku.env.buildType === 'dev'"
      @click="newGame(true)"
    >
      测试
    </div>
  </Dialog> -->

  <!-- <Dialog type="help" show-close show-info v-model:visible="sudoku.showHelp">
    <div class="help-content">
      <div>
        <h3>数独游戏</h3>
        <div>
          <p>
            数独是一款源自日本的经典益智游戏，旨在开发和提升逻辑思维能力，无需复杂的数学运算。随着你在这个游戏中的经验积累，你将不仅锻炼智力，还能培养专注力和耐心。
            更重要的是，你将学会如何构建和跟随逻辑推理链，从而解决问题。
          </p>
          <h4>游戏规则</h4>
          <ol>
            <li>
              <b>数独网格：</b> 数独网格是由一个 9x9 的格子组成，被进一步划分为
              9 个 3x3 的子网格（或称为“宫”）。
            </li>
            <li>
              <b>开始游戏：</b>
              游戏开始时，一些单元格已经被填入数字，这些数字是游戏的提示数字。玩家需要根据这些提示来填写剩余的空白单元格。
            </li>
            <li>
              <b>游戏目标：</b> 游戏目标是在每个宫、每行和每列中填入数字 1 到
              9，确保每个数字在每个宫、每行和每列中只出现一次。
            </li>
            <li>
              <b>答案提示：</b> 每局游戏最多提供
              <b>3</b> 个空白单元格的提示答案机会。
            </li>
            <li>
              <b>挑战失败：</b> 每局游戏最多允许输入错误次数为 <b>2</b> 次，在第
              <b>3</b> 次输入错误时会提示挑战失败。
            </li>
            <li>
              <b>挑战成功：</b> 在成功填写完整所有宫格后，将提示挑战成功。
            </li>
          </ol>
          <h4>游戏界面</h4>
          <p>为了方便游戏的过程，游戏为用户提供了具有特殊的功能界面：</p>
          <ul>
            <li>
              游戏左边部分为网格区域，用于显示最终网格的答题结果，功能包括选中单元格、填数、笔记、提示、错误等结果
            </li>
            <li>
              游戏右边部分为操作区域，用于答题的输入操作，功能包括开始新游戏、游戏计时、暂停游戏、继续游戏、数字输入、笔记输入、擦除、切换笔记模式、提示、重新挑战、退出游戏等功能操作
            </li>
          </ul>
          <h4>游戏功能</h4>
          <ol>
            <li>
              <b>开始新游戏：</b>
              点击后，系统将根据你选择的游戏难度，生成一个全新的数独游戏，包含全新的数字组合，为玩家提供全新的挑战。
            </li>
            <li>
              <b>重新挑战：</b>
              点击后，系统将正在进行中的游戏重置为原来开始的游戏，并重新计时。
            </li>
            <li>
              <b>暂停游戏：</b> 点击后，游戏将暂停计时，并隐藏所有已填的数字。
            </li>
            <li>
              <b>继续游戏：</b> 点击后，游戏将恢复计时，并显示所有已填的数字。
            </li>
            <li>
              <b>数字输入：</b>
              选中需要填的单元格后，点击你想输入的数字；如果已开启笔记模式，输入的数字为笔记。
            </li>
            <li>
              <b>擦除：</b> 点击后，将会删除你所选中单元格里的数字或笔记。
            </li>
            <li><b>笔记：</b> 点击后，将在笔记模式和数字模式之间切换。</li>
            <li>
              <b>提示：</b>
              点击后，会在你所选中单元格直接给出提示答案，每局游戏最多可提示3次。
            </li>
            <li>
              <b>退出游戏：</b>
              点击后，直接关闭并退出数独游戏软件，若你在游戏中退出，系统会保存记录，在下次打开游戏的时候，直接还原上次的游戏记录。
            </li>
          </ol>
          <h4>游戏策略</h4>
          <ol>
            <li>
              <b>观察与分析：</b>
              首先，观察游戏板上的数字分布，找出可能的填入位置。
            </li>
            <li>
              <b>使用排除法：</b>
              如果某个宫、行或列中已经有了某些数字，那么在其他位置填入这些数字就是不可能的。
            </li>
            <li>
              <b>标记与假设：</b>
              可以使用铅笔在可能的填入位置做标记，或者假设某个位置填入某个数字，然后看这是否会导致矛盾。
            </li>
            <li><b>逐步解决：</b> 从简单的部分开始，逐步解决整个数独网格。</li>
          </ol>
          <h4>游戏优点</h4>
          <ol>
            <li>
              <b>智力提升：</b>
              通过解决数独问题，玩家可以锻炼逻辑思维和解决问题的能力。
            </li>
            <li>
              <b>专注力训练：</b>
              数独需要玩家长时间集中注意力，因此可以提高专注力。
            </li>
            <li>
              <b>耐心培养：</b> 解决复杂的数独问题可能需要花费大量时间和耐心。
            </li>
            <li>
              <b>逻辑推理链的建立：</b>
              通过观察和分析游戏板，玩家可以学习如何建立有效的逻辑推理链。
            </li>
          </ol>

          <p>
            通过逐步填充这些空白单元格，你将体验到逻辑思维的乐趣和挑战。数独游戏因其简单易懂、老少皆宜的特点，在全球范围内都受到了广泛的欢迎。
          </p>
        </div>
      </div>
      <div class="shortcuts">
        <h3>功能操作快捷键说明</h3>
        <div>
          <table>
            <thead>
              <tr>
                <th>功能</th>
                <th>快捷键</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>输入数字/笔记</td>
                <td>1-9 [数字键]</td>
              </tr>
              <tr>
                <td>擦除</td>
                <td>Del [删除] / Backspace [退格]</td>
              </tr>
              <tr>
                <td>切换笔记模式</td>
                <td>Tab [切换]</td>
              </tr>
              <tr>
                <td>提示</td>
                <td>Enter [回车]</td>
              </tr>
              <tr>
                <td>方向</td>
                <td>↑[上] ↓[下] ←[左] →[右]</td>
              </tr>
              <tr>
                <td>暂停/继续</td>
                <td>Space [空格]</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </Dialog>

  <Dialog type="loading" :visible="game.state === GameState.LOADING">
    <Loading />
    <h2 style="margin-top: 30px">正在努力的出题中</h2>
  </Dialog> -->

  <!-- <Dialog
    type="pause"
    title="休息一下"
    show-info
    show-replay
    show-quit
    :visible="game.state === 'paused'"
  >
    <div><img src="../assets/images/pause.svg" /></div>
    <div style="--wails-draggable: no-drag">
      <div class="btn btn-dark mt-3" @click="onContinue">继续游戏</div>
    </div>
  </Dialog>

  <Dialog
    type="successful"
    title="挑战成功"
    show-info
    show-replay
    show-quit
    show-screenshot
    :visible="game.state === 'successful'"
  >
    <div><img src="../assets/images/successful.svg" /></div>
    <div>
      <div class="btn btn-dark mt-3" @click="onOpenMenu">开始新游戏</div>
    </div>
  </Dialog>

  <Dialog
    type="failure"
    title="挑战失败"
    show-info
    show-replay
    show-quit
    show-screenshot
    :visible="game.state === 'failure'"
  >
    <div><img src="../assets/images/failure.svg" /></div>
    <div>
      <div class="btn btn-dark mt-3" @click="onOpenMenu">开始新游戏</div>
    </div>
  </Dialog> -->
</template>
