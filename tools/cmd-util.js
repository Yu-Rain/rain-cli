/**
 * 命令行会话工具
 */
const readline = require('readline');
const {red, green, blue, yellow, gray} = require('chalk');

//创建命令行读写接口实例
function getReadLineInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

module.exports = {
  /**
   * 回答问题
   * @param {String} message 提示信息 
   */
  question(message) {
    return new Promise(resolve => {
      let rl = getReadLineInterface();
      rl.question(blue(message + '：'), answer => {
        rl.close();
        resolve(answer.trim());
      });
    });
  },
  /**
   * 选择选项
   * @param {String} message 提示信息
   * @param {String[]} options 选项
   * @param {Boolean} cancel 是否显示取消选项
   */
  select(message, options, cancel = true) {
    return new Promise(resolve => {
      //选项列表
      let optionList = options.map((v, i) => ` ${yellow(i + 1)}. ${v}`).join('\n'); 
      if (cancel) optionList += '\n ' + yellow(0) + '. 取消';

      let rl = getReadLineInterface();
      rl.question(`${blue(message)}\n${green(optionList)}\n${yellow('请按数字键后回车...')}`, answer => {
        rl.close();
        let index = parseInt(answer);
        if (!isNaN(index) && index > 0 && index <= options.length) {
          console.info('');
          resolve(index);
        }
        else {
          resolve(0);
        }
      });
    });
  },
  /**
   * 输出提示信息
   */
  info(...message) {
    console.info(...message);
  },
  /**
   * 输出警告信息
   */
  warn(...message) {
    console.warn(yellow(...message));
  },
  /**
   * 输出错误信息
   */
  error(...message) {
    console.error(red(...message));
  },
  /**
   * 输出数据记录
   */
  list(...message) {
    console.info(gray(...message));
  },
};