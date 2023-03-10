import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
    key: 'session',
    storage: sessionStorage,
});

export const blockAtom = atom({
    key: 'blockAtom',
    default: '블록 기본값',
    effects_UNSTABLE: [persistAtom],
});

export const transactionAtom = atom({
    key: 'transactionAtom',
    default: '트랜잭션 기본값',
    effects_UNSTABLE: [persistAtom],
});

export const serviceAtom = atom({
    key: 'serviceAtom',
    default: '서비스 기본값',
    effects_UNSTABLE: [persistAtom],
});

export const networkAtom = atom({
    key: 'networkAtom',
    default: '네트워크 기본값',
    effects_UNSTABLE: [persistAtom],
});

export const loginAtom = atom({
    key: 'loginAtom',
    default: null,
    effects_UNSTABLE: [persistAtom],
});

export const userInfoAtom = atom({
    key: 'userInfoAtom',
    default: '',
    effects_UNSTABLE: [persistAtom],
});

export const currentBlockAtom = atom({
    key: 'currentBlockAtom',
    default: '현재 블록',
    effects_UNSTABLE: [persistAtom],
});

export const currentTxAtom = atom({
    key: 'currentTxAtom',
    default: '현재 트랜잭션 번호',
    effects_UNSTABLE: [persistAtom],
});
