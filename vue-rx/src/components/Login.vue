<template>
    <passport>
<el-card class="box-card">
    <div slot="header" class="clearfix">
        <span style="line-height: 36px;">登录</span>
    </div>
    <el-form ref="form" :model="form">
        <el-form-item label="用户名">
            <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" :loading="form.isLoading" v-stream:click="submit$">登录</el-button>
            <el-button @click="reset">重置</el-button>
            <el-button type="success">
                <router-link to="/signup" tag="span" >注册账号</router-link>
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
    LOGIN_RESET,
    LOGIN_SUBMIT,
    LOGIN_REQUESTING,
    LOGIN_ENABLE,
    COMMON_TIP_ERROR,
    COMMON_TIP_SUCCESS
} from '../store/types';

import {
    Observable
} from 'rxjs/Observable'
import 'rxjs/add/observable/fromPromise';
import {
    login
} from '../api/passport';
import Rx from 'rxjs/rx';
import R from 'ramda';

export default {
    components: {
        Passport
    },
    computed: {
        ...mapState({
            form: 'login'
        })
    },
    methods: {
        ...mapMutations({
            reset: LOGIN_RESET
        })
    },
    domStreams: [`submit$`],
    subscriptions() {
        const commit = this.$store.commit;
        return {
            login$: this.submit$
                .do(() => commit(LOGIN_REQUESTING))
                .flatMap(() =>
                    Observable
                    .fromPromise(login(this.form))
                    .catch(e => {
                        // commit(COMMON_TIP_ERROR, e.message);
                        this.$message({
                            message: e.message,
                            type: 'error',
                            duration: 1500,
                            onClose: () => commit(LOGIN_ENABLE)
                        });
                        return Observable.empty();
                    })
                )
                .do((d) => {
                    // commit(COMMON_TIP_SUCCESS, '登陆成功');
                    this.$message({
                        message: '登录成功',
                        type: 'success',
                        duration: 1500,
                        onClose: () => commit(LOGIN_ENABLE)
                    });
                })
        };
    }
}
</script>
