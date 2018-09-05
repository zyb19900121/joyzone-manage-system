// import {config, errorCode, errorCodeByType, constans} from './config.js'
import { apiConfig } from "./apiConfig.js";
import ajax from "./ajax";
import { Message } from "element-ui";
/*
 所有用户的api
 */
class UserService {
  constructor() {
    // this.tenantId = 1600002912
    // this.authority = process.env.AUTHORITY //是否通过权限拦截
  }
  async getRequest(type, data) {
    // data.tenantId=this.tenantId
    let apiType = apiConfig[type] || {
      url: "",
      method: "POST"
    };
    // let authority = apiType.authority ? false : process.env.AUTHORITY
    try {
      let response = await ajax.get(apiType.url, data, apiType.baseUrl);
      // let response = await ajax(apiType.url, {} ,data, apiType.method, apiType.baseUrl, apiType.authPermission, authority)
      if (response) {
        // response = authority ? this.checkJurisdiction(response, type) : response
        return this.resolve(response, type);
      }
    } catch (e) {
      // Message({
      //   message: "系统错误，请联系开发人员",
      //   type: "error"
      // });
      return Promise.reject(e); // 所有的错误从这返回调用者的catch
    }
  }
  async postRequest(type, data) {
    let apiType = apiConfig[type];
    let url = apiType.url;
    let urlData = "";
    // let authority = apiType.authority ? false : process.env.AUTHORITY
    try {
      let response = await ajax.post(apiType.url, data, apiType.baseUrl);
      // let response = await ajax.post(url, urlData, data, apiType.method, apiType.baseUrl, apiType.authPermission, authority)
      if (response) {
        // response = authority ? this.checkJurisdiction(response, type) : response
        return this.resolve(response, type);
      }
    } catch (e) {
      // Message({
      //   message: "系统错误，请联系开发人员",
      //   type: "error"
      // });
      return Promise.reject(e); // 所有的错误从这返回调用者的catch
    }
	}
	
	async uploadRequest(type, data) {
    // data.tenantId=this.tenantId
    let apiType = apiConfig[type];
    // let authority = apiType.authority ? false : process.env.AUTHORITY
    try {
      let response = await ajax.upload(apiType.url, data, apiType.baseUrl);
      // let response = await ajax(apiType.url, {} ,data, apiType.method, apiType.baseUrl, apiType.authPermission, authority)
      if (response) {
        // response = authority ? this.checkJurisdiction(response, type) : response
        return this.resolve(response, type);
      }
    } catch (e) {
      // Message({
      //   message: "系统错误，请联系开发人员",
      //   type: "error"
      // });
      return Promise.reject(e); // 所有的错误从这返回调用者的catch
    }
  }

  async deleteRequest(type, data) {
    // data.tenantId=this.tenantId
    let apiType = apiConfig[type] || {
      url: "",
      method: "POST"
    };
    // let authority = apiType.authority ? false : process.env.AUTHORITY
    try {
      let response = await ajax.delete(apiType.url, data, apiType.baseUrl);
      // let response = await ajax(apiType.url, {} ,data, apiType.method, apiType.baseUrl, apiType.authPermission, authority)
      if (response) {
        // response = authority ? this.checkJurisdiction(response, type) : response
        return this.resolve(response, type);
      }
    } catch (e) {
      // Message({
      //   message: "系统错误，请联系开发人员",
      //   type: "error"
      // });
      return Promise.reject(e); // 所有的错误从这返回调用者的catch
    }
  }
  resolve(response, type) {
    let { data, status } = response;
    data = data.constructor == String ? JSON.parse(data) : data;
    let sErrorCode = data.status || response.status;
    let oResponseData = {
      data,
      status
    };
    // let oResponseData = oData.data==undefined ? oData : oData.data
    // let errMsg = ((errorCodeByType[type] && errorCodeByType[type][sErrorCode]) || errorCode[sErrorCode] || errorCode[constans['DEFAULT_CODE']])['message']
    // let nextName = 'index' // Vue.$route.meta.nextName
    // return constans['RIGHT_CODE'].includes(sErrorCode) ? oResponseData : (sErrorCode === constans['REQUIRE_LOGIN'] ? Vue.$router.push({'name': nextName}) : Promise.reject(errMsg))
    return oResponseData;
  }
  // checkJurisdiction (response) {
  //   let oData = response.data
  //   let status = oData.status
  //   if(status == constans['REQUIRE_LOGIN']){// 没有权限则跳转
  //     let currentUrl = window.location.href
  //     let location = `${oData.location}${encodeURIComponent('&backurl='+currentUrl)}`
  //     window.location.href = location
  //   } else if(status == constans['JURIS_CODE']) {// 有权限
  //     return oData
  //   }
  // }
}
export default new UserService();
