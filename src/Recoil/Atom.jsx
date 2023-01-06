import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist({
    key: 'session',
    storage: sessionStorage,
});

export const loginAtom = atom({
    key: 'loginAtom',
    default: '',
    effects_UNSTABLE: [persistAtom],
});
