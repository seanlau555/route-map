import axios from 'axios'
const API_ROOT = process.env.REACT_APP_ROOT_API
const ROUTE_API = API_ROOT + 'route'

const postRoute = params => {
  const axiosInstance = axios.create({
    timeout: 10000
  })
  return axiosInstance.post(ROUTE_API, params)
}

const getRoute = token => {
  const axiosInstance = axios.create({
    timeout: 10000
  })
  return axiosInstance.get(`${ROUTE_API}/${token}`)
}

export const appApi = {
  postRoute,
  getRoute
}
