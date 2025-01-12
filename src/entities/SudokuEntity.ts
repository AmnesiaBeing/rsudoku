import { GameEntity } from "./GameEntity";
// import { BoardEntity } from "./entities/BoardEntity.js";
import { Base64 } from "js-base64";

const STORAGE_OPTIONS_KEY = "sudoku-options";
const STORAGE_ARCHIVE_KEY = "sudoku-archive";

const SudokuEntity = {
  version: "1.0.2",
  env: {},
  levels: [],
  showMenu: false,
  showHelp: false,

  // 初始化
  async init() {
    // 载入环境变量
    this.env = await window.runtime.Environment();
    this.levels = await Levels();
  },

  game() {
    let game = Object.assign({}, GameEntity, { board: createBoard() });
    game.init();
    return game;
  },

  // 进入游戏
  enter(game: Object, options = {}) {
    // 载入游戏存档
    let storage_archive_key = localStorage.getItem(STORAGE_ARCHIVE_KEY);
    if (storage_archive_key != null) {
      let archive = JSON.parse(Base64.decode(storage_archive_key));
      let archiveBoard = archive.board;
      delete archive.board;

      game.init();
      game.loading();

      game = Object.assign(game, archive);
      game.board = Object.assign(game.board, archiveBoard);

      game.start();
    } else {
      game.new(options);
    }
  },

  // 设置游戏存档数据
  saveArchive(game) {
    if (typeof game === "object") {
      localStorage.setItem(
        STORAGE_ARCHIVE_KEY,
        Base64.encode(JSON.stringify(game))
      );
    }
  },

  // 删除游戏存档数据
  removeArchive() {
    if (localStorage.getItem(STORAGE_ARCHIVE_KEY) !== null) {
      localStorage.removeItem(STORAGE_ARCHIVE_KEY);
    }
  },

  // 返回游戏选项
  getOptions() {
    let options = {};
    if (localStorage.getItem(STORAGE_OPTIONS_KEY) !== null) {
      options = JSON.parse(localStorage.getItem(STORAGE_OPTIONS_KEY));
    }
    return Object.assign({}, OptionEntity, options);
  },

  // 设置游戏选项
  setOptions(options) {
    if (typeof options === "object") {
      localStorage.setItem(STORAGE_OPTIONS_KEY, JSON.stringify(options));
    }
  },

  // 打印调试日志
  log(...msg) {
    if (this.env.buildType === "dev") {
      console.log(...msg, this);
    }
  },

  // 退出游戏
  quit() {
    window.runtime.Quit();
  },
};

const createBoard = () => {
  let board = Object.assign({}, BoardEntity);
  board.init();
  return board;
};

export const Sudoku = () => {
  return Object.assign({}, SudokuEntity);
};
