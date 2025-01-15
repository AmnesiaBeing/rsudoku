// 整个数独游戏的实体类型

import { GameState, Difficulty } from "../enum";
import { Base64 } from "js-base64";

let timerInterval: number | null = null;

const STORAGE_ARCHIVE_KEY = "sudoku-archive";

class archiveGame {
  timer: number = 0;
  board: any;
  difficulty: Difficulty = Difficulty.HARD;
  prompted: number = 0;
  maxPrompts: number = 3;
}

export class GameEntity {
  state: GameState;
  timer: number;
  board: any;
  difficulty: Difficulty;
  prompted: number;
  maxPrompts: number;

  version: string = "0.0.1";
  showMenu: boolean = false;
  showHelp: boolean = false;

  constructor() {
    // 如果有上次未完成的游戏，尽量显示出之前完成的内容，保留之前的难度设置
    let storage_archive_key = localStorage.getItem(STORAGE_ARCHIVE_KEY);
    if (storage_archive_key != null) {
      let archive: archiveGame = JSON.parse(Base64.decode(storage_archive_key));

      this.state = GameState.PAUSED;
      this.timer = archive.timer;
      this.board = archive.board;
      this.difficulty = archive.difficulty;
      this.prompted = archive.prompted;
      this.maxPrompts = archive.maxPrompts;
    } else {
      this.state = GameState.PENDING;
      this.timer = 0;
      this.board = {};
      this.difficulty = Difficulty.HARD;
      this.prompted = 0;
      this.maxPrompts = 3;
    }
  }

  init() {
    this.stopTime();
    this.state = GameState.PENDING;
    this.timer = this.prompted = 0;
  }

  loading() {
    this.state = GameState.LOADING;
    this.stopTime();
  }

  start() {
    this.state = GameState.STARTED;
    this.startTime();
  }

  pause() {
    if (this.state === GameState.STARTED) {
      this.state = GameState.PAUSED;
      this.stopTime();
    }
  }

  prompt() {
    if (this.prompted < this.maxPrompts) {
      // TODO: get prompted from Rust
      this.prompted++;
    }
  }

  // 挑战失败
  failure() {
    this.state = GameState.FAILURE;
    this.stopTime();
  }

  // 挑战成功
  successful() {
    this.state = GameState.SUCCESS;
    this.stopTime();
  }

  async newGame() {
    this.init();
    this.loading();

    // let res = await Generate({ difficulty: options.difficulty });
    // this.board.solution = res.solution;
    // this.board.subject = res.subject;

    this.start();
  }

  startTime() {
    if (timerInterval == null) {
      timerInterval = setInterval(() => this.timer++, 1000);
    }
  }

  stopTime() {
    if (timerInterval != null) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  // 设置游戏存档数据
  saveArchive() {
    let archive: archiveGame = {
      timer: this.timer,
      board: this.board,
      difficulty: this.difficulty,
      prompted: this.prompted,
      maxPrompts: this.maxPrompts,
    };
    localStorage.setItem(
      STORAGE_ARCHIVE_KEY,
      Base64.encode(JSON.stringify(archive))
    );
  }

  // 删除游戏存档数据
  removeArchive() {
    if (localStorage.getItem(STORAGE_ARCHIVE_KEY) !== null) {
      localStorage.removeItem(STORAGE_ARCHIVE_KEY);
    }
  }
}
