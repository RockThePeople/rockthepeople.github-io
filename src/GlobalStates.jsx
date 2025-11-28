import { atom } from 'recoil';

export const stateEN1 = atom({
    key: 'extraNonce1',
    default: ''
})

export const stateAuthFlag = atom({
    key: 'authFlag',
    default: false
})

export const stateSubscribeFlag = atom({
    key: 'subscribeFlag',
    default: false
})