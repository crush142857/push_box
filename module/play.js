/*
 * @Author: your name
 * @Date: 2021-07-23 00:37:11
 * @LastEditTime: 2021-07-23 11:39:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \课程练习\阶段性项目\推箱子\module\play.js
 */
import * as map from "./map.js";
/**
 * @description: 得到玩家位置
 */
function getPlayerPoint() {
  for (let row = 0; row < map.rowNumber; row++) {
    for (let col = 0; col < map.colNumber; col++) {
      if (map.content[row][col] === map.PLAYER) {
        return {
          row: row,
          col: col,
        };
      }
    }
  }
  throw new Error("没有玩家");
}
export function playerMove(direction) {
  let playerPoint = getPlayerPoint(); //得到玩家的位置
  let nextInfo = getNextInfo(playerPoint.row, playerPoint.col, direction);
  // 不能移动,下个位置是墙
  if (nextInfo.value === map.WALL) {
    return false;
  }
  // 能移动
  if (nextInfo.value === map.SPACE) {
    exchange(playerPoint, nextInfo); //下一个是空白
    return true;
  } else {
    //   下个位置是箱子
    let nextNextInfo = getNextInfo(nextInfo.row, nextInfo.col, direction);
    if (nextNextInfo.value === map.SPACE) {
      exchange(nextInfo, nextNextInfo);
      exchange(playerPoint, nextInfo);
      return true;
    } else {
      return false;
    }
  }
}
// 让玩家动起来
function exchange(point1, point2) {
  var temp = map.content[point1.row][point1.col];
  map.content[point1.row][point1.col] = map.content[point2.row][point2.col];
  map.content[point2.row][point2.col] = temp;
}
/**
 * @description:
 * @param {*} row
 * @param {*} col
 * @param {*} direction位置
 */
function getNextInfo(row, col, direction) {
  if (direction == "left") {
    return {
      row: row,
      col: col - 1,
      value: map.content[row][col - 1],
    };
  } else if (direction == "right") {
    return {
      row: row,
      col: col + 1,
      value: map.content[row][col + 1],
    };
  } else if (direction == "up") {
    return {
      row: row - 1,
      col: col,
      value: map.content[row - 1][col],
    };
  } else {
    return {
      row: row + 1,
      col: col,
      value: map.content[row + 1][col],
    };
  }
}
/**
 * 根据当前地图内容，判断是否游戏胜利
 */
export function isWin() {
  //是否每个正确位置都有箱子
  for (var i = 0; i < map.correct.length; i++) {
    var point = map.correct[i];
    if (map.content[point.row][point.col] !== map.BOX) {
      //该正确位置上没有箱子
      return false;
    }
  }
  return true;
}
