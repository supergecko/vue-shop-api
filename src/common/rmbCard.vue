<template>
  <div class="account">
    <button @click="showAdd"
            class="btn">新增</button>
    <el-table :data="tableData"
              style="width: 100%;margin-bottom: 20px;margin-top:50px"
              height="400">
      <el-table-column prop="bank"
                       label="开户银行"
                       width="180">
      </el-table-column>
      <el-table-column prop="address"
                       label="开户地址"
                       width="210">
      </el-table-column>
      <el-table-column prop="cardNum"
                       label="卡号"
                       width="180">
      </el-table-column>
      <el-table-column prop="cardhold"
                       label="持卡人"
                       width="140">
      </el-table-column>
      <el-table-column prop="tag"
                       label="提现状态"
                       width="150"
                       :filters="[
      { text: '待提现', value: '待提现' },
      { text: '确认中', value: '确认中' },
      { text: '已完成', value: '已完成' },
      { text: '已取消', value: '已取消' },
      { text: '已关闭', value: '已关闭' },
      ]"
                       :filter-method="filterTag"
                       filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag :type="scope.row.tag === '已关闭' ? 'danger' :
           scope.row.tag === '已完成' ? 'success':
           scope.row.tag === '已取消' ? 'info':
           scope.row.tag === '确认中' ? 'warning':''"
                  close-transition>{{scope.row.tag}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click.native.prevent="deleteRow(scope.$index, tableData)"
                     type="text"
                     size="small">
            撤回
          </el-button>
          <el-button type="text"
                     size="small">提现</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="add"
         v-show="isAdd">
      <div class="title">
        新增提现账号
        <i @click="closeAdd"
           class="el-icon-close"></i>
      </div>
      <div class="infoWrap">
        <div class="inTitle">开卡银行<span style="color: red">*</span>:</div>
        <input class="iput"
               type="text"
               v-model="addInfo.bank">
      </div>
      <div class="infoWrap">
        <div class="inTitle">开卡地区<span style="color: red">*</span>:</div>
        <input class="iput"
               type="text"
               v-model="addInfo.address">
      </div>
      <div class="infoWrap">
        <div class="inTitle">卡号<span style="color: red">*</span>:</div>
        <input class="iput"
               type="text"
               v-model="addInfo.cardNum">
      </div>
      <div class="infoWrap">
        <div class="inTitle">持卡人<span style="color: red">*</span>:</div>
        <input class="iput"
               type="text"
               v-model="addInfo.cardhold">
      </div>
      <button style="margin-left: 130px"
              class="addBtn"
              @click="add">保存</button>
      <button style="background: #ccc"
              class="addBtn"
              @click="cancel">取消</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'account',
  data: function () {
    return {
      tableData: [
        { bank: '中国建设银行', address: '福建省福州市鼓楼区软件园', cardNum: '12345678912345678912', cardhold: '王中军', operation: '', tag: '已关闭' },
        { bank: '中国建设银行', address: '福建省福州市鼓楼区软件园', cardNum: '12345678912345678912', cardhold: '吕小布', operation: '', tag: '已关闭' }
      ],
      isAdd: false,
      addInfo: {
        bank: '',
        address: '',
        cardNum: '',
        cardhold: ''
      }
    }
  },
  methods: {
    showAdd () {
      this.isAdd = true
    },
    closeAdd () {
      this.isAdd = false
    },
    add () {
      this.tableData.push(this.addInfo)
      this.isAdd = false
    },
    cancel () {
      this.isAdd = false
    },
    deleteRow (index, rows) {
      this.$confirm('您确认撤回提现地址吗', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        rows.splice(index, 1)
        this.$message({
          type: 'success',
          message: '撤回成功!'
        })
      }).catch(() => {

      })
    },
    formatter (row, column) {
      return row.orderID
    },
    filterTag (value, row) {
      return row.tag === value
    }
  }
}
</script>

<style scoped>
.account {
  position: relative;
}
.btn {
  background-color: rgb(244, 172, 40);
  color: #fff;
  padding: 10px 40px;
  border-radius: 3px;
  position: absolute;
  top: -50px;
  right: 0;
}
.add {
  position: fixed;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  width: 450px;
  /* height: 300px; */
  top: 380px;
  left: 580px;
  z-index: 999;
}
.title {
  background-color: rgb(235, 235, 235);
  padding: 5px 10px;
  position: relative;
  margin-bottom: 5px;
}
.el-icon-close {
  position: absolute;
  width: 30px;
  height: 30px;
  padding: 2px;
  right: 0;
  top: 0;
  text-align: center;
  line-height: 25px;
}
.infoWrap {
  display: flex;
  flex-direction: row;
  padding: 5px 10px 0;
  align-items: center;
}
.inTitle {
  width: 90px;
}
.iput {
  border: 1px solid #ccc;
  padding: 10px;
  width: 250px;
}
.addBtn {
  background-color: rgb(244, 172, 40);
  padding: 10px 30px;
  border-radius: 3px;
  color: #fff;
  margin-top: 15px;
  margin-left: 10px;
  margin-bottom: 10px;
}
</style>