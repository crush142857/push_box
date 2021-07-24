/*
 * @Author: your name
 * @Date: 2021-07-23 00:36:45
 * @LastEditTime: 2021-07-23 01:32:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \课程练习\阶段性项目\推箱子\module\ui.js
 */
// 用于将地图显示到界面上
import * as map from "./map.js";
let divContainer = document.getElementById("game");
// 设置每一个小块的宽高
let pieceWidth = 45;
let pieceHeight = 45;
// 设置div的宽高
function setDivContainer() {
  divContainer.style.width = pieceWidth * map.colNumber + "px";
  divContainer.style.height = pieceHeight * map.rowNumber + "px";
}
/**
 * @description: 用于该行该列是否正确
 * @param {*} row
 * @param {*} col
 */
function isCorrect(row, col) {
  for (var i = 0; i < map.correct.length; i++) {
    var point = map.correct[i]; //拿到其中一个正确位置的坐标
    if (point.row === row && point.col === col) {
      return true;
    }
  }
  return false;
  // return map.correct.find((p) => p.row === row && p.col === col) !== undefined;
}
/**
 * @description: 根据行列,创建一个div加入到一个页面中
 * @param {*} row
 * @param {*} col
 */
function setOnePiece(row, col) {
  let value = map.content[row][col]; //取出地图相应位置的值
  let div = document.createElement("div");
  div.className = "item";
  // 调整div的位置
  div.style.left = col * pieceWidth + "px";
  div.style.top = row * pieceHeight + "px";
  // 当前位置是否正确
  let correct = isCorrect(row, col);
  if (value === map.PLAYER) {
    div.classList.add("player");
  } else if (value === map.WALL) {
    div.classList.add("wall");
  } else if (value === map.BOX) {
    // 判断是否是正常状态下的箱子
    if (correct) {
      div.classList.add("correct-box");
    } else {
      div.classList.add("box");
    }
  } else {
    // 空白情况下
    if (correct) {
      div.classList.add("correct");
    } else {
      return; //只是一个空白格子
    }
  }
  // div.style.border = "1px solid #000";
  divContainer.appendChild(div);
}
function setContent() {
  // 清空容器
  divContainer.innerHTML = "";
  // 遍历地图内同,设置元素
  for (let row = 0; row < map.rowNumber; row++) {
    for (let col = 0; col < map.colNumber; col++) {
      setOnePiece(row, col);
    }
  }
}
/**
 * @description: 用于显示地图
 * @param {*}
 * @return {*}
 */
export default function () {
  // 设置div的宽高
  setDivContainer();
  // 显示地图中的内容
  setContent();
}
