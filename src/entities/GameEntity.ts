// 整个数独游戏的实体类型

import { GameState, Difficulty } from "../enum";

let timerInterval: number | null = null;

export const GameEntity = {
  state: GameState.PENDING,
  timer: 0,
  board: {},
  difficulty: Difficulty.EASY,
  prompted: 0,
  maxPrompts: 3,

  init() {
    this.stopTime();
    this.state = GameState.PENDING;
    this.timer = this.prompted = 0;
    
    // TODO: generate a board from Rust
  },

  loading() {
    this.state = GameState.LOADING;
    this.stopTime();
  },

  start() {
    this.state = GameState.STARTED;
    this.startTime();
  },

  pause() {
    if (this.state === GameState.STARTED) {
      this.state = GameState.PAUSED;
      this.stopTime();
    }
  },

  prompt() {
    if (this.prompted < this.maxPrompts) {
      // TODO: get prompted from Rust
      this.prompted++;
    }
  },

  // 挑战失败
  failure() {
    this.state = GameState.FAILURE;
    this.stopTime();
  },

  // 挑战成功
  successful() {
    this.state = GameState.SUCCESS;
    this.stopTime();
  },

  async newGame() {
    this.init();
    this.loading();

    // let res = await Generate({ difficulty: options.difficulty });
    // this.board.solution = res.solution;
    // this.board.subject = res.subject;

    this.start();
  },

  startTime() {
    if (timerInterval == null) {
      timerInterval = setInterval(() => this.timer++, 1000);
    }
  },

  stopTime() {
    if (timerInterval != null) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  },
};
