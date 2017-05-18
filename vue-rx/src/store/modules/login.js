import {
    LOGIN_SUBMIT,
    LOGIN_RESET,
    LOGIN_REQUESTING,
    LOGIN_ENABLE
} from '../types';


const initialState = () => ({
    username: '',
    password: '',
    isLoading: false
});

export default {
    state: initialState(),
    mutations: {
        [LOGIN_RESET](state) {
            Object.assign(state, initialState());
        },
        [LOGIN_REQUESTING](state) {
            state.isLoading = true;
        },
        [LOGIN_ENABLE](state) {
            state.isLoading = false;
        }
    }
};
