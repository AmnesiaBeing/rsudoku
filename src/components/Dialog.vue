<script setup>
import { computed, inject } from "vue";

const sudoku = inject("sudoku");
const game = inject("game");
const wrapperDom = inject("wrapperDom");

const props = defineProps({
  type: String,
  title: String,
  visible: Boolean,
  showClose: Boolean,
  showReplay: Boolean,
  showQuit: Boolean,
  showInfo: Boolean,
  showScreenshot: Boolean,
});

const classes = computed(() => {
  return `dialog-bg-${props.type}`;
});

const emit = defineEmits(["update:visible", "onReplay"]);

// 关闭消息框
function onClose(event) {
  emit("update:visible", event.target.value);
}

// 保存游戏截图
function onScreenshot() {
  html2canvas(wrapperDom.value, {
    scale: 4,
    dpi: 300,
    backgroundColor: "#f8fafc",
  }).then((canvas) => {
    Screenshot(canvas.toDataURL("image/png")).then((ret) => {
      if (ret) {
        alert("保存成功");
      }
    });
  });
}

// 重新挑战
function onReplay() {
  game.replay();
  game.start();
  sudoku.showMenu = false;
  emit("onReplay");
}

// 退出游戏
function onQuit() {
  sudoku.quit();
}
</script>

<template>
  <div class="dialog" :class="classes" v-if="props.visible">
    <div class="dialog-main">
      <div class="dialog-content">
        <h2 v-if="props.title">{{ props.title }}</h2>
        <slot></slot>
      </div>

      <div class="btn btn-close" @click="onClose" v-if="props.showClose">
        <img src="../assets/icons/close.svg" />
      </div>

      <div class="btn btn-replay" @click="onReplay" v-if="props.showReplay">
        <i><img src="../assets/icons/replay.svg" /></i> 重新挑战
      </div>

      <div class="btn btn-quit" @click="onQuit" v-if="props.showQuit">
        <i><img src="../assets/icons/quit.svg" /></i> 退出游戏
      </div>

      <div
        class="btn btn-screenshot"
        @click="onScreenshot"
        v-if="props.showScreenshot"
      >
        <i><img src="../assets/icons/screenshot.svg" /></i> 保存截图
      </div>

      <div class="development-info" v-if="props.showInfo">
        <div class="stack">
          <label>Stack: </label>
          <span>Golang(1.22) Wails(2.8) Vue3</span>
        </div>
        <div class="build">
          <label>Version: </label>
          <span>{{ sudoku.version }} ({{ sudoku.env.buildType }})</span>
        </div>
        <div class="developer">
          <label>Developer: </label>
          <span
            >Fakis [
            <a href="mailto:fakis738@qq.com">fakis738@qq.com</a> ]</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
