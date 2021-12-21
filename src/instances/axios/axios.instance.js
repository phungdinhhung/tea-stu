import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://trung-api-capstone1.herokuapp.com',
})

axiosInstance.interceptors.request.use((config) => {
  let token = localStorage.getItem('token')

  if (!token) {
    alert('You need to login again')
    return config
  }

  token = token.includes('Bearer') ? token : `Bearer ${token}`

  config.headers['Authorization'] = token

  return config
})

export default axiosInstance
