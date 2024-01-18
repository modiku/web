import axios from 'axios'

axios.defaults.baseURL ='/api'

export const getUser = (number:string) => axios.get(`/user?number=${number}`).then(res => res.data)
