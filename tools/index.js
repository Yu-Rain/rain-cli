/**
 * 开发工具命令行入口
 * 用法：node tools xxxxx
 * 或者：npm run tools xxxxx
 */
const cmdUtil = require('./cmd-util');

const TOOLS = [
  {cmd: 'new', name: 'create-new-page', desc: '创建新业务功能模块'},
  {cmd: 'scss', name: 'create-global-scss', desc: '生成公共样式引用文件'},
  {cmd: 'open', name: 'create-open-page', desc: '生成业务功能模块引用文件'},
  {cmd: 'api', name: 'merge-api-config', desc: '合并接口配置文件'},
  {cmd: 'mock', name: 'mock-server', desc: '启动接口模拟服务器'},
  {cmd: 'menu', name: 'deploy-config', desc: '配置业务功能模块和主菜单'},
];

//读取命令行参数
let cmd = process.argv[2];
if (cmd) {
  let tool = TOOLS.find(v => v.cmd === cmd);
  if (tool) runTool(tool.name);
  else cmdUtil.error(`未找到 ${cmd} 工具`);
}
else {
  cmdUtil.select('请问您要执行什么操作？', TOOLS.map(v => `${v.desc} [${v.cmd}]`)).then(index => {
    if (index) {
      runTool(TOOLS[index - 1].name);
    }
  });
}

function runTool(name) {
  require('./' + name).apply(this, process.argv.slice(3));
}