<script setup lang="ts">
import { onMounted, onUnmounted, provide, reactive } from "vue";

import Board from "./Board.vue";
import Header from "./Header.vue";
import Timer from "./Timer.vue";
import Keyboard from "./Keyboard.vue";
import Dialog from "./Dialog.vue";
import Loading from "./Loading.vue";
import { GameEntity } from "../entities/GameEntity";
import { Difficulty, GameState } from "../enum";

const game = reactive(new GameEntity());
provide("game", game);

function newGame() {
  game.newGame();
  game.showMenu = false;
}

function onOpenMenu() {
  game.init();
  game.showMenu = true;
}

function switchLevel(level: Difficulty) {
  game.difficulty = level;
  game.saveArchive();
}

// 监听 beforeunload 事件
function handleBeforeUnload(_event: BeforeUnloadEvent) {
  game.saveArchive();
}

// 添加事件监听器
onMounted(() => {
  window.addEventListener("beforeunload", handleBeforeUnload);
});

// 移除事件监听器
onUnmounted(() => {
  window.removeEventListener("beforeunload", handleBeforeUnload);
});
</script>

<template>
  <main ref="wrapperDom" :class="`state-${game.state}`">
    <div class="sudoku">
      <Board />
    </div>

    <div class="sidebar">
      <Header />
      <Timer />
      <div class="spacer" />
      <Keyboard />
    </div>
  </main>

  <Dialog
    type="menu"
    v-model:visible="game.showMenu"
    @click="game.showMenu = !(game.state === GameState.STARTED)"
  >
    <h2>选择游戏难度</h2>
    <div class="levels">
      <div
        class="level-item"
        v-for="(item, i) in Difficulty"
        :key="i"
        :class="game.difficulty === item ? 'active' : ''"
        @click.stop="switchLevel(item)"
      >
        {{ item }}
      </div>
    </div>
    <div style="margin-top: 30px; display: flex">
      <div class="btn" @click.stop="newGame()">开始新游戏</div>
    </div>
  </Dialog>

  <Dialog type="loading" :visible="game.state === GameState.LOADING">
    <Loading />
    <h2 style="margin-top: 30px">正在努力的出题中</h2>
  </Dialog>

  <Dialog
    type="pause"
    title="休息一下"
    :visible="game.state === GameState.PAUSED"
    @click="game.start()"
  >
    <div>
      <div class="btn btn-dark mt-3" @click="game.start()">继续游戏</div>
    </div>
  </Dialog>

  <Dialog
    type="successful"
    title="挑战成功"
    :visible="game.state === GameState.SUCCESS"
  >
    <div>
      <div class="btn btn-dark mt-3" @click="onOpenMenu">开始新游戏</div>
    </div>
  </Dialog>

  <Dialog
    type="failure"
    title="挑战失败"
    :visible="game.state === GameState.FAILURE"
  >
    <div>
      <div class="btn btn-dark mt-3" @click="onOpenMenu">开始新游戏</div>
    </div>
  </Dialog>

  <Dialog
    type="help"
    v-model:visible="game.showHelp"
    @click="game.showHelp = false"
  >
    <div class="help-content">
      <div>
        <h3>数独游戏</h3>
        <div>
          <h4>游戏规则</h4>
          <ol>
            <li>
              <b>开始游戏：</b>
              游戏开始时，一些单元格已经被填入数字，这些数字是游戏的提示数字。玩家需要根据这些提示来填写剩余的空白单元格。
            </li>
            <li>
              <b>游戏目标：</b>
              游戏目标是在每个宫、每行和每列中填入数字1到9，确保每个数字在每个宫、每行和每列中只出现一次。
            </li>
            <li><b>答案提示：</b> 每局游戏最多提供<b>3</b>次提示答案机会。</li>
            <li>
              <b>挑战成功：</b> 在成功填写完整所有宫格且正确后，将提示挑战成功。
            </li>
          </ol>
          <h4>游戏功能</h4>
          <ol>
            <li>
              <b>开始新游戏：</b>
              点击后，系统将根据你选择的游戏难度，生成一个全新的数独游戏，包含全新的数字组合，为玩家提供全新的挑战。
              游戏会自动填写所有格子排除行列宫的可能的笔记。
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
</template>
