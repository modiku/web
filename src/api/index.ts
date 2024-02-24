import axios from 'axios'

axios.defaults.baseURL = '/api'


// user的api

export const getUser = (number: string) => axios.get(`/user?number=${number}`).then(res => res.data)

export const getAllUser = () => axios.get('/user/all').then(res => res.data)

export const addUser = (data: User) => axios.post('/user', data).then(res => res.data)

export const updateUser = (data: myUser) => axios.patch(`/user/${data.number}`, data).then(res => res.data)

export const delUser = (number: string) => axios.delete(`/user/${number}`).then(res => res.data)


//product的api
export const getAllProduct = () => axios.get('/product/all').then(res => res.data)

export const getProduct = (id: string) => axios.get(`/product?id=${id}`).then(res => res.data)

export const searchProduct = (query: Query) => axios.get('/product', { params: query }).then(res => res.data)


export const addProduct = (data: myProduct) => axios.post('/product', data).then(res => res.data)

export const updateProduct = (data: myProduct) => axios.patch(`/product/${data.id}`, data).then(res => res.data)

export const delProduct = (id: string) => axios.delete(`/product/${id}`).then(res => res.data)

//order的api

export const addOrder = (data: myOrder) => axios.post('/order', data).then(res => res.data)

export const findOneOrder = (orderId: string) => axios.get(`/order?id=${orderId}`).then(res => res.data)

export const addCarProduct = (data:myCarProduct) => axios.post('/carproduct', data).then(res => res.data)

export const findOneCarProduct = (id: string) => axios.get(`/carproduct?id=${id}`).then(res => res.data)

export const payOrder = (id: string) => axios.patch(`/order/${id}`).then(res=>res.data)

export const delOrder = (id: string) => axios.delete(`/order/${id}`).then(res => res.data)

export const findOrderByUser = (id: string) => axios.get(`/order/user?userid=${id}`).then(res=>res.data)

export const getAllOrder = () => axios.get('/order/all').then(res => res.data)

//upload

export const uploadCustomization = (file:any) => axios.post('/upload/product/customization',file).then(res=>res.data)