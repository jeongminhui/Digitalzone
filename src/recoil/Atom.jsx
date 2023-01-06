import {atom} from "recoil";
import {recoilPersist} from "recoil-persist";
const {persistAtom} = recoilPersist({
    key: 'session',
    storage: sessionStorage
});
export const loginAtom = atom({
    key: "loginState",
    default:"default",
    effects_UNSTABLE: [persistAtom],
});

export const BlockAtom = atom({
    key: "BlockState",
    default:"default",
    effects_UNSTABLE: [persistAtom],
});