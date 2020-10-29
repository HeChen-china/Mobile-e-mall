<template>
<div>
    <van-nav-bar title="用户注册" left-text="返回" left-arrow @click-left="goBack" />
    <div class="register-panel">
        <van-field v-model="userName" lable="用户名" clearable placeholder="请输入用户名" required :error-message="usernameErrorMsg"></van-field>
        <van-field v-model="password" type="password" lable="密码" clearable placeholder="请输入密码" required :error-message="passwordErrorMsg"></van-field>
        <div class="register-button">
            <van-button @click="checkForm()" type="primary" :disabled="closeClick" size="large">注册</van-button>
        </div>
    </div>
</div>
</template>

<script>
import axios from "axios";
import url from "../../serviceAPI.config";
import {
    Toast
} from "vant";
export default {
    data() {
        return {
            userName: "",
            password: "",
            closeClick: false, //防止表单重复提交的控制器
            usernameErrorMsg: "", //当用户名出现错误时的提示信息
            passwordErrorMsg: "", //当用户名出现错误时的提示信息
            isOk: true //用户注册信息验证
        };
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        //提交表单数据
        axiosRegisterUser() {

            axios({
                    url: url.registerUser,
                    method: "post",
                    data: {
                        userName: this.userName,
                        password: this.password,
                    },
                })
                .then((response) => {
                    this.closeClick = false;
                    if (response.data.code == 404) {
                        this.closeClick = true;
                        Toast.fail("用户名重复");
                        setTimeout(() => {
                            this.closeClick = false;
                        }, 2000);
                    }
                    if (response.data.code == 200) {
                        Toast.success("注册成功");
                        this.$router.push("/");
                    }
                })
                .catch((error) => {
                    this.closeClick = true;
                    Toast.fail("注册失败");
                    setTimeout(() => {
                        this.closeClick = false;
                    }, 2000);
                });
        },
        //表单验证方法
        checkForm() {
            if (this.userName.length < 4) {
                this.usernameErrorMsg = "用户名不能小于4位";
            } else if (this.password.length < 4) {
                this.passwordErrorMsg = "密码不能小于4位";
            } else if (/\W/g.test(this.password)) {
                this.passwordErrorMsg = "不能输入除了数字、字母、下划线之外的字符";
            } else {
                this.axiosRegisterUser()
            }
        },
    }
    //git测试
};
</script>

<style scoped>
.register-panel {
    width: 90%;
    border-radius: 5px;
    margin: 20px auto;
    padding-bottom: 20px;
}

.register-button {
    padding-top: 20px;
}
</style>
