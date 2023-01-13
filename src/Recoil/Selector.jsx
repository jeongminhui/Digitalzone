import { blockAtom } from "./Atom";
import { transactionAtom } from "./Atom";
import { serviceAtom } from "./Atom";
import { networkAtom } from "./Atom";
import { currentBlockAtom } from "./Atom";
import { currentTxAtom } from "./Atom";
import { loginAtom } from './Atom';
import { selector } from "recoil";

export const blockSelector = selector({
  key: "blockSelector",
  get: ({ get }) => {
    const block = get(blockAtom);
    return block;
  },
});

export const transactionSelector = selector({
  key: "transactionSelector",
  get: ({ get }) => {
    const transaction = get(transactionAtom);
    return transaction;
  },
});

export const networkSelector = selector({
  key: "networkSelector",
  get: ({ get }) => {
    const network = get(networkAtom);
    return network;
  },
});

export const serviceSelector = selector({
  key: "serviceSelector",
  get: ({ get }) => {
    const service = get(serviceAtom);
    return service;
  },
});

export const currentBlockSelector = selector({
  key: "currentBlockSelector",
  get: ({ get }) => {
    const currentBlock = get(currentBlockAtom);
    return currentBlock;
  },
});

export const currentTxSelector = selector({
  key: "currentTxSelector",
  get: ({ get }) => {
    const currentTx = get(currentTxAtom);
    return currentTx;
  },
});

export const loginSelector = selector({
    key: 'loginSelector',
    get: ({ get }) => {
        const loginUser = get(loginAtom);
        return loginUser;
    },
});

