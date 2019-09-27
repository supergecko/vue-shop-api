<template>
  <div style="background: #f7f7f7;">
    <!--订单详情-->
    <div class="orderListWarp" style="background: #fff;">
      <el-row class="orderListHead">
        <div>产品信息</div>
      </el-row>
      <el-row class="orderListForm">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">

          <el-form-item label="购买数量" prop="num">
            <el-input-number v-model="ruleForm.num" :min="1" :max="1000000000" label="描述文字"></el-input-number>
          </el-form-item>

          <el-form-item label="币种" prop="currency">
            <el-select v-model="ruleForm.currency" placeholder="请选择币种" :disabled="goodsInfo.forbidden==1? true: false" >
              <el-option :label=item.title :value=item.coin_id v-for="(item, i) in goodsInfo.coin" :key="i" v-if="goodsInfo.coin">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="机型">
            <el-row style="font-size: 20px;color: #32374a;" v-if="goodsInfo.goods">{{goodsInfo.goods.goods_name}}</el-row>
          </el-form-item>

          <el-form-item label="算力">
            <el-input v-if="goodsInfo.goods"
              :placeholder=goodsInfo.goods.hashrate
              :disabled="true"
              style="width: 217px">
            </el-input>
          </el-form-item>

          <el-form-item label="品牌">
            <el-row style="display: flex">
              <el-input v-if="goodsInfo.cycle"
                :placeholder=goodsInfo.cycle[0].description
                :disabled="true"
                style="width: 217px;display: inline-block">
              </el-input>
<!--              <el-row style="margin-left: 20px">-->
<!--                (2019.10.30~2020.12.23)-->
<!--                <i class="el-icon-info"></i>-->
<!--              </el-row>-->
            </el-row>
          </el-form-item>

          <el-form-item label="优惠卷" >
            <el-select v-model="ruleForm.coupon" placeholder="无可用优惠劵" :disabled="true">
              <el-option label="Bitcoin" value="shanghai"></el-option>
              <el-option label="Bitcoin Cash" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="矿池" prop="orePool">
            <el-radio-group v-model="ruleForm.orePool">
              <el-radio :label=item.mine_id v-for="(item, i) in goodsInfo.mine" :key="i" v-if="goodsInfo.mine">{{item.name}}</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="托管方式" prop="trusteeshipM">
            <el-radio-group v-model="ruleForm.trusteeshipM">
              <el-radio :label=item.host_id v-for="(item, i) in goodsInfo.host" :key="i" v-if="goodsInfo.host" @change="switchingInput(item.host_id)">{{item.title}}</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="钱包地址" v-if="paymentInputFlag" prop="btcAddress">
            <el-select v-model="ruleForm.btcAddress" placeholder="请选择钱包地址" style="width: 400px">
              <el-option :label=item.address :value=item.wallet_id v-for="(item, i) in wallet_address" :key="i">
              </el-option>
            </el-select>
            <el-button @click="open">+ 添加新的线上钱包地址</el-button>
          </el-form-item>

          <el-form-item label="收货地址" v-else prop="userAddress">
            <!--收货地址-->
            <el-select v-model="ruleForm.userAddress" placeholder="请输入实际收货地址" style="width: 400px">
              <el-option :label=item.province+item.city+item.district+item.address :value=item.address_id v-for="(item, i) in underLine_address" :key="i">
              </el-option>
            </el-select>
            <!-- Form -->
            <el-button type="text" @click="dialogFormVisible = true">+ 添加新的收货地址</el-button>

            <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
              <el-form :model="form" :rules="formRules" ref="form" class="demo-ruleForm">
                <el-form-item label="收货地区" :label-width="formLabelWidth" prop="receivingArea" style="margin-bottom: 22px">
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
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary"  @click="formCheckIn('form')">确 定</el-button>
              </div>
            </el-dialog>
          </el-form-item>

          <el-form-item label="产品单价">
            <el-row class="orderListMiddleText" v-if="goodsInfo.goods">￥ {{goodsInfo.goods.shop_price}}<span> (单台费用)</span></el-row>
          </el-form-item>

<!--          <el-row class="orderListMiddle" style="padding-left: 0px;padding-top: 8px;" v-if="electricityFalg">-->
<!--            <el-row class="orderListHead">-->
<!--              <div>电费详情</div>-->
<!--            </el-row>-->
<!--          </el-row>-->

<!--          <el-form-item label="电费交纳天数" style="padding-top: 15px" prop="electricityDays" v-if="electricityFalg">-->
<!--            <el-radio-group v-model="ruleForm.electricityDays">-->
<!--              <el-radio :label="30" @change="changeDays">1个月</el-radio>-->
<!--              <el-radio :label="90" @change="changeDays">3个月</el-radio>-->
<!--              <el-radio :label="150" @change="changeDays">5个月</el-radio>-->
<!--              <el-radio :label="200" @change="changeDays">-->
<!--                  <el-input v-model=userInputDays placeholder="请输入月数(例如6代表6个月)" style="width: 217px" :disabled="ruleForm.electricityDays===200? false: true"></el-input>-->
<!--              </el-radio>-->
<!--            </el-radio-group>-->
<!--            <el-row class="powerRateTipOne" style="margin-top: 15px">-->
<!--              套餐中未交纳的电费剩余天数可以后续支付-->
<!--            </el-row>-->
<!--            <el-row class="powerRateTipTwo">-->
<!--              <el-switch-->
<!--                v-model="lmbPayment"-->
<!--                active-text="后续电费是否雷猫币支付"-->
<!--                inactive-text="">-->
<!--              </el-switch>-->
<!--            </el-row>-->
<!--          </el-form-item>-->

<!--          <el-row class="orderListMiddle" v-if="electricityFalg">-->
<!--            <el-form-item label="单台电费">-->
<!--              <el-row class="orderListMiddleText">￥ {{totalElectricity}} <span v-if="goodsInfo.goods">= {{goodsInfo.goods.electricity}}元/天  × {{electricityDay/30}}个月(单台电费)</span> </el-row>-->
<!--            </el-form-item>-->
<!--          </el-row>-->

          <el-row class="orderListMiddle totalCost">
            <el-form-item label="总计">
              <el-row class="totalCostText">￥ {{totalCase}}<span>= (单台单价+单台电费)*购买数量</span></el-row>
            </el-form-item>
            <el-row class="totalCostWarp">
              <el-row class="powerRateTipOne" style="width:337px">
                套餐中未交纳的电费剩余天数可以后续支付
              </el-row>
              <el-row style="margin-top: 25px">
                <el-button type="primary" class="checkInBtn"  @click="submitForm('ruleForm')">确定</el-button>
              </el-row>
              <el-row style="margin-top: 10px">
                <el-checkbox v-model="checked">我接受</el-checkbox>
                <a style="margin-left: 5px;font-size: 14px" @click="contractFalg = true">雷猫矿机用户服务协议</a>
              </el-row>
              <el-row style="margin-top: 10px;font-size: 14px;margin-bottom: 20px">
                如果你没有以下支付方式，请通过右下角的反馈入口联系客服
              </el-row>
            </el-row>
          </el-row>

          <el-form-item label="支付方式" style="margin-top:22px;" prop="paymentMethod">
            <el-radio-group v-model="ruleForm.paymentMethod" class="paymentMethodWarp">
              <el-radio :label=item.pay_id class="paymentMethodItem" v-for="(item, i) in goodsInfo.pay" :key="i" v-if="goodsInfo.pay">
                <el-image
                  style="width: 36px; height:36px"
                  :src='"../../../static/paymentMethod/"+item.description+".png"'
                  fit="fill"></el-image>
                <div style="text-align:center">{{item.name}}</div>
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-row>

      <!--注意事项-->
      <el-row>
        <div class="payment-notice">
          <div class="sub-amount">注意事项:</div>
          <div class="notice-item">
            <h4 class="rubik-medium">法律声明</h4>
            <div class="tips-text">矿机服务在以下国家或地区被禁止:巴尔干半岛、白俄罗斯、缅甸、科特迪瓦(象牙海岸)，克里米亚-乌克兰、古巴、刚果民主共和国、伊朗、伊拉克、利比里亚、朝鲜、苏丹、叙利亚、委内瑞拉、津巴布韦、中国香港和中国大陆。请确认矿机服务在您的国家或地区是合法的。否则，您将承担一切法律后果。</div>
          </div>
          <div class="notice-item">
            <h4 class="rubik-medium">无法退款</h4>
            <div class="tips-text">按照协议规定，一旦订单已付款，将不支持退款。</div>
          </div>
          <div class="notice-item">
            <h4 class="rubik-medium">定价规则</h4>
            <div class="tips-text">矿机服务套餐的定价会根据数字货币价格等多因素调整。实际购买价格以用户付款时为准，后续即使价格发生变化，雷猫也不会对这个订单进行差价补偿。</div>
          </div>
          <div class="notice-item">
            <h4 class="rubik-medium">算力波动说明</h4>
            <div class="tips-text">雷猫提供的套餐对应的为真实算力，真实算力由于网络、矿机功率等不稳定因素会导致波动，雷猫不承诺100%稳定运行。</div>
          </div>
          <div class="notice-item">
            <h4 class="rubik-medium">不可控风险声明</h4>
            <div class="tips-text">雷猫不对以下不可控风险所造成的损失负责：不能预见、不能避免或不能克服的客观事件，包括自然灾害如洪水、火山爆发、地震、山崩、火灾、被中国政府部门评定为百年不遇级别以上的风暴和恶劣气候等，政府行为和政府指令，城市级别的电网供电事故，以及社会异常事件如战争、罢工、动乱等。</div>
          </div>
          <div class="notice-item">
            <h4 class="rubik-medium">使用范围声明</h4>
            <div class="tips-text">用户不得将雷猫提供的算力用于攻击网络等违法违规行为，否则雷猫有权强行收回您的算力。</div>
          </div>
        </div>
      </el-row>
    </div>

    <!--弹窗支付-->
    <el-dialog  :visible.sync="qrCodeFalg" style="padding: 20px 20px;">
      <!--线上支付-->
      <el-row class="qrcodeUrlWarp" v-show="paymentTypeFlag">
        <el-row style="font-size: 18px;margin-bottom: 10px" >请扫描下方二维码进行支付</el-row>
        <el-row>
          <el-image
            style="width: 300px; height: 407px"
            :src="qrCodeUrl"
            fit="fill"></el-image>
        </el-row>
        <el-row style="text-align: center;font-size: 14px;color: blue;margin-top: 5px;width: 360px">转账请备注手机号，以便工作人员核实到账情况。请勿备注与矿机有关字眼，如：蚂蚁矿机、神马矿机、比特币等</el-row>
        <el-row style="text-align: center;font-size: 14px;color: blue;margin-top: 5px;margin-bottom: 5px">转账校验请填写:郑</el-row>
      </el-row>
      <!--公账-->
      <el-row v-show="!paymentTypeFlag">
        <el-row style="font-size: 18px;text-align: center;margin-bottom: 15px">请线下转账对公账户</el-row>
        <el-form label-position="right" label-width="80px" :model="formLabelAlign">
          <el-form-item label="银行名称">
            <el-input v-model="formLabelAlign.bank_name" disabled></el-input>
          </el-form-item>
          <el-form-item label="户   名">
            <el-input v-model="formLabelAlign.bank_title" disabled></el-input>
          </el-form-item>
          <el-form-item label="账   号">
            <el-input v-model="formLabelAlign.bank_account" disabled></el-input>
          </el-form-item>
          <el-form-item label="开 户 行">
            <el-input v-model="formLabelAlign.bank_open" disabled></el-input>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row style="text-align: center;font-size: 16px;">未支付金额: <span style="color:red;">{{unpaid}} 元</span></el-row>
      <div slot="footer" class="dialog-footer" style="text-align: center;padding: 0px 20px 20px;">
        <el-button @click="paymentFail">重新选购</el-button>
        <el-button type="primary" @click="paymentSuccess">支付完成</el-button>
      </div>
    </el-dialog>

    <!--合同-->
    <el-dialog :visible.sync="contractFalg">
      <div class="serviceWarp">
        <el-row>
          <div class="serviceTitle">雷猫矿机共享服务协议</div>
        </el-row>
        <el-row>
          <div class="content">
            <p><span>《雷猫矿机共享服务协议》（“本协议”）是雷猫矿机共享平台（“雷猫”或“我们”）和使用雷猫提供的服务和/或雷猫矿机共享网站（“本网站”）的用户（“用户”或“您”）之间的协议。本协议描述了雷猫和用户的相关权利和责任。您使用雷猫提供的服务和/或本网站，即表示您同意本协议规定的全部条款。如果您不同意，请勿使用雷猫提供的服务和/或本网站。若您同意并遵守本协议的全部条款，雷猫即授予您进入和使用雷猫提供的服务和本网站个人的，不可独占，不可转让的有限权利。</span></p>
            <p><span><br></span></p>
            <p><span><b>一、基本事项</b></span></p>
            <p><span><br></span></p>
            <p><span>本协议规定了用户和雷猫之间就雷猫提供的服务建立的权利和责任义务。雷猫提供的服务和本网站是雷猫的财产。</span></p>
            <p><span>雷猫保留随时自行决定修改本协议条款的权利。您有责任定期查看本协议以了解最新修改。本协议及其修改在
					雷猫将其公布于本网站之时即刻生效（除非本协议中另行规定生效时间）。您在本协议及其修改发布后继续使用雷猫提供的服务和/或本网站即表示您接受并同意该修改。</span></p>
            <p><span>若您对本协议的修改有任何异议，或对雷猫提供的服务不满意，您应立即：</span></p>
            <p><span>1、停止使用雷猫提供的服务;&nbsp;&nbsp;</span></p>
            <p><span>2、通过客服渠道告知雷猫停止服务。终止服务后，用户使用雷猫服务的权利立即终止。您同意：在这种情况下，雷猫没有义务将任何未处理的信息或未完成的服务传输给您或任何第三方。</span></p>
            <p><span><br></span></p>
            <p><span><b>二、用户信息注册</b></span></p>
            <p><span><br></span></p>
            <p><span>1、您在此承诺：</span></p>
            <p><span>（1）您年满18周岁并具有完全民事行为能力；</span></p>
            <p><span>（2）您接受并使用雷猫提供的服务在您的居住地/国家符合适用法律法规和相关政策，且不违反您对于任何其他第三方的义务。</span></p>
            <p><span>（3）您发现当由于事实或法律法规变化您无法承诺本条a和/或b款规定的内容时，您会立即停止使用雷猫提供的服务并通过客服务渠道告知雷猫停止服务。终止服务后，您使用雷猫服务的权利立即终止。您同意：在这种情况下，雷猫没有义务将任何未处理的信息或未完成的服务传输给您或任何第三方。</span></p>
            <p><span>2、对于用户提供的注册数据，用户同意：</span></p>
            <p><span>（1）提供合法，真实，准确和完整的个人信息;&nbsp;</span></p>
            <p><span>（2）如有变化，及时更新用户信息。如果用户提供的注册信息是非法，不真实，不准确或不完整的，用户应承担相应的全部责任和后果；</span></p>
            <p><span>（3）雷猫保留根据提供的信息对帐户施加限制，暂停或终止使用雷猫矿机共享服务的权利；</span></p>
            <p><span>（4）每位用户只能注册一个账户；</span></p>
            <p><span>（5）您的订单是向雷猫就矿机共享服务发出的请求，并不代表雷猫已经接受您的订单。雷猫保留拒绝接受用户订单的权利。如果我们接受您的订单，则代表雷猫和您之间就该订单所约定的矿机共享服务产生了一份具有约束力的协议（“矿机共享服务协议”），该矿机共享服务协议约定了矿机共享套餐的具体内容。我们会将您的矿机共享套餐与您的帐户相关联。在此之前，订单被视为待处理，雷猫保留拒绝接受订单以及拒绝接受用户付款的权利；</span></p>
            <p><span>（6）为KYC（了解您的客户）和/或反洗钱等合规目的，雷猫有权要求用户提供账户所有者的个人身份信息（PII）和/或财务信息；</span></p>
            <p><span>（7）您在使用雷猫提供的矿机共享服务中的一些特定功能时需要输入您的用户名和密码。如果您因为忘记密码等原因无法访问您的帐户，雷猫为确定帐户真实的所有权，有权要求您提供包括个人身份信息等在内的特定信息，包括但不限于：身份证明;
					居住证明;
					电话号码/电子邮件所有权证明以及网站上的任何可识别活动，例如交易ID，订单号等；但是，您承诺您不会与其他人分享您的用户名和/或密码或允许任何其他第三方使用您的账户。对于您或任何其他第三方对您的账户或密码的不当使用以及所导致的后果和损失，雷猫不承担任何责任。如果您认为您的用户名和/或密码被他人知晓或账户已被他人擅自使用，您应立即通知雷猫。</span></p>
            <p><span><br></span></p>
            <p><span><b>三、风险通知</b></span></p>
            <p><span><br></span></p>
            <p><span>1、您理解并同意：使用数字货币的行为存在法律风险。由于目前针对数字货币的法律监管尚不成熟，其价值可能不受法律/监管的保护，其行为可能被认定为违反法规或政策而终止；</span></p>
            <p><span>2、任何矿机共享套餐的价值，任何数量的任何数字货币都可能因不受雷猫控制的许多因素而受影响。这些因素包括但不限于：采矿难度和/或其他采矿参数/属性的变化，数字货币的市场价格波动（法定货币对数字货币汇率），硬件过时和硬件摊销；</span></p>
            <p><span>3、您理解并同意：由于数字货币的性质，任何数字货币持有人和任何数量的任何数字货币的价值都可能在任何时刻失去部分或全部价值；对于因为数字货币价值降低（甚至为零）而受到的全部损失由您自行承担，雷猫不承担任何责任；</span></p>
            <p><span>4、您理解并同意：雷猫有权随时通过正式的页面公告、站内信、电子邮件、客服电话、手机短信或常规的信件发布，修改，和/或提供与雷猫和雷猫提供的服务相关的任何信息。任何非经雷猫正规渠道获得的信息，雷猫不承担法律责任。</span></p>
            <p><span>5、您理解并同意：雷猫会定期或不定期地对于系统进行维护或升级。雷猫不能保证您使用雷猫提供的服务是连续的，不中断的。您由于雷猫服务中断所产生的损失（若有）承担全部的责任。</span></p>
            <p><span>6、您理解并同意：本网站上的信息不构成传达任何类型的要约，也不应被视为或理解为出售或购买任何证券，商品或其他金融产品的要约。此外，雷猫不构成投资顾问且雷猫网站上的任何信息均不构成投资建议的提供。雷猫不保证网站表达或暗示的任何目标、假设、期望、策略和/或目的已经或将要实现，也不能保证网站描述的活动或任何表现会和网站之前描述的方式一样已经持续或在未来持续。</span></p>
            <p><span><br></span></p>
            <p><span><b>四，数字货币使用</b></span></p>
            <p><span><br></span></p>
            <p><span>1、您不得以任何适用于您的法律或法规所禁止的方式开采，购买，出售，交换，持有，拥有或以其他方式使用或利用数字货币；</span></p>
            <p><span>2、在购买任何矿机共享服务之前，您应该了解该业务以确保该业务适合您的财务能力和风险偏好。您知晓并理解：数字货币存在风险，包括但不限于：</span></p>
            <p><span>（1）货币价格波动 – 包括比特币在内的任何数字货币的价格可能急剧下跌，甚至可能为零；</span></p>
            <p><span>（2）数字货币交易可能在一段时间内无法被证实。虽然可能性较低，但某些数字货币交易可能永远无法确认。未经证实的数字货币交易代表其尚未完成;</span></p>
            <p><span>（3）数字货币交易是不可逆转的 - 如果您向任何错误的人或地址发送任何数量的数字货币，您将可能无法撤销交易或收回这些资金;&nbsp;</span></p>
            <p><span>（4）如果您丢失或忘记访问和使用这些数字货币所需的任何PIN或密码，数字货币可能会丢失或无法被您使用;&nbsp;</span></p>
            <p><span>（5）可能存在固有的未知技术缺陷；</span></p>
            <p><span>（6）各国家/地区可能会出台和颁布影响使用数字货币的新法律，规定和政策。</span></p>
            <p><span>3、通过同意这些服务条款或通过使用雷猫提供的矿机共享服务挖掘数字货币，您表明您理解并接受与数字货币相关的风险。</span></p>
            <p><span>4、您通过雷猫获得的矿机共享服务不得用于攻击网络，否则我们有权终止并扣除您的服务。</span></p>
            <p><span><br></span></p>
            <p><span><b>五、雷猫矿机共享套餐的费用</b></span></p>
            <p><span><br></span></p>
            <p><span>1、矿机共享套餐的费用包括：算力费和电费。</span></p>
            <p><span>2、算力费：算力费是根据数字货币市场当前价格，对未来市场预测，computing power衰减等多方因素计算而得。</span></p>
            <p><span>3、电费：雷猫收取的电费会被用于运行computing power产生的诸多费用：电费、矿机运维、散热处理等方面；雷猫保留在未来自行决定对电费进行调整的权利，但是在调整之前销售的电费包不受影响。</span></p>
            <p><span>4、您理解并同意：雷猫向您收取的具体费用规定于具体的矿机共享套餐。您如果不能接受矿机共享套餐中规定的费用，您不应就该矿机共享套餐发出订单。</span></p>
            <p><span>5、您理解并同意：由于全网算力会变化，挖矿难度也会随之变化。所以雷猫提供的矿机共享服务价格会周期性调整，但已经售出的矿机共享套餐及已经支付的电费(包括维护费)等费用不会受到影响。</span></p>
            <p><span><br></span></p>
            <p><span><b>六、雷猫矿机共享服务模式</b></span></p>
            <p><span><br></span></p>
            <p><span>1、雷猫为连接用户和矿池的桥梁。用户通过雷猫下订单购买computing power并将购买的computing power接入到其指定的矿池。用户可以到指定矿池的网站地址实时查看具体挖矿情况；</span></p>
            <p><span>2、雷猫平台接入的矿池会向用户收取一定比例的服务费，该服务费由矿池决定并收取；</span></p>
            <p><span>3、购买矿机共享套餐后产生的数字货币不经过雷猫，而是直接由矿池按照PPS模式(或PPS的衍生模式，如FPPS 、PPS+)将挖掘到的数字货币（若存在）发放到用户填写的数字货币收取地址；</span></p>
            <p><span>4、挖掘到的数字货币（若存在）的发放时间以矿池的发放时间为准，雷猫不对数字货币的发放事宜负责。</span></p>
            <p><span>5、雷猫不会对您的未来收益做出任何承诺，雷猫网站或雷猫活动页面上提到的任何与未来有关的收益或收益率(或回报率)数据均为预计和假设，实际的收益金额会受到数字货币价格、全网算力难度、矿池幸运值、矿池服务费比例等诸多因素的影响。</span></p>
            <p><span><br></span></p>
            <p><span><b>七、订单的付款、取消、更改、退款</b></span></p>
            <p><span><br></span></p>
            <p><span>1、用户可以使用雷猫平台支持的各种付款方式购买矿机共享服务；</span></p>
            <p><span>2、如果用户选择使用通过数字货币转账购买矿机共享服务：用户应将数字货币转账到雷猫 提供的数字货币账户，支付金额取决于：美元订单总和，购买时美元/
					选择付款的数字货币汇率和比特币网络转账费用（可能适用第三方条款和付款佣金）;&nbsp;</span></p>
            <p><span>3、如果用户决定不完成订单，则用户可在订单已创建但尚未支付的情况下不支付订单。该等订单的状态将在雷猫给定的一段时间后（根据付款方式）更改为超时。雷猫不会处理超时订单的请求，用户没有义务继续执行超时订单；</span></p>
            <p><span>4、用户对付款的准确性负全部责任，包括但不限于：目的地帐户地址、转账金额和其他付款细节；</span></p>
            <p><span>5、如果转账的金额低于实际要求的服务费用，雷猫保留在激活矿机共享服务之前自行决定：</span></p>
            <p><span>（1）相应地调整该矿机共享服务以使得收到的资金和提供的矿机共享服务相匹配；或</span></p>
            <p><span>（2）拒绝激活矿机共享服务直到用户支付完毕所欠款项；</span></p>
            <p><span>6、如果转账金额高于实际要求的服务费用， 用户可以选择要求雷猫：</span></p>
            <p><span>（1）根据收到的实际转账金额调整矿机共享服务；</span></p>
            <p><span>（2）将超出的金额加入用户的账户余额中；或</span></p>
            <p><span>（3）通过用户提供的且雷猫认可的方式返还超出的金额，由此产生的任何附加费用（如第三方手续费）须由用户自行承担。</span></p>
            <p><span>7、如果用户使用错误/不充分的信息和/或向错误目标帐户（该等地址不属于雷猫或受雷猫控制）发起付款，雷猫保留要求获得正确付款的权利，且对用户遭受的损失不承担任何责任并拒绝任何形式的索赔；</span></p>
            <p><span>8、用户付款后，由于数字货币确认时间等原因，用户转账的金额可能存在延迟到账的风险。雷猫有权在确认到账后再生成有效的矿机共享套餐；</span></p>
            <p><span>9、用户在没有提交付款争议解决申请的情况下，雷猫没有义务主动解决与付款相关的问题或争议：</span></p>
            <p><span>（1）用户有权在创建付款后14天内联系雷猫支持人员并提供符合雷猫要求的付款证明，以提出与付款相关的争议解决申请。对于14天后提交的申请，雷猫保留拒绝处理的权利；</span></p>
            <p><span>（2）雷猫如果有合理理由怀疑，或事实上的确未收到付款但已为用户激活矿机共享套餐，雷猫有权要求用户提供符合雷猫要求的付款证明。用户应在收到该要求后的14天内提供符合雷猫要求的付款证明；</span></p>
            <p><span>（3）付款证明应包括但不限于：雷猫订单号，唯一交易ID或号码，目的地帐户地址信息，转帐金额，来自所用支付系统的帐户对帐单；</span></p>
            <p><span>（4）若用户向雷猫发起与付款相关的争议申请，但用户未在14天内提供付款证明或提供其他符合雷猫要求的证据，或雷猫合理地认为证据不足或无效时，雷猫保留拒绝处理用户付款争议解决申请的权利
					。</span></p>
            <p><span>10、若雷猫合理认为存在付款争议，雷猫保留调整/取消相关矿机共享套餐和/或用户的账户余额的权利。</span></p>
            <p><span>11、雷猫保留随时更改矿机共享套餐类型和价格的权利。雷猫的矿机共享套餐类型和价格的更改将考虑当前市场价格。用户已经购买的矿机共享套餐不受影响；</span></p>
            <p><span>12、在法律法规允许的最大范围下，双方认可：除非另有明确书面约定，否则所有购买的矿机共享套餐均为最终购买且不可退款。雷猫保留自行决定退款的权利。如果雷猫对个别矿机共享套餐决定提供退款，不代表雷猫认可和有义务在将来同意相同或类似的退款。此退款政策不影响任何可能适用的法定权利；</span></p>
            <p><span>13、用户在此认可：若矿机共享套餐已经生效，用户由于挖矿收益不理想，挖矿服务不符合预期等原因要求终止矿机共享套餐，则雷猫只退还未使用的维护费，不退还任何使用费；</span></p>
            <p><span>14、如果雷猫根据本协议或适用法律法规提供退款，由此产生的任何附加费用（如第三方手续费）须由用户自行承担。</span></p>
            <p><span><br></span></p>
            <p><span><b>八、限制和义务</b></span></p>
            <p><span><br></span></p>
            <p><span>1、您不得利用本网站或雷猫提供的服务从事违反适用法律法规的活动。不得利用本网站制作，复制和传播以下信息：</span></p>
            <p><span>（1）煽动抵抗，破坏宪法和法律，行政法规；煽动颠覆国家政权，推翻国家制度;&nbsp; 破坏民族团结;&nbsp; &nbsp;</span></p>
            <p><span>（2）捏造或歪曲事实，散布谣言，扰乱社会秩序;&nbsp;</span></p>
            <p><span>（3）宣传封建迷信，淫秽，色情，赌博，暴力，谋杀，恐怖，教唆;&nbsp;</span></p>
            <p><span>（4）公然侮辱他人或捏造事实；</span></p>
            <p><span>（5）损害国家机关的公信力;&nbsp;</span></p>
            <p><span>（6）其他违反适用法律法规的行为;</span></p>
            <p>2、您同意遵守所有适用的法律和法规，本协议以及适用于本网站和服务的所有规则。</p>
            <p>3、您同意您应完全承担通过使用雷猫提供的服务而产生的相关税收义务。</p>
            <p>4、您同意并承诺您仅仅在为自己的利益使用雷猫提供的服务，您并未代他人或为了其他第三方的利益而使用雷猫提供的服务。</p>
            <p>5、您同意在您发现或怀疑其他用户违反本协议相关约定或存在任何欺诈或不当行为时及时与雷猫联系。</p>
            <p>6、用户不得以任何方式恶意注册本网站帐户，包括但不限于多个帐户注册以获取利润和奖励。</p>
            <p>7、用户不应该窃取其他用户帐户信息或进行其他影响其他用户账户安全的行为。</p>
            <p>8、您不得使用任何方法来屏蔽您的互联网流量和IP地址（例如Proxy，Tor，VPN等）或使用其他隐藏用户真实互联网连接的技术服务。</p>
            <p>9、用户不得将雷猫提供的computing power用于攻击网络等违法违规行为。</p>
            <p>10、在雷猫网站或应用软件上展示的任何内容的知识产权，包括但不限于文章，图片，新闻，材料，网站结构，网站布置，网站设计，除非特别说明，均由雷猫完全拥有。 用户应尊重雷猫的知识产权。</p>
            <p>11、未经雷猫授权或允许，用户不得以雷猫或本网站名义和/或使用本网站信息/数据从事任何商业活动或谋取利益。</p>
            <p>12、您承诺并保证您使用雷猫提供的矿机共享服务不会对雷猫声誉造成负面影响或使得雷猫承担法律责任或其他处罚，制裁。</p>
            <p>13、矿机共享共享服务在以下国家或地区被禁止:巴尔干半岛、白俄罗斯、缅甸、科特迪瓦(象牙海岸)，克里米亚-乌克兰、古巴、刚果民主共和国、伊朗、伊拉克、利比里亚、朝鲜、苏丹、叙利亚、委内瑞拉、津巴布韦、中国香港和中国大陆。请确认矿机共享服务在您的国家或地区是合法的。否则，您将承担一切法律后果。</p>
            <p>14、如果用户违反上述规定，雷猫保留权利直接采取一切必要措施取消违规所带来的利益，和/或通过法律手段追究用户的法律和其他相关责任。</p>
            <p><span><br></span></p>
            <p><span><b>九、违约责任</b></span></p>
            <p><span><br></span></p>
            <p><span>1、对于用户任何违反本协议的行为（包括但不限于：用户不按协议约定支付服务费用，用户使用雷猫提供的服务在用户的居住国/地区属非法等），雷猫有权随时暂停或终止为用户提供服务并要求用户赔偿雷猫受到的相关损失；</span></p>
            <p><span>2、如果雷猫有理由怀疑您以欺诈或其他不正当方式使用雷猫提供的服务和/或本网站，雷猫有权暂停向您提供服务或要求您暂停使用本网站，直到您能够提供符合雷猫要求的证明。</span></p>
            <p><span><br></span></p>
            <p><span><b>十、责任限制</b></span></p>
            <p><span><br></span></p>
            <p><span>1、雷猫提供的套餐对应的为真实算力，真实算力由于网络、矿机功率等不稳定因素会导致波动，雷猫不承诺100%稳定运行。</span></p>
            <p><span>2、雷猫提供的服务可能会受到各种因素的影响，包括但不限于自然灾害、电信运营商管制、计算机病毒、黑客攻击、战争、罢工、暴乱、政府行为、城市级别的电网供电事故等。以上风险可能对雷猫提供的服务的及时性、安全性、准确性等造成影响。雷猫不承诺承担以上风险，对此，雷猫将在法律法规允许的范围内最大限度免责。</span></p>
            <p><span>3、用户同意：雷猫提供的第三方链接/网站地址只是出于便利和参考的作用。由于该等第三方网站或链接不受雷猫控制，雷猫无法保证用户访问该等网站或链接是安全，不带病毒的。用户访问该等第三方链接以及任何其他非受雷猫控制的第三方链接导致的损失雷猫不负任何责任。</span></p>
            <p><span>4、用户了解并同意：在任何情况下，雷猫亦不就以下事项以及用户由于以下事项导致的损失承担责任：&nbsp;</span></p>
            <p><span>（1）交易利润损失；</span></p>
            <p><span>（2）服务中断；</span></p>
            <p><span>（3）信息的损坏或损失；</span></p>
            <p><span>（4）数据的损坏或损失；</span></p>
            <p><span>（5）computing power消亡或退出市场；</span></p>
            <p><span>（6）法律法规及政策因素造成的损失；</span></p>
            <p><span>（7）用户违反本协议导致的损失（包括但不限于：向雷猫提供不准确的个人信息，向第三方泄漏密码等）；</span></p>
            <p><span>（8）以及其他不受雷猫控制的事件。</span></p>
            <p><span>5、您同意并接受：您应就所有关于您违反适用法律法规或本协议的行为所产生的任何和所有责任，索赔，损失，罚款以及与此相关的任何费用（包括但不限于法院费用和合理的律师费）对雷猫及其高级职员和董事，员工，雷猫的关联实体以及它们各自的继承者，受让人进行赔偿并使其免于任何损失。</span></p>
            <p><span>6、用户同意：雷猫在本协议下对用户的全部责任不超过该用户向雷猫支付的服务费用。</span></p>
            <p><span><br></span></p>
            <p><span><b>十一、其他约定</b></span></p>
            <p><span><br></span></p>
            <p><span>1、弃权：雷猫未强制执行本协议的一条或若干条款，或未行使其在本协议项下的任何权利，或任何时候未要求用户履行其在本协议中的任何义务，均不应被理解为雷猫放弃上述有关条款，或者以任何方式影响本协议的有效性或雷猫强制执行本协议各项条款的权利，也不应阻止雷猫在任何时候采取其原本有权采取的其他任何行动。</span></p>
            <p><span>2、可分割：如果本协议的任何条款被视为不合法、无效或因任何原因而无法执行，则此等规定应视为可分割，不影响任何其它条款的法律效力。</span></p>
            <p><span>3、适用法律：因用户使用雷猫提供的服务和/或本网站而引起或与之相关的一切争议、权利主张或其它事项，均适用新加坡法律。</span></p>
            <p><span>4、与本协议有关的或由本协议引起的任何争议，先由双方协商解决，如争议产生后30天内各方无法达成一致意见的，则该争议应提交新加坡国际仲裁中心（Singapore International Arbitration
					Center），依据该委员会的仲裁规则在新加坡进行仲裁。仲裁庭由一名仲裁员组成。仲裁的结果是终局性的，对各方均有约束力。</span></p>
          </div>
        </el-row>
        <el-row class="hr"></el-row>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align:center;">
<!--        <el-button @click="contractFalg = false">取 消</el-button>-->
        <el-button type="primary" @click="contractFalg = false">清楚了解</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  import { goodsInfo, saveWallet, getWallet, buyNow, saveAddress, getUserAddress } from '/api'
  import { getItem } from './../../utils/newLocalStorage'
  import { regionData, CodeToText } from 'element-china-area-data'
  export default {
    data () {
      return {
        contractFalg: false, // 合同flag
        unpaid: 0, // 未支付金额
        buy_day: 0, // 上传电费天数
        options: regionData,
        qrCodeUrl: '', // 二维码图片
        qrCodeFalg: false, // 二维码弹框
        dialogFormVisible: false,
        paymentTypeFlag: false,
        formLabelWidth: '80px',
        electricityFalg: true, // 电费是否需要显示
        form: {
          receivingArea: '', // 收货地区
          address: '', // 详细收货地址
          consignee: '', // 收货人
          mobile: '', // 收获手机
          zipcode: '' // 邮编
        },
        loadingWarp: '', // 加载
        wallet_address: [], // 钱包地址
        underLine_address: [], // 线下收货地址
        wallet_address_flag: false, // 收货/钱包地址切换flag
        coin_id: 1,
        cycle_id: 1, // 周期的ID
        address: '', // 用户收货地址
        loading: true,
        userInputDays: '', // 用户输入电费天数
        goodsInfo: {}, // 商品详情
        paymentInputFlag: true, // 收款地址flag
        input: '',
        checked: true, // 是否同意服务协议
        lmbPayment: true, // 是否需要雷猫币支付
        electricityDay: 0, // 小字的天数
        totalElectricity: 0, // 总电费
        initMinePrice: 0, // 初始化矿机单价价格
        initTotalElectricity: 0, // 初始化总电费
        totalCase: 0, // 总费用
        electricity: '', // 初始化电费单价价格
        formLabelAlign: {
          bank_account: '',
          bank_name: '',
          bank_open: '',
          bank_title: ''
        },
        ruleForm: {
          currency: 'BTC', // 币种
          coupon: '', // 优惠劵
          trusteeshipM: '', // 托管方式
          btcAddress: '', // 钱包地址
          userAddress: '', // 用户收货地址
          orePool: '', // 矿池
          electricityDays: '', // 电费天数
          num: 1, // 购买数量
          paymentMethod: '' // 支付方式
        },
        rules: {
          // 购买数量校验
          num: [
            {required: true, message: '请确认购买数量', trigger: 'change'}
          ],
          // 币种校验
          currency: [
            {required: true, message: '请选择币种', trigger: 'change'}
          ],
          // 矿池校验
          orePool: [
            {required: true, message: '请选择一个矿池', trigger: 'change'}
          ],
          // 是否需要雷猫币支付校验
          lmbPayment: [
            {required: true, message: '请选择一个矿池', trigger: 'change'}
          ],
          // 托管方式
          trusteeshipM: [
            {required: true, message: '请选择托管方式', trigger: 'change'}
          ],
          // 钱包地址
          btcAddress: [
            {required: true, message: '请选择钱包地址', trigger: 'change'}
          ],
          // 收货地址
          userAddress: [
            {required: true, message: '请选择收货地址', trigger: 'change'}
          ],
          // 电费天数
          electricityDays: [
            {required: true, message: '请选择电费交纳天数', trigger: 'change'}
          ],
          // 支付方式
          paymentMethod: [
            {required: true, message: '请选择支付方式', trigger: 'change'}
          ]
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
    methods: {
      // 完成支付
      paymentSuccess () {
        this.qrCodeFalg = false
        this.qrCodeUrl = ''
        this.$router.push({
          path: '/user/orderList'
        })
      },
      // 取消支付
      paymentFail () {
        this.qrCodeFalg = false
        this.qrCodeUrl = ''
      },
      // 用户收货地址提交
      formCheckIn (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const { address, consignee, mobile, zipcode, receivingArea } = this.form
            const user_id = getItem('userID')
            const province = CodeToText[receivingArea[0]]
            const city = CodeToText[receivingArea[1]]
            const district = CodeToText[receivingArea[2]]
            const town = ''
            const timestamp = Date.parse(new Date()) / 1000
            const sign = this.$md5(`${user_id}__${province}__${city}__${district}__${town}__${consignee}__${mobile}__${zipcode}__${address}__${timestamp}__thundercat`)
            let params = {user_id, province, city, district, town, consignee, mobile, zipcode, address, timestamp, sign}
            saveAddress(params).then(res => {
              if (res.status === 200 && res.data.code === 1) {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                })
                this._getUserAddress()
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
      // 获取用户钱包地址
      getWallet () {
        const user_id = getItem('userID')
        if (this.ruleForm.currency === 'BTC') {
          this.coin_id = 1
        } else {
          this.coin_id = this.ruleForm.currency
        }
        const coin_id = this.coin_id
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
            this.loadingWarp.close()
            this.$message.error(res.data.msg)
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
            this.underLine_address = res.data.data
            if (this.underLine_address.length === 0) {
              console.log('数组为空')
            } else {
              console.log('数组不为空')
            }
            this.loadingWarp.close()
          } else {
            this.loadingWarp.close()
            this.$message.error(res.data.msg)
          }
        })
      },
      // 切换收币/收货地址
      switchingInput (name) {
        if (name === 2) {
          this.paymentInputFlag = false
          this.electricityFalg = false
          this.totalElectricity = 0
          this.totalCase = this.initMinePrice * this.ruleForm.num
          this.totalCase = parseFloat(this.totalCase).toFixed(2)
        } else {
          this.paymentInputFlag = true
          this.electricityFalg = true
          this.totalElectricity = this.initTotalElectricity
          this.totalCase = this.initMinePrice
          this.totalCase = (parseFloat(this.totalCase) + parseFloat(this.totalElectricity)) * this.ruleForm.num
          this.totalCase = parseFloat(this.totalCase).toFixed(2)
        }
      },
      // 拉取订单信息
      loadingOrderList () {
        this.loadingWarp = this.$loading({
          text: '加载中',
          background: 'rgba(0, 0, 0, 0.7)',
          fullscreen: true
        })
        const user_id = getItem('userID')
        const share_activity_id = this.$route.query.share_activity_id
        const goods_id = this.$route.query.goods_id
        let params = {share_activity_id, goods_id, user_id}
        goodsInfo(params).then(res => {
          if (res.status === 200 && res.data.code === 1) {
            this.goodsInfo = res.data.data
            this.electricity = res.data.data.goods.electricity
            this.totalCase = res.data.data.goods.shop_price
            this.initMinePrice = res.data.data.goods.shop_price
            this.cycle_id = res.data.data.cycle[0].cycle_id
            this.getWallet()
          } else {
            this.loadingWarp.close()
            this.$message.error(res.data.msg)
          }
        })
      },
      // 电费天数切换
      changeDays (e) {
        if (e < 200) {
          this.userInputDays = ''
        }
      },
      // 添加新的线上钱包地址
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
          if (this.ruleForm.currency === 'BTC') {
            this.coin_id = 1
          } else {
            this.coin_id = this.ruleForm.currency
          }
          const coin_id = this.coin_id
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
      // 购买矿机+电费
      buyNow () {
        const loading = this.$loading({
          text: '购买中',
          background: 'rgba(0, 0, 0, 0.7)',
          fullscreen: true
        })
        if (this.ruleForm.currency === 'BTC') {
          this.coin_id = 1
        } else {
          this.coin_id = this.ruleForm.currency
        }
        const {coupon, trusteeshipM, btcAddress, orePool, electricityDays, num, paymentMethod, userAddress} = this.ruleForm
        const user_id = getItem('userID')
        const share_activity_id = this.$route.query.share_activity_id
        const coin_id = this.coin_id
        const buy_num = num
        const cycle_id = this.cycle_id
        const coupon_id = coupon
        const mine_id = orePool
        const host_id = trusteeshipM
        const address_id = userAddress // 收货地址
        const wallet_id = btcAddress // 钱包地址
        if (electricityDays === 200) {
          this.buy_day = parseFloat(this.userInputDays) * 30
        } else {
          this.buy_day = electricityDays
        }
        const buy_day = this.buy_day
        const pay_id = paymentMethod
        const deduct_ele_by_thundercat = this.lmbPayment
        const goods_id = this.$route.query.goods_id
        const timestamp = Date.parse(new Date()) / 1000
        const sign = this.$md5(`${this.initMinePrice}__${this.electricity}__${user_id}__${timestamp}__thundercat`)
        let params = {user_id, share_activity_id, coin_id, buy_num, cycle_id, coupon_id, mine_id, host_id, address_id, wallet_id, buy_day, pay_id, goods_id, deduct_ele_by_thundercat, timestamp, sign}
        buyNow(params).then(res => {
          loading.close()
          if (res.status === 200 && res.data.code === 1) {
            if (res.data.data.pay_type < 3) {
              this.qrCodeUrl = res.data.data.base64
              this.qrCodeFalg = true
              this.paymentTypeFlag = true
              this.unpaid = res.data.data.unpaid
            } else if (res.data.data.pay_type === 3) {
              this.$message({
                message: '支付成功',
                type: 'success'
              })
              this.$router.push({
                path: '/user/orderList'
              })
            } else {
              this.qrCodeFalg = true
              this.paymentTypeFlag = false
              this.formLabelAlign.bank_account = res.data.data.address.bank_account
              this.formLabelAlign.bank_name = res.data.data.address.bank_name
              this.formLabelAlign.bank_open = res.data.data.address.bank_open
              this.formLabelAlign.bank_title = res.data.data.address.bank_title
              this.unpaid = res.data.data.unpaid
            }
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      // 提交表单
      submitForm (formName) {
        if (this.checked === false) {
          this.$message({
            message: '请勾选用户服务协议',
            type: 'warning'
          })
          return
        }
        if (this.checked === false) {
          this.$message({
            message: '请勾选用户服务协议',
            type: 'warning'
          })
          return
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.buyNow()
          } else {
            this.$message({
              message: '请检查信息是否填写完善',
              type: 'warning'
            })
            return false
          }
        })
      }
    },
    mounted () {
      this.loadingOrderList()
    },
    watch: {
      // 电费天数
      'ruleForm.electricityDays' (newName, oldName) {
        if (!(newName === '')) {
          if (newName < 200) {
            this.electricityDay = newName // 电费天数
            this.totalElectricity = parseFloat(newName) * parseFloat(this.electricity) // 总电费
            this.totalElectricity = parseFloat(this.totalElectricity).toFixed(2) // 总电费
          }
        }
      },
      // 矿机的台数
      'ruleForm.num' (newName, oldName) {
        this.totalCase = this.initMinePrice // 初始化总花费
        this.totalCase = (parseFloat(this.totalCase) + parseFloat(this.totalElectricity)) * newName // 总花费(包含电费)
        this.totalCase = parseFloat(this.totalCase).toFixed(2)
      },
      // 用户输入的天数
      userInputDays (newName, oldName) {
        if (this.ruleForm.electricityDays === 200) {
          this.totalElectricity = parseFloat(newName * this.electricity * 30).toFixed(2) // 用户输入天数*电费 = 总电费
          this.electricityDay = newName * 30 // 总天数
        }
      },
      // 总电费变化
      totalElectricity (newName, oldName) {
        this.initTotalElectricity = oldName
        this.totalCase = this.initMinePrice
        this.totalCase = (parseFloat(this.totalCase) + parseFloat(newName)) * this.ruleForm.num
        this.totalCase = parseFloat(this.totalCase).toFixed(2)
      }
    }
  }
</script>
<!--合同的样式开始-->
<style scoped>
  .serviceWarp{
    background: #ffffff;
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .serviceTitle{
    text-align: center;
    width: 100%;
    border-bottom: 1px solid #e8e8e8;
    font-family: Rubik-Medium;
    font-size: 34px;
    color: #3c4156;
    margin-bottom: 30px;
    height: 78px;
    line-height: 78px;
  }
  .content{
    /*width: 1220px;*/
    font-size: 16px;
    color: #666;
    line-height: 22px;
  }
  .hr{
    /*width: 1220px;*/
    height: 1px;
    margin: 30px 0;
    border-top: 1px solid #d8d8d8;
  }
</style>
<!--合同的样式结束-->
<style>
  .qrcodeUrlWarp{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .paymentMethodWarp{
    display: flex;
    align-items: center;
  }
  .paymentMethodItem{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .orderListWarp{
    width: 1200px;
    margin: 0 auto;
    padding: 50px;
    box-shadow: 0 2px 6px 0 rgba(4,4,4,.1);
    border-radius: 2px;
    margin-top: 20px;
  }
  .orderListForm{
    background: #f7f7f7;
    padding: 34px 50px 0;
    width: 1100px;
    margin: 0px auto;
    padding-top: 20px;
    margin-top: 20px;
  }
  .orderListHead{
    width: 1100px;
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
  .orderListMiddle{
    width: 1100px;
    margin-left: -50px;
    padding-left: 50px;
    background: #fff;
    height: 80px;
    padding-top: 20px;
    font-family: Rubik-Medium;
    font-size: 20px;
    color: #1c1f28;
    border-bottom: 1px dotted #999;
    border-top: 1px dotted #999;
  }
  .totalCost{
    border: 0px;
    height:auto;
  }
  .totalCostWarp{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .checkInBtn{
    width: 310px;
    height: 60px;
  }
  .totalCostText{
    font-family: Rubik-Medium;
    font-size: 50px;
    color: #1c1f28;
    text-align: center;
    margin-left: -300px;
    width: 1050px;
  }

  .orderListMiddleText{
    font-family: Rubik-Medium;
    font-size: 20px;
    color: #1c1f28;
    width: 1050px;
    text-align: center;
    margin-left: -300px;
  }
  .orderListMiddleText span{
    font-size: 16px;
    color: rgb(153, 153, 153);
  }
  .totalCostText span{
    font-size: 16px;
    color: rgb(153, 153, 153);
  }
  .el-form-item__label{
    text-align: left;
  }
  .powerRateTipOne{
    height: 44px;
    line-height: 44px;
    font-size: 14px;
    background: #fff4e2;
    color: #fe8b0f;
    padding-left: 46px;
    border: 1px solid rgba(255,171,9,.2);
  }
  .powerRateTipTwo{
    background: #fff;
    height: 66px;
    line-height: 66px;
    margin-top: 20px;
    padding-left: 46px;
  }
  .payment-notice {
    background: #f7f7f7;
    border: 1px solid #eee;
    padding: 30px;
    margin-top: 20px;
  }
  .payment-notice .sub-amount {
    color: #999;
  }
  .rubik-medium {
    font-weight: 700!important;
    font-size: 16px;
    color: #1c1f28;
    margin-bottom: 4px;
  }
  .payment-notice .notice-item .tips-text {
    font-size: 16px;
    color: #666;
    line-height: 19px;
  }
  .payment-notice .notice-item {
    margin-top: 15px;
  }
</style>
