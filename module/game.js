/*
 * @Author: your name
 * @Date: 2021-07-23 00:36:38
 * @LastEditTime: 2021-07-23 11:37:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \课程练习\阶段性项目\推箱子\module\game.js
 */
import { playerMove, isWin } from "./play.js";
import showUI from "./ui.js";
showUI();
let over = false;
// 注册事件，完成整个游戏
window.onkeydown = function (e) {
  if (over) {
    return;
  }
  let result = false;
  if (e.key === "ArrowUp") {
    result = playerMove("up");
  } else if (e.key === "ArrowDown") {
    result = playerMove("down");
  } else if (e.key === "ArrowLeft") {
    result = playerMove("left");
  } else if (e.key === "ArrowRight") {
    result = playerMove("right");
  }
  if (result) {
    showUI();
    if (isWin()) {
      console.log("游戏胜利");
      over = true;
    }
  }
};
