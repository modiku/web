import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: (): myUser => ({
        number: '',
        password: '',
        name: '',
        authority: 3,
        userAvaterUrl: "",
        description: '',
        orders: []
    }),
    // 也可以定义为
    // state: () => ({ count: 0 })
    actions: {
        init() {
            this.number = ''
            this.password = ''
            this.name = ''
            this.authority = 3
            this.userAvaterUrl = ""
            this.description = ''
            this.orders = []
            localStorage.clear()
        }

    },
})

