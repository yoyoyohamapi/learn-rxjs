import {
    SIGNUP_SUBMIT,
    SIGNUP_RESET,
    SIGNUP_REQUESTING,
    SIGNUP_ENABLE
} from '../types';


const initialState = () => ({
    username: '',
    password: '',
    isLoading: false
});

export default {
    state: initialState(),
    mutations: {
        [SIGNUP_RESET](state) {
            Object.assign(state, initialState());
        },
        [SIGNUP_REQUESTING](state) {
            state.isLoading = true;
        },
        [SIGNUP_ENABLE](state) {
            state.isLoading = false;
        }
    }
};
