<template>
  <transition
    name="log"
    v-on:leave="onLeave"
  >
    <div ref="login"
         v-on:mouseenter="onMouseEnter"
         v-on:mouseleave="onMouseLeave"
         class="login"
         v-show="flag">
      <div class="title">欢迎登陆七享</div>
      <div class="logo">
        <img width="210px" :src="require('../common/img/logo.png')" alt="">
      </div>
      <el-form :model="formData" ref="form">
        <el-form-item
          prop="email"
          :rules="[
              { required: true, message: '请输入邮箱地址', trigger: 'blur' },
              { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
             ]"
        >
          <el-input v-model="formData.email" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input type="password" placeholder="密码" v-model="formData.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked">自动登陆</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="but" style="width: 100%" @click="submitForm('form')" size="medium" type="primary">提交
          </el-button>
        </el-form-item>
      </el-form>
      <div class="select">
        <p class="select-item" @click="open_and_close()">立即注册</p>
        <P class="select-item">忘记密码</P>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import { mapActions } from 'vuex'
import { Message } from 'element-ui'
export default {
  data () {
    return {
      formData: {
        email: '',
        pass: '',
        type: 100
      },
      checked: true,
      flag: true
    }
  },
  methods: {
    submitForm (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let info = {
            account: this.formData.email,
            secret: this.formData.pass,
            type: this.formData.type
          }
          this.toLogin(info).then((res) => {
            this.$router.push('/home')
          }).catch((rej) => {
            Message.error('账号或者密码是错误的')
          })
        }
      })
    },
    open_and_close () {
      this.flag = !this.flag
    },
    onLeave (el, done) {
      this.$emit('closeed')
    },
    onMouseEnter () {
      this.$refs.login.style.borderColor = '#1B91F3'
    },
    onMouseLeave () {
      this.$refs.login.style.borderColor = '#E8EAEC'
    },
    ...mapActions([
      'toLogin'
    ])
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .login
    width: 398px
    height: 463.5px
    border-radius: 10px
    border: 1px solid #E8EAEC
    padding: 20px
    display: flex
    flex-direction: column
    z-index :10
    background-color: white

    &.log-enter-active, &.log-leave-active
      transition: all .5s

    &.log-enter, &.log-leave-to
      transform: translateX(130%)
      opacity :0

    .title
      text-align: center
      font-size: 24px
      font-weight: 700

    .logo
      margin-top: 12px
      margin-bottom: 18px
      text-align: center

    .select
      display: flex
      width: 300px
      margin: 0 auto
      justify-content: space-around

      .select-item
        cursor: pointer
        text-align: center
</style>
