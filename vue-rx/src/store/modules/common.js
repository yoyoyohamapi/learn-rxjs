import {
    COMMON_TIP_ERROR,
    COMMON_TIP_SUCCESS,
    COMMON_TIP_HIDE
} from '../types';

import R from 'ramda';

const initialState = () => ({
    tip: {
        message: '',
        visible: false,
        type: ''
    }
});

export default {
    state: initialState(),
    mutations: {
        [COMMON_TIP_ERROR](state, message) {
            state.tip = {
                ...state.tip,
                visible: true,
                message,
                type: 'error'
            }
        },
        [COMMON_TIP_SUCCESS](state, message) {
            state.tip = {
                ...state.tip,
                visible: true,
                message,
                type: 'succcess'
            }
        },
        [COMMON_TIP_HIDE](state) {
            state.tip = {
                ...initialState()
            }
        }
    }
};
