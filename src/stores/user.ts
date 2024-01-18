import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            user: {
                name: '',
                password: '',
                number: '',
                authority: 3
            },
            admin: {
                name: '',
                password: '',
                number: '',
                authority: 1
            }
        }
    },
    // 也可以定义为
    // state: () => ({ count: 0 })
    actions: {
        init() {
            this.user = {
                name: '',
                password: '',
                number: '',
                authority: 3
            }
            this.admin = {
                name: '',
                password: '',
                number: '',
                authority: 1
            }
        }

    },
})