const baseUrl = process.env.NODE_ENV == 'development' ? 'http://127.0.0.1:3000' : 'http://123.207.152.180:3000/';

const apiConfig = {
	// register: { //获取菜单
	// 	url: '/user/register',
	// 	method: 'POST',
	// 	baseUrl
	// }
	register: { //获取菜单 RESTful api
		url: '/api/game',
		method: 'GET',
		baseUrl
	},
	login: { //用户登陆
		url: '/api/login',
		method: 'POST',
		baseUrl
	}
}

export {
	baseUrl,
	apiConfig
}