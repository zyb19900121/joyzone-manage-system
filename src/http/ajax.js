import axios from "axios";
import qs from "qs";
import router from "src/router";
import { Message } from "element-ui";

//是否携带cookie
// axios.defaults.withCredentials = true
//设置默认请求头
axios.defaults.headers = {
  "X-Requested-With": "XMLHttpRequest"
};

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem("MY_GAME_TOKEN");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    localStorage.removeItem("MY_GAME_TOKEN");
    localStorage.removeItem("USER_INFO");
    if (error.response.status === 403) {
      let msg = error.response.data.msg || "您的登录信息已失效，请重新登录";
      Message({
        message: msg,
        type: "error"
      });
      router.push("/login");
    } else if (error.response.status === 401) {
      let msg = "请您先登录再进行操作";
      Message({
        message: msg,
        type: "error"
      });
      router.push("/login");
    } else {
      Message({
        message: "系统错误，请联系开发人员",
        type: "error"
      });
    }

    return Promise.reject(error);
  }
);

// function checkStatus(response) {
// 	// NProgress.done()
// 	if (response.status === 200 || response.status === 304) {
// 		return response
// 	}
// 	return {
// 		data: {
// 			code: -404,
// 			message: response.statusText,
// 			data: response.statusText,
// 		}
// 	}
// }

// function checkCode(res) {
// 	if (res.data.code !== 200) {
// 		alert(res.data.message)
// 	}
// 	return res
// }

export default {
  get(url, params, baseURL) {
    let config = {
      method: "get",
      url,
      baseURL: baseURL,
      params,
      timeout: 30000,
      responseType: "json"
    };
    return axios.get(url, config);
  },
  getRestful(url, params, baseURL) {
    let config = {
      method: "get",
      url,
      baseURL: baseURL,
      // params,
      timeout: 30000,
      responseType: "json"
    };
    return axios.get(`${url}/${params}`, config);
  },
  post(url, data, baseURL) {
    let config = {
      method: "post",
      url,
      baseURL: baseURL,
      data: qs.stringify(data),
      timeout: 30000,
      responseType: "json",
      headers: { "Content-Type": "application/json; charset=UTF-8" }
    };
    return axios.post(url, data, config);
  },

  put(url, param, data, baseURL) {
    let config = {
      method: "put",
      url,
      baseURL: baseURL,
      data: qs.stringify(data),
      timeout: 30000,
      responseType: "json",
      headers: { "Content-Type": "application/json; charset=UTF-8" }
    };
    return axios.put(`${url}/${param}`, data, config);
  },

  //对Restful api做了相应调整， url/1,2,3,4,5
  delete(url, params, baseURL) {
    let config = {
      method: "delete",
      url,
      baseURL: baseURL,
      timeout: 30000,
      responseType: "json"
    };
    return axios.delete(`${url}/${params}`, config);
  },

  upload(url, data, baseURL) {
    let param = new FormData(); //创建form对象
    if (data.type) {
      param.append("type", data.type);
    }
    param.append("file", data.file); //通过append向form对象添加数据

    let config = {
      method: "post",
      url,
      baseURL: baseURL,
      // data: qs.stringify(data),
      timeout: 30000,
      responseType: "json",
      headers: { "Content-Type": "multipart/form-data" }
    };
    return axios.post(url, param, config);
  }
};
