import { loginState } from './loginState'
import { selector } from 'recoil'

export const loginSelector = selector({
    key: 'loginSelector',
    get: ({get}) => {
        const loginUser = get(loginState)
        return loginUser;
    },
})