(function () {
  'use strict';
  /**
   * 接口适配器
   */
  window.AjaxFilter = class {
    constructor(api, server) {
      //可以获取当前请求的API和服务器配置信息
      // api: {moduleId, id, method, baseUrl, url, serverId, ...}
      this.api = api;
      // server: {baseUrl, codeKey, msgKey, succCode, dataKey, timeoutCode}
      this.server = server;
    }
    async request(data, ajaxOptions) {
      //可以获取要发送的数据，支持异步处理，返回处理后的数据
      try {

      }
      catch (err) {

      }
      return data;
    }
    async response(res, xhr) {
      //可以获取接收到的数据，支持异步处理，返回处理后的数据
      //此方法仅在请求成功返回后才会执行，如果请求发生异常，则不会执行
      return res;
    }
    // bypass() {
    //   //绕过发送请求，直接返回结果数据，不支持异步处理
    //   return data;
    // }
  };

})();