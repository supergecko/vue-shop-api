<template>
  <div class="login v2">
    <div class="wrapper">
      <div class="dialog dialog-shadow" style="display: block; margin-top: -362px;">
        <div class="title" v-if="loginPage">
          <h4>使用 THUNDERCAT ID 登录官网</h4></div>
        <div v-if="loginPage" class="content">
          <ul class="common-form">
            <li class="username border-1p">
              <div class="input">
                <input type="text" v-model="ruleForm.userName" placeholder="账号">
              </div>
            </li>
            <li>
              <div class="input">
                <input type="password" v-model="ruleForm.userPwd" @keyup.enter="login" placeholder="密码">
              </div>
            </li>
            <li style="text-align: right" class="pr">
              <span class="pa" style="top: 0;left: 0;color: #d44d44">{{ruleForm.errMsg}}</span>
              <a href="javascript:;" style="padding: 0 5px" @click="loginPage = false">注册 THUNDERCAT ID</a>
            </li>
          </ul>
          <!--登陆-->
          <div>
            <y-button text="登陆" :classStyle="isLoginOk" @btnClick="login" class="btn"></y-button>
          </div>
        </div>
        <div class="registered" v-else>
          <h4>注册 THUNDERCAT ID</h4>
          <div class="content" style="margin-top: 20px;">

            <el-form :model="registered" status-icon :rules="rules" ref="registered" label-width="100px" class="demo-registered">
              <el-form-item label="手机号" prop="mobile">
                <el-input placeholder="请输入手机号" v-model="registered.mobile" autocomplete="off">
                  <template slot="prepend">+ 86</template>
                </el-input>
              </el-form-item>

              <el-form-item label="验证码" prop="verificationCode">
                <el-input v-model="registered.verificationCode" placeholder="请输入验证码" style="width:150px;" autocomplete="off"></el-input>
                <el-button type="info" style="float: right;width: 70px" @click="sendCode" :disabled="sendCodeFlag === true">{{sendCodeText}}</el-button>
              </el-form-item>

              <el-form-item label="密码" prop="userPwd">
                <el-input type="password" v-model="registered.userPwd" autocomplete="off" placeholder="请输入密码"></el-input>
              </el-form-item>

              <el-form-item label="确认密码" prop="userPwd2">
                <el-input type="password" v-model="registered.userPwd2" autocomplete="off" placeholder="请再次输入密码"></el-input>
              </el-form-item>

              <el-form-item label="邀请码">
                <el-input type="text" v-model="registered.userPhone" autocomplete="off" placeholder="请输入邀请码" :disabled="$route.query.invite_code? true: false"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm('registered')">注册</el-button>
                <el-button @click="resetForm('registered')">重置</el-button>
              </el-form-item>
            </el-form>

            <ul class="common-form pr">
              <li class="pa" style="left: 0;top: 0;margin: 0;color: #d44d44">{{registered.errMsg}}</li>
              <li style="text-align: center;line-height: 48px;margin-bottom: 0;">
                <span>如果您已拥有 THUNDERCAT ID，则可在此</span>
                <a href="javascript:;"
                   style="margin: 0 5px"
                   @click="loginPage = true">登陆</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import YFooter from '/common/footer'
  import YButton from '/components/YButton'
  import { userLogin, register, sendCode } from '/api/index'
  import { mapMutations } from 'vuex'

  export default {
    data () {
      const validateMobile = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'))
        } else if (!(/^(\s)*[1][3-9]\d{9}(\s)*$|^(\s)*([6|9])\d{7}(\s)*$|^(\s)*[0][9]\d{8}(\s)*$|^(\s)*[6]([8|6])\d{5}(\s)*$/.test(value))) {
          callback(new Error('请输入正确的手机号!'))
        } else {
          callback()
        }
      }
      const validateSendCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'))
        } else {
          callback()
        }
      }
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          // if (this.registered.userPwd !== '') {
          //   this.$refs.registered.validateField('userPwd')
          // }
          callback()
        }
      }
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.registered.userPwd) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        sendCodeFlag: false, // 发送验证码flag
        intervalId: 0, // 定时器
        sendCodeText: '获取验证码',
        loginPage: true,
        ruleForm: {
          userName: '',
          userPwd: ''
        },
        registered: {
          mobile: '', // 手机号
          verificationCode: '', // 验证码
          userPwd: '',
          userPwd2: '',
          userPhone: '' // 用户的邀请码
        },
        rules: {
          mobile: [
            { validator: validateMobile, trigger: 'blur' }
          ],
          verificationCode: [
            { validator: validateSendCode, trigger: 'blur' }
          ],
          userPwd: [
            { validator: validatePass, trigger: 'blur' }
          ],
          userPwd2: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      isLoginOk () {
        const {userPwd, userName} = this.ruleForm
        return userPwd && userName ? 'main-btn' : 'disabled-btn'
      }
    },
    methods: {
      ...mapMutations(['UPDATE_ID']),
      // 发送短信
      sendCode () {
        const {mobile} = this.registered
        if (!mobile) {
          this.ruleForm.errMsg = '手机号不能为空!'
        } else {
          const timestamp = Date.parse(new Date()) / 1000
          const scene = 1
          const sign = this.$md5(`${mobile}__${scene}__${timestamp}__thundercat`)
          let params = {mobile, timestamp, scene, sign}
          const loading = this.$loading({
            text: '发送中',
            background: 'rgba(0, 0, 0, 0.7)',
            fullscreen: true,
            target: '.wrapper'
          })
          sendCode(params).then(res => {
            loading.close()
            if (res.status === 200 && res.data.code === 1) {
              this.sendCodeFlag = true
              this.sendCodeText = 60
              this.intervalId = setInterval(() => {
                this.sendCodeText--
              }, 1000)
              this.$message({
                message: '发送成功',
                type: 'success'
              })
            } else {
              this.$message.error(res.data.msg)
            }
          })
        }
      },

      // 登录
      login () {
        const {userName, userPwd} = this.ruleForm
        if (!userName || !userPwd) {
          this.ruleForm.errMsg = '账号或者密码不能为空!'
        } else {
          const mobile = userName
          const password = userPwd
          const timestamp = Date.parse(new Date()) / 1000
          const sign = this.$md5(`${mobile}__${password}__${timestamp}__thundercat`)
          let params = {mobile, password, timestamp, sign}
          const loading = this.$loading({
            text: '登录中',
            background: 'rgba(0, 0, 0, 0.7)',
            fullscreen: true,
            target: '.wrapper'
          })
          userLogin(params).then(res => {
            loading.close()
            if (res.status === 200 && res.data.code === 1) {
              this.UPDATE_ID({info: res.data.data})
              this.$message({
                message: '登录成功',
                type: 'success'
              })
              this.$router.push('/home')
            } else {
              this.$message.error(res.data.msg)
            }
          })
        }
      },

      // 注册
      register () {
        const { mobile, userPwd, userPwd2, verificationCode, userPhone } = this.registered
        const password = userPwd
        const password2 = userPwd2
        const code = verificationCode
        const invite_code = userPhone
        const scene = 1
        const timestamp = Date.parse(new Date()) / 1000
        const sign = this.$md5(`${mobile}__${scene}__${password}__${password2}__${code}__${timestamp}__thundercat`)
        let params = {mobile, scene, password, password2, code, timestamp, invite_code, sign}
        const loading = this.$loading({
          text: '注册中',
          background: 'rgba(0, 0, 0, 0.7)',
          fullscreen: true,
          target: '.wrapper'
        })
        register(params).then(res => {
          loading.close()
          console.log(res)
          if (res.status === 200 && res.data.code === 1) {
            this.$message({
              message: '注册成功',
              type: 'success'
            })
            this.loginPage = true
            // this.$router.go(-1)
          } else {
            this.$message.error('网络赛车啦')
          }
        })
      },

      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.register()
          } else {
            this.$message.error('请填写完整信息')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    },
    created () {
      if (this.$route.query.invite_code) {
        this.registered.userPhone = this.$route.query.invite_code
        this.loginPage = false
      }
    },
    components: {
      YFooter,
      YButton
    },
    watch: {
      sendCodeText (newName, oldName) {
        if (newName === 0) {
          clearInterval(this.intervalId)
          this.sendCodeText = '获取验证码'
          this.sendCodeFlag = false
        }
      }
    }

  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  * {
    box-sizing: content-box;
  }

  .login {
    overflow-x: hidden;
    overflow-y: hidden;
    .input {
      height: 50px;
      display: flex;
      align-items: center;
      input {
        font-size: 16px;
        width: 100%;
        height: 100%;
        padding: 10px 15px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 6px;
      }
    }
    .wrapper {
      background: url(/static/images/bg_9b9dcb65ff.png) repeat;
      background-size: 100px;
      min-height: 800px;
      min-width: 630px;
    }
    .btn {
      margin: 0;
      width: 100%;
      height: 48px;
      font-size: 18px;
      line-height: 48px
    }
  }

  .v2 .dialog {
    width: 450px;
    border: 1px solid #dadada;
    border-radius: 10px;
    top: 50%;
    left: 50%;
    margin-left: -225px;
    position: absolute;
    .title {
      background: linear-gradient(#fff, #f5f5f5);
      overflow: visible;
      position: relative;
      background-image: url(/static/images/lmbTitleBg.png);
      background-size: 160px;
      background-position: top center;
      background-repeat: no-repeat;
      height: 92px;
      margin: 23px 0 30px;
      padding: 110px 0 0;
      box-shadow: none;
      h4 {
        padding: 0;
        text-align: center;
        border-bottom: 1px solid #dcdcdc;
        position: absolute;
        bottom: 0;
        width: 100%;
        margin: 0;
        border-bottom: 0;
        box-shadow: none;
        line-height: 1em;
        height: auto;
        color: #333;
        font-weight: 400;
      }
    }
    .content {
      padding: 0 40px 22px;
      height: auto;
      .common-form {
        li {
          clear: both;
          margin-bottom: 15px;
          position: relative;
        }
      }
    }
  }

  .dialog-shadow, .v2 .bbs .dialog-shadow, .v2 .dialog-shadow {
    -webkit-box-shadow: 0 9px 30px -6px rgba(0, 0, 0, .2), 0 18px 20px -10px rgba(0, 0, 0, .04), 0 18px 20px -10px rgba(0, 0, 0, .04), 0 10px 20px -10px rgba(0, 0, 0, .04);
    -moz-box-shadow: 0 9px 30px -6px rgba(0, 0, 0, .2), 0 18px 20px -10px rgba(0, 0, 0, .04), 0 18px 20px -10px rgba(0, 0, 0, .04), 0 10px 20px -10px rgba(0, 0, 0, .04);
    box-shadow: 0 9px 30px -6px rgba(0, 0, 0, .2), 0 18px 20px -10px rgba(0, 0, 0, .04), 0 18px 20px -10px rgba(0, 0, 0, .04), 0 10px 20px -10px rgba(0, 0, 0, .04);
  }

  @media screen and (min-width: 737px), screen and (-webkit-max-device-pixel-ratio: 1.9) and (max-width: 736px) and (min-device-width: 737px) {
    .wrapper {
      background: url(/static/images/con-bg_04f25dbf8e.jpg) repeat-x;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
    .dialog {
      background: url(/static/images/dialog-gray-bg.png) #fff bottom repeat-x;
      border-radius: 12px;
      display: none;
      margin: -163px 0 0 -218px;
      width: 436px;
      position: fixed;
      left: 50%;
      top: 50%;
    }
    .dialog .title h4 {
      border-bottom: #d1d1d1 solid 1px;
      box-shadow: 0 2px 6px #d1d1d1;
      color: #666;
      font-size: 20px;
      height: 61px;
      line-height: 61px;
      padding: 0 0 0 35px;
    }
    .common-form li {
      clear: both;
      margin-bottom: 15px;
      position: relative;
    }
  }

  .registered {
    h4 {
      padding: 0;
      text-align: center;
      color: #666;
      border-bottom: 1px solid #dcdcdc;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      font-weight: 700;
      font-size: 20px;
      height: 60px;
      line-height: 60px;
    }
  }

</style>
