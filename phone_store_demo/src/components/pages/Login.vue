<template>
<div>
    <van-nav-bar title="用户登录" left-text="返回" left-arrow @click-left="goBack" />
    <div class="register-panel">
        <van-field v-model="userName" lable="用户名" clearable placeholder="请输入用户名" required :error-message="usernameErrorMsg"></van-field>
        <van-field v-model="password" type="password" lable="密码" clearable placeholder="请输入密码" required :error-message="passwordErrorMsg"></van-field>
        <div class="register-button">
            <van-button @click="checkForm()" type="primary" :disabled="closeClick" size="large">登录</van-button>
        </div>
    </div>
</div>
</template>

<script>
import axios from "axios";
import url from "../../serviceAPI.config";
//消息提示信息插件
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
            isOK: true, //用户注册信息验证
        };
    },
    created() {
        //记录用户登录用户名
        this.userName = localStorage.getItem("userInfo-userName");
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        //提交表单数据
        axiosLoginUser() {
            axios({
                    url: url.login,
                    method: "post",
                    data: {
                        userName: this.userName,
                        password: this.password,
                    },
                })
                .then((response) => {
                    if (
                        response.data.code == 200 &&
                        response.data.message.toString() == "true"
                    ) {
                        Toast.success("登录成功");
                        //新建Promise对象实现用户名永久保存
                        new Promise((resolve, reject) => {
                            localStorage.setItem("userInfo-userName", this.userName)
                            // localStorage.userInfo = { userName: this.userName };
                            setTimeout(() => {
                                resolve();
                            }, 500);
                        }).then(() => {
                            this.$router.push("/");
                        }).catch((err) => {
                            Toast.fail("Storage error,保存用户状态失败")
                        })
                    } else {
                        response.data.message.toString() == "false" ?
                            Toast.fail("密码错误") :
                            Toast.fail("用户名错误");
                        this.closeClick = true;
                        setTimeout(() => {
                            this.closeClick = false;
                        }, 2000);
                    }
                })
                .catch((error) => {
                    Toast.fail("服务器维护中");
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
                this.axiosLoginUser()
            }
        },
    }
    //一段普通的注释
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
