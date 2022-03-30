import request from "../utils/request"

export function login(data: any) {
	return request({
		url: '/user/login',
		method: 'POST',
		data
	})
}

export function getInfo() {
	return request({
		url: '/user/info',
		method: 'get'
	})
}
