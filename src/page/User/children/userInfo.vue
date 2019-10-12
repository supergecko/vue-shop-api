<template>
  <el-row>
    <y-shelf title="账户中心"></y-shelf>
    <el-main style="background:rgba(255,255,255,1);margin-bottom: 20px" >
      <!--个人信息-->
      <el-row class="orderListHead">
        <div>个人信息</div>
      </el-row>
      <el-row v-show="IdInfoFlag" class="IdCardInfo">
        <el-image v-show="IdCardImgVerify"
          style="width: 100px; height: 100px;margin-top: 39px;"
          src="../../../static/imgs/padding.png"
          fit="fill"></el-image>
        <el-image v-show="!IdCardImgVerify"
          style="width: 100px; height: 100px;margin-top: 39px;"
          src="../../../static/imgs/passed.png"
          fit="fill"></el-image>
      </el-row>
      <el-row v-show="!IdInfoFlag">
        <el-form style="padding-top: 20px" label-width="100px" :model="IdFormData" :rules="IdInfoRules" ref="IdFormData">
          <el-form-item label="姓名" prop="name">
            <el-input style="width: 200px" v-model="IdFormData.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="telPhone">
            <el-input style="width: 350px" v-model="IdFormData.telPhone"></el-input>
          </el-form-item>
          <el-form-item label="身份证ID" prop="IdCardNumber">
            <el-input style="width: 350px" v-model="IdFormData.IdCardNumber"></el-input>
          </el-form-item>
          <el-form-item label="身份证正面">
            <el-row>
              <el-col :span="9">
                <div class="grid-content">
                  <el-upload
                    class="upload-demo"
                    ref="frontPic"
                    accept="image/png, image/jpeg"
                    name="imgPath"
                    action="http://leimaominer.com/home/ueditor/imageUp"
                    :before-upload="beforeAvatarUpload"
                    :on-success="handlePreviewFace"
                    :limit="1"
                    :file-list="fileList"
                    :on-exceed="handleExceed"
                    list-type="picture">
                    <el-button size="small" type="primary" @click="uploadSign=1">选取文件</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
                  </el-upload>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content" style="padding-left: 60px;">
                  <img class="show-img" src="../../../assets/img/IDCardFace.jpg" alt="样图" style="width:293px;height:190px"/>
                </div>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="身份证反面">
            <el-row>
              <el-col :span="9">
                <div class="grid-content">
                  <el-upload
                    class="upload-demo"
                    ref="frontPic"
                    accept="image/png, image/jpeg"
                    name="imgPath"
                    action="http://leimaominer.com/home/ueditor/imageUp"
                    :before-upload="beforeAvatarUpload"
                    :on-success="handlePreviewBack"
                    :limit="1"
                    :file-list="fileList"
                    :on-exceed="handleExceed"
                    list-type="picture">
                    <el-button size="small" type="primary" @click="uploadSign=1">选取文件</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
                  </el-upload>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content" style="padding-left: 60px;">
                  <img class="show-img" src="../../../assets/img/IDCardFace.jpg" alt="样图" style="width:293px;height:190px"/>
                </div>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="IdInfoSubmitForm('IdFormData')">立即上传</el-button>
            <el-button @click="IdInfoResetForm('IdFormData')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <!--钱包地址-->
      <el-row class="orderListHead">
        <div>钱包地址</div>
      </el-row>
      <el-row>
        <div style="margin-bottom: 10px;margin-top: 15px">BTC 币种已支持的矿池：AntPool、BTC.com、F2Pool、ViaBTC、BTC.TOP</div>
        <AddressData :addressData=wallet_address :isAddress=false  @getWallet="getWallet" :flag=false></AddressData>
        <div style="text-align: center;padding-top:20px">
          <el-button type="primary" round @click="open()">添加新的BTC地址</el-button>
        </div>
      </el-row>

      <!--收货地址-->
      <el-row class="orderListHead">
        <div>收货地址</div>
      </el-row>
      <el-row>
<!--        <div style="margin-bottom: 10px;margin-top: 15px">该地址用于用户自提</div>-->
        <AddressData :addressData=userAddress :isAddress=true @getWallet="getWallet" :flag=true></AddressData>
        <div style="text-align: center;padding-top:20px">
          <el-button type="primary" round @click="dialogFormVisible = true">添加新的收货地址</el-button>

          <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="formRules" ref="form" class="demo-ruleForm">
              <el-form-item label="收货地区" :label-width="formLabelWidth" prop="receivingArea">
                <el-cascader
                  size="large"
                  :options="options"
                  v-model="form.receivingArea"
                  style="width: 100%;">
                </el-cascader>
              </el-form-item>
              <el-form-item label="详细地址" :label-width="formLabelWidth" style="margin-bottom: 22px" prop="address">
                <el-input v-model="form.address" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="收货人" :label-width="formLabelWidth" style="margin-bottom: 22px" prop="consignee">
                <el-input v-model="form.consignee" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="收货手机" :label-width="formLabelWidth" style="margin-bottom: 22px" prop="mobile">
                <el-input v-model="form.mobile" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="邮编" :label-width="formLabelWidth" style="margin-bottom: 22px" prop="zipcode">
                <el-input v-model="form.zipcode" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: center;">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary"  @click="formCheckIn('form')">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </el-row>

      <!--修改登录密码-->
<!--      <el-row class="orderListHead">-->
<!--        <div>修改登录密码</div>-->
<!--      </el-row>-->
    </el-main>
  </el-row>
</template>

<script>
  import YShelf from '/components/shelf'
  import { saveWallet, getWallet, saveAddress, getUserAddress, identityAuthentication, identityAuthenticationExist } from '/api'
  import { getItem } from './../../../utils/newLocalStorage'
  import AddressData from '/common/addressDataList'
  import { regionData, CodeToText } from 'element-china-area-data'

  export default {
    data () {
      return {
        IdInfoFlag: false,
        user_authentication_des: '', // 审核/通过文字描述
        fileList: [],
        IdCardImgVerify: '', // 审核/通过图片地址
        IdFormData: {
          name: '',
          telPhone: '',
          IdCardNumber: ''
        },
        IdCardFaceImg: '',
        IdCardBackImg: '',
        IdInfoRules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          telPhone: [
            { required: true, message: '请输入电话号码', trigger: 'blur' },
            { min: 11, max: 11, message: '请输入正确的号码', trigger: 'blur' }
          ],
          IdCardNumber: [
            { required: true, message: '请输入身份证号码', trigger: 'blur' }
          ]
        },
        options: regionData,
        wallet_address: [], // 用户钱包地址
        userAddress: [], // 用户收货地址
        dialogFormVisible: false,
        loadingWarp: '',
        formLabelWidth: '80px',
        form: {
          receivingArea: '', // 收货地区
          address: '', // 详细收货地址
          consignee: '', // 收货人
          mobile: '', // 收获手机
          zipcode: '' // 邮编
        },
        formRules: {
          // 收货地区校验
          receivingArea: [
            {required: true, message: '请选择收货地区', trigger: 'blur'}
          ],
          // 收货地址校验
          address: [
            {required: true, message: '请输入详细地址', trigger: 'blur'}
          ],
          // 收货人校验
          consignee: [
            {required: true, message: '请输入收货人姓名', trigger: 'blur'}
          ],
          // 手机号校验
          mobile: [
            {required: true, message: '请输入手机号码', trigger: 'blur'}
          ],
          // 邮政编码校验
          zipcode: [
            {required: true, message: '请输入邮政编码', trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
      btnHighlight () {
        let msg = this.msg
        return msg.userName
      }
    },
    methods: {
      // 是否身份信息验证
      async _identityAuthenticationExist () {
        const user_id = await getItem('userID')
        const timestamp = await Date.parse(new Date()) / 1000
        const sign = await this.$md5(`${user_id}__${timestamp}__thundercat`)
        let params = {user_id, timestamp, sign}
        identityAuthenticationExist(params).then(res => {
          if (res.status === 200 && res.data.code === 1) {
            if (res.data.data.user_authentication_status === -1) {
              this.IdInfoFlag = false
              this.$alert('完善个人信息将获得雷猫积分奖励', '提示', {
                confirmButtonText: '确定'
              })
            } else {
              this.IdInfoFlag = true
              if (res.data.data.user_authentication_des === 0) {
                this.IdCardImgVerify = true
              } else if (res.data.data.user_authentication_des === 1) {
                this.IdCardImgVerify = false
              } else {
                this.IdCardImgVerify = true
              }
              this.user_authentication_des = res.data.data.user_authentication_des
            }
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      _identityAuthentication () {
        const loading = this.$loading({
          text: '上传中',
          background: 'rgba(0, 0, 0, 0.7)',
          fullscreen: true
        })
        const {name, telPhone, IdCardNumber} = this.IdFormData
        const realname = name
        const idcard = IdCardNumber
        const mobile = telPhone
        const face = this.IdCardFaceImg
        const back = this.IdCardBackImg
        const user_id = getItem('userID')
        const timestamp = Date.parse(new Date()) / 1000
        const sign = this.$md5(`${user_id}__${realname}__${idcard}__${mobile}__${face}__${back}__${timestamp}__thundercat`)
        let params = {user_id, realname, idcard, mobile, face, back, timestamp, sign}
        identityAuthentication(params).then(res => {
          loading.close()
          if (res.status === 200 && res.data.code === 1) {
            this.$message({
              message: '上传成功',
              type: 'success'
            })
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      IdInfoSubmitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this._identityAuthentication()
          } else {
            this.$message({
              message: '请检查信息是否填写完善',
              type: 'warning'
            })
            return false
          }
        })
      },
      IdInfoResetForm (formName) {
        this.$refs[formName].resetFields()
      },
      // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
      beforeAvatarUpload: function (file) {
        // 判断上传文件类型
        const me = this
        const isJPG = file.type === 'image/jpeg'
        const isPNG = file.type === 'image/png'
        if (!(isJPG || isPNG)) {
          me.$message.error('上传的文件只能是 JPG 或者是 PNG 格式的')
        }
      },
      // 文件超出个数限制时的钩子
      handleExceed (file, fileList) {
        const me = this
        me.$message.warning('只能上传一个文件')
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePreviewFace (file) {
        const me = this
        me.$message({
          message: '上传成功，请勿重复反复上传',
          type: 'success'
        })
        this.IdCardFaceImg = file.data.url
        console.log(file.data.url)
      },
      handlePreviewBack (file) {
        const me = this
        me.$message({
          message: '上传成功，请勿重复反复上传',
          type: 'success'
        })
        this.IdCardBackImg = file.data.url
      },
      // 获取用户钱包地址
      getWallet () {
        this.loadingWarp = this.$loading({
          text: '加载中',
          background: 'rgba(0, 0, 0, 0.7)',
          fullscreen: true
        })
        const user_id = getItem('userID')
        const coin_id = 1
        const timestamp = Date.parse(new Date()) / 1000
        const sign = this.$md5(`${user_id}__${coin_id}__${timestamp}__thundercat`)
        let params = {user_id, coin_id, timestamp, sign}
        getWallet(params).then(res => {
          if (res.status === 200 && res.data.code === 1) {
            this.wallet_address = res.data.data.address
            if (this.wallet_address.length === 0) {
              console.log('数组为空')
            } else {
              console.log('数组不为空')
            }
            this._getUserAddress()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      // 添加新的钱包地址
      open () {
        this.$prompt('请输入新的钱包地址', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValidator: (value) => {
            if (value.trim().length < 1) {
              return '输入不能为空'
            }
          },
          inputErrorMessage: '输入不能为空'
        }).then(({value}) => {
          const user_id = getItem('userID')
          const address = value
          const coin_id = 1
          const timestamp = Date.parse(new Date()) / 1000
          const sign = this.$md5(`${user_id}__${coin_id}__${address}__${timestamp}__thundercat`)
          let params = {user_id, coin_id, address, timestamp, sign}
          const loading = this.$loading({
            text: '添加中',
            background: 'rgba(0, 0, 0, 0.7)',
            fullscreen: true,
            target: '.wrapper'
          })
          saveWallet(params).then(res => {
            loading.close()
            if (res.status === 200 && res.data.code === 1) {
              this.$message({
                type: 'success',
                message: '添加成功'
              })
              this.getWallet()
            } else {
              this.$message.error(res.data.msg)
            }
          })
        }).catch(() => {})
      },
      // 添加新的收货地址
      formCheckIn (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const { address, consignee, mobile, zipcode, receivingArea } = this.form
            const province = CodeToText[receivingArea[0]]
            const city = CodeToText[receivingArea[1]]
            const district = CodeToText[receivingArea[2]]
            const town = ''
            const user_id = getItem('userID')
            const timestamp = Date.parse(new Date()) / 1000
            const sign = this.$md5(`${user_id}__${province}__${city}__${district}__${town}__${consignee}__${mobile}__${zipcode}__${address}__${timestamp}__thundercat`)
            let params = {user_id, province, city, district, town, consignee, mobile, zipcode, address, timestamp, sign}
            saveAddress(params).then(res => {
              if (res.status === 200 && res.data.code === 1) {
                this.$message({
                  type: 'success',
                  message: '添加成功'
                })
                this.getWallet()
              } else {
                this.$message.error(res.data.msg)
              }
            })
            this.dialogFormVisible = false
          } else {
            this.$message.error('请填写完整信息')
            return false
          }
        })
      },
      // 获取用户收货地址
      _getUserAddress () {
        const user_id = getItem('userID')
        const timestamp = Date.parse(new Date()) / 1000
        const sign = this.$md5(`${user_id}__${timestamp}__thundercat`)
        let params = {user_id, timestamp, sign}
        getUserAddress(params).then(res => {
          if (res.status === 200 && res.data.code === 1) {
            this.userAddress = res.data.data
            if (this.wallet_address.length === 0) {
              console.log('数组为空')
            } else {
              console.log('数组不为空')
            }
            this.loadingWarp.close()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      }
    },
    mounted () {
      this.getWallet()
    },
    created () {
      this._identityAuthenticationExist()
    },
    components: {
      YShelf,
      AddressData
    }
  }
</script>

<style scoped>
  .IdCardInfo{
    min-height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .orderListHead{
    width: 950px;
    border-bottom: 1px solid #d8d8d8;
    margin: 0 auto;
    padding-top: 10px;
  }
  .orderListHead div{
    font-family: Rubik-Medium;
    font-size: 20px;
    color: #1c1f28;
    padding-bottom: 10px;
    border-bottom: 3px solid #5c82ff;
    display: inline-block;
  }
</style>
