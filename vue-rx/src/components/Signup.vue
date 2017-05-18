<template>
<passport>
<el-card class="box-card">
    <div slot="header" class="clearfix">
        <span style="line-height: 36px;">注册</span>
    </div>
    <el-form ref="form" :model="form">
        <el-form-item label="用户名">
            <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" :loading="form.isLoading" v-stream:click="submit$">注册</el-button>
            <el-button @click="reset">重置</el-button>
            <el-button type="success">
                <router-link to="/login" tag="span" >登录</router-link>
            </el-button>
        </el-form-item>
    </el-form>
</el-card>
</passport>
</template>

<script>
import Passport from './Passport.vue';

import {
    mapMutations,
    mapState
} from 'vuex';

import {
    SIGNUP_RESET,
    SIGNUP_SUBMIT,
    SIGNUP_REQUESTING,
    SIGNUP_ENABLE,
    COMMON_TIP_ERROR,
    COMMON_TIP_SUCCESS
} from '../store/types';

import {
    Observable
} from 'rxjs/Observable'
import 'rxjs/add/observable/fromPromise';
import {
    signup
} from '../api/passport';
import Rx from 'rxjs/rx';
import R from 'ramda';

export default {
    components: {
        Passport
    },
    computed: {
        ...mapState({
            form: 'signup'
        })
    },
    methods: {
        ...mapMutations({
            reset: SIGNUP_RESET
        })
    },
    domStreams: [`submit$`],
    subscriptions() {
        const commit = this.$store.commit;
        return {
            singup$: this.submit$
                .do(() => commit(SIGNUP_REQUESTING))
                .flatMap(() =>
                    Observable
                    .fromPromise(signup(this.form))
                    .catch(e => {
                        this.$message({
                            message: e.message,
                            type: 'error',
                            duration: 1500,
                            onClose: () => commit(SIGNUP_ENABLE)
                        });
                        return Observable.empty();
                    })
                )
                .do((d) => {
                    // commit(COMMON_TIP_SUCCESS, '注册成功');
                    this.$message({
                        message: '注册成功',
                        type: 'success',
                        duration: 1500,
                        onClose: () => commit(SIGNUP_ENABLE)
                    });
                })
        };
    }
}
</script>
