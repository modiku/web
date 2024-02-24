import { defineStore } from 'pinia'

export const useCarStore = defineStore('car', {
    state: (): carList => ({
        productList: [],
        total: 0
    }),
    // 也可以定义为
    // state: () => ({ count: 0 })
    actions: {
        updateTotal() {
            this.total = 0
            this.productList.forEach(item => {
                this.total += item.num * item.price
            })
        }

    },
})


