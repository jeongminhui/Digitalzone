import { loginAtom } from './Atom';
import { selector } from 'recoil';

export const loginSelector = selector({
    key: 'loginSelector',
    get: ({ get }) => {
        const loginUser = get(loginAtom);
        return loginUser;
    },
});
