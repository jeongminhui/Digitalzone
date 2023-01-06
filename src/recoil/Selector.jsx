import { BlockAtom, loginAtom } from './Atom'
import { selector } from 'recoil'

export const loginSelector = selector({
    key: 'loginSelector',
    get: ({get}) => {
        const loginUser = get(loginAtom)
        return loginUser;
    },
})

export const BlockSelector = selector({
    key: 'BlockSelector',
    get: ({get}) => {
        const BlockUser = get(BlockAtom)
        return BlockUser;
    },
})