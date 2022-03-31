import axios from "axios"
import { getToken } from "./permission"

const service = axios.create({
	baseURL: 'http://localhost:9000/v1',
	timeout: 500
})

service.interceptors.request.use(
	config => {
		const token = getToken()
		if (token && config.headers) {
			config.headers["Authorization"] = `Bearer ${token}`
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

service.interceptors.response.use(
	response => {
		if (response.status !== 200) {
			return Promise.reject("Response Error")
		}
		return response.data
	},
	error => {
		console.log(`Response Error: ${error}`)
		return Promise.reject(error)
	}
)

export default service
