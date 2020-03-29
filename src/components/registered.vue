<template>
  <transition
    name="reg"
    v-on:leave="onLeave"
  >
    <div class="regisiter"
         ref="reg"
         v-on:mouseenter="onMouseEnter"
         v-on:mouseleave="onMouseLeave"
         v-if="flag"
    >
      <i class="el-icon-arrow-left" @click="open_and_close"></i>
      <div class="title">用户注册</div>
      <div class="logo">
        <img width="210px" :src="require('../common/img/logo.png')" alt="">
      </div>
      <el-form class="form" :model="formData" ref="formData" :rules="rules">
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
        <el-form-item prop="checkPass">
          <el-input type="password" placeholder="确认密码" v-model="formData.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-col :span="6">
            <el-input v-model="formData.building" placeholder="幢"></el-input>
          </el-col>
          <el-col :span="1">——</el-col>
          <el-col :span="6">
            <el-input placeholder="单元" v-model="formData.unit" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="1">——</el-col>
          <el-col :span="6">
            <el-input placeholder="房" v-model="formData.room" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button class="but" style="width: 100%" @click="submitForm('formData')" size="medium" type="primary">提交
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import { registers } from '../api/client'
import { Message } from 'element-ui'
export default {
  data () {
    return {
      formData: {
        email: '',
        pass: '',
        checkpass: '',
        nickname: '',
        building: '',
        unit: '',
        room: ''
      },
      checked: true,
      flag: false,
      rules: {
        pass: [
          { validator: this.validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: this.validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    validatePass (rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.formData.checkPass !== '') {
          this.$refs.formData.validateField('checkPass')
        }
        callback()
      }
    },
    validatePass2 (rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formData.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    },
    submitForm (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          registers(this.formData.email, this.formData.pass, 100, this.formData.building, this.formData.unit, this.formData.room).then(() => {
            Message({
              message: '注册成功，请重新登录',
              type: 'success',
              duration: 5000
            })
            this.open_and_close()
          }).catch((e) => {
            this.$router.push('/welcome')
            Message.error('这账号有人已经注册了')
          })
        }
      })
    },
    open_and_close () {
      this.flag = !this.flag
    },
    onLeave (el, done) {
      this.$emit('close')
    },
    onMouseEnter () {
      this.$refs.reg.style.borderColor = '#1B91F3'
    },
    onMouseLeave () {
      this.$refs.reg.style.borderColor = '#E8EAEC'
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .regisiter
    width: 398px
    border-radius: 10px
    border: 1px solid #E8EAEC
    padding: 20px
    display: flex
    flex-direction: column
    background-color: white
    z-index: 5

    &.reg-enter-active, &.reg-leave-active
      transition: all .5s

    &.reg-enter, &.reg-leave-to
      transform: translateX(130%)
      opacity: 0

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
