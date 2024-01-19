import axios from 'axios'

axios.defaults.baseURL = '/api'

export const getUser = (number: string) => axios.get(`/user?number=${number}`).then(res => res.data)

export const getAllUser = () => axios.get('/user/all').then(res => res.data)

export const addUser = (data: User) => axios.post('/user', data).then(res => res.data)

export const updateUser = (data: User) => axios.patch(`/user/${data.number}`, data).then(res => res.data)

export const delUser = (number: string) => axios.delete(`/user/${number}`).then(res => res.data)
