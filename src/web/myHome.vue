<template>
  <div class="myHome">
    <div class="my-container">
      <tabs :tabs="tabs" ref="tab">
        <div class="my" ref="my">
          <p class="title">我的信息</p>
          <el-divider></el-divider>
          <el-form style="width: 350px" ref="info"
                   :rules="infoRules"
                   :model="info"
                   label-width="100px"
                   :hide-required-asterisk="true"
          >
            <el-form-item label="我的账号">
              <p>{{account}}<span style="margin-left: 30px"></span></p>
            </el-form-item>
            <el-form-item label="我的昵称">
              <p v-if="isDisableNickname">{{nickname}}<span style="margin-left: 30px"><i class="el-icon-edit"
                                                                                         @click="isDisableNickname=!isDisableNickname"
                                                                                         style="cursor: pointer"></i></span>
              </p>
              <el-input v-else v-model="info.nickname"></el-input>
            </el-form-item>
            <el-form-item label="我的房号">
              <p v-if="isDisableRoom">{{building}}幢{{unit}}单元{{room}}号<span style="margin-left: 30px"><i
                class="el-icon-edit" @click="isDisableRoom=!isDisableRoom" style="cursor: pointer"></i></span></p>
              <div v-else>
                <el-col :span="6">
                  <el-input v-model="info.building" placeholder="幢"></el-input>
                </el-col>
                <el-col :span="1">—</el-col>
                <el-col :span="6">
                  <el-input placeholder="单元" v-model="info.unit" autocomplete="off"></el-input>
                </el-col>
                <el-col :span="1">—</el-col>
                <el-col :span="8">
                  <el-input placeholder="房" v-model="info.room" autocomplete="off"></el-input>
                </el-col>
              </div>
            </el-form-item>
            <el-form-item label="我的7豆">
              <p>{{count}}</p>
            </el-form-item>
            <el-form-item label="我的好评">
              <p>{{star}}</p>
            </el-form-item>
            <el-form-item label="我的手机号码" prop="mobile">
              <p v-if="isDisableMob">{{mobile}}<span style="margin-left: 30px"><i class="el-icon-edit"
                                                                                  @click="isDisableMob=!isDisableMob"
                                                                                  style="cursor: pointer"></i></span>
              </p>
              <el-input v-else placeholder="mobile" v-model="info.mobile"></el-input>
            </el-form-item>
            <el-form-item label="我的email" prop="email">
              <p v-if="isDisableEmail">{{email}}<span style="margin-left: 30px"><i class="el-icon-edit"
                                                                                   @click="isDisableEmail=!isDisableEmail"
                                                                                   style="cursor: pointer"></i></span>
              </p>
              <el-input v-else placeholder="email" v-model="info.email"></el-input>
            </el-form-item>
          </el-form>
          <div class="but">
            <el-button @click.stop="submitMyInfo('info')" style="margin-left: 30px" type="primary">保存</el-button>
          </div>
          <div class="logo">
            <el-avatar shape="square" :size="100"
                       src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png">
            </el-avatar>
            <el-button style="margin-top: 15px" type="primary" icon="el-icon-edit" circle></el-button>
          </div>
        </div>
        <div class="goods" ref="goods">
          <p class="title">我的货品</p>
          <el-divider></el-divider>
          <div class="goods-list">
            <el-table
              :data="tableData"
              border
              style="width: 100%">
              <el-table-column
                fixed
                prop="time"
                label="日期"
                width="100">
              </el-table-column>
              <el-table-column
                fixed
                prop="gid"
                label="isbn"
              >
              </el-table-column>
              <el-table-column
                prop="name"
                label="名称"
                width="100">
              </el-table-column>
              <el-table-column
                prop="subsname"
                label="类别"
                width="100">
              </el-table-column>
              <el-table-column
                prop="status"
                label="现时状态"
                width="100">
              </el-table-column>
              <el-table-column
                prop="fromAdmin"
                label="审核状态"
                width="100">
              </el-table-column>
              <el-table-column
                label="操作"
                width="120">
                <template slot-scope="scope">
                  <el-button size="mini" @click="selectMyGood(scope.row)" type="text">编辑</el-button>
                  <el-button size="mini" @click="handleMyGOod(scope.row)" type="text">
                    {{isShowCancelOrEnable(scope.row)}}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="add">
            <el-form
              style="width: 400px" ref="add"
              :model="good"
              label-width="100px"
              :hide-required-asterisk="true"
              :rules="addRules"
            >
              <el-form-item label="类别选择">
                <el-cascader
                  v-model="selectType"
                  :options="options"
                  @change="selectGoodType"
                  clearable
                ></el-cascader>
              </el-form-item>
              <el-form-item label="货品名字" prop="name">
                <el-input v-model="good.name" placeholder="请输入货品名字"></el-input>
              </el-form-item>
              <el-form-item label="货品规格" prop="specification">
                <el-input v-model="good.specification" placeholder="请输入货品规格"></el-input>
              </el-form-item>
              <el-form-item label="货品详情" prop="detail">
                <el-input style="width: 600px" type="textarea" autosize placeholder="请输入货品详情"
                          v-model="good.detail"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <el-button class="but" @click="submitAddGoods('add')" type="primary">提交</el-button>
        </div>
        <div class="wish" ref="wishs">
          <p class="title">我的心愿</p>
          <el-divider></el-divider>
          <div class="wish-list">
            <el-table
              :data="wishData"
              border
              style="width: 100%">
              <el-table-column
                fixed
                prop="time"
                label="日期"
                width="100">
              </el-table-column>
              <el-table-column
                fixed
                prop="name"
                label="name"
                width="100"
              >
              </el-table-column>
              <el-table-column
                prop="info"
                label="信息"
                >
              </el-table-column>
              <el-table-column
                prop="subsname"
                label="类别"
                width="100">
              </el-table-column>
              <el-table-column
                prop="status"
                label="现时状态"
                width="100">
              </el-table-column>
              <el-table-column
                label="操作"
                width="120">
                <template slot-scope="scope">
                  <el-button size="mini" @click="selectMyWish(scope.row)" type="text">编辑</el-button>
                  <el-button size="mini" @click="handleMyHelp(scope.row)" type="text">
                    {{isShowCancelOrEnable(scope.row)}}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="add">
            <el-form
              style="width: 400px" ref="wishAdd"
              :model="wish"
              label-width="100px"
              :hide-required-asterisk="true"
              :rules="wishRules"
            >
              <el-form-item label="类别选择">
                <el-cascader
                  v-model="selectType"
                  :options="options"
                  @change="selectGoodType"
                  clearable
                ></el-cascader>
              </el-form-item>
              <el-form-item label="心愿名字" prop="name">
                <el-input v-model="wish.name" placeholder="请输入心愿名字"></el-input>
              </el-form-item>
              <el-form-item label="心愿信息" prop="info">
                <el-input v-model="wish.info" placeholder="请输入心愿信息"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <el-button class="but" @click="submitAddWish('wishAdd')" type="primary">提交</el-button>
        </div>
      </tabs>
    </div>
    <div class="info">
      <div class="shop">
        <p class="title">我的购物车</p>
        <div class="item">
          <el-collapse v-model="activeNames" accordion>
            <el-collapse-item v-for="(shop,id) in shopCarts" :key="id">
              <template slot="title">
                <span>订单号： {{shop.id}}</span>
              </template>
              <div v-for="(item, index) in shop.res" :key="index" class="collapse-item">
                <span>{{item.name}}</span>
                <span>{{item.number}}个</span>
                <span>{{item.number*item.price}}</span>
              </div>
              <div class="pending">待审核中</div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
      <div class="second-ad">

      </div>
    </div>
    <el-dialog title="我的货品" :visible.sync="dialogFormGoods">
      <el-form style="width: 350px"
               ref="good"
               :model="goodItem"
               :rules="myGoodRule"
               label-width="100px"
               :hide-required-asterisk="true"
      >
        <el-form-item label="我物品的isbn">
          <p>{{goodItem.gid}}</p>
        </el-form-item>
        <el-form-item label="我物品的名字">
          <p>{{goodItem.name}}</p>
        </el-form-item>
        <el-form-item label="我物品的规格" prop="specification">
          <el-input v-model="goodItem.specification"></el-input>
        </el-form-item>
        <el-form-item label="我物品的细节" prop="detail">
          <el-input style="width: 250%" v-model="goodItem.detail" type="textarea" autosize></el-input>
        </el-form-item>
      </el-form>
      <el-button class="but" @click="updateMyGood('good')" type="primary">更新</el-button>
      <el-button class="but" @click="dialogFormGoods=!dialogFormGoods">取消</el-button>
    </el-dialog>
    <el-dialog title="我的心愿" :visible.sync="dialogFormWishes">
      <el-form style="width: 350px"
               ref="wish"
               :model="wishItem"
               :rules="myWishRule"
               label-width="100px"
               :hide-required-asterisk="true"
      >
        <el-form-item label="心愿名字"  prop="name">
          <el-input v-model="wishItem.name"></el-input>
        </el-form-item>
        <el-form-item label="我的心愿信息" prop="info">
          <el-input v-model="wishItem.info"></el-input>
        </el-form-item>
      </el-form>
      <el-button class="but" @click="updateMyWish('wish')" type="primary">更新</el-button>
      <el-button class="but" @click="dialogFormWishes=!dialogFormWishes">取消</el-button>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapActions } from 'vuex'
import { checkUser, saveUserInfo } from '../api/user'
import { getMyHelp, upDataMyHelp, addMyHelp, handleMyHelp } from '../api/help'
import { getAllSubs, addMyGood, getMyGoods, upDataMyGood, handleMyGood } from '../api/goods'
import { getMyShopCart } from '../api/shop'
import { createGoods } from '../common/js/goods'
import { createHelps } from '../common/js/help'
import { Message } from 'element-ui'
import Tabs from '../components/tabs'

export default {
  data () {
    const validatePhone = (rule, value, callback) => {
      let num = value.toString()
      if (num.length === 11) {
        checkUser('mobile', num).then(() => {
          callback()
        }).catch((e) => {
          callback(new Error('有人使用过'))
        })
      } else {
        callback(new Error('请输入11位手机号码'))
      }
    }
    const validateEmail = (rule, value, callback) => {
      let name = value.toString()
      checkUser('email', name).then(() => {
        callback()
      }).catch((e) => {
        callback(new Error('有人注册了'))
      })
    }
    return {
      tabs: ['我的信息', '我的货品', '我的心愿'],
      info: {
        account: '',
        nickname: '',
        building: '',
        unit: '',
        room: '',
        star: '',
        count: '',
        email: '',
        mobile: ''
      },
      isDisableNickname: true,
      isDisableRoom: true,
      isDisableMob: true,
      isDisableEmail: true,
      infoRules: {
        mobile: [
          { required: true, message: '请输入您的电话！' },
          { type: 'string', message: '电话应该是数字' },
          { validator: validatePhone, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] },
          { validator: validateEmail, trigger: 'blur' }
        ]
      },
      // 我的货品列表
      tableData: [],
      // 用来类别的选择
      selectType: [],
      options: [],
      // 货品增加
      good: {
        name: '',
        specification: '',
        detail: ''
      },
      cid: '',
      sid: '',
      addRules: {
        name: [{ required: true, message: '请输入货品的名字' }],
        specification: [{ required: true, message: '请输入规格' }],
        detail: [{ required: true, message: '请介绍你的货品' }]
      },
      goodItem: {
        name: '',
        gid: '',
        specification: '',
        detail: ''
      },
      myGoodRule: {
        specification: [{ required: true, message: '请输入规格' }],
        detail: [{ required: true, message: '请介绍你的货品' }]
      },
      // wish
      wish: {
        name: '',
        info: ''
      },
      wishData: [],
      wishRules: {
        name: [{ required: true, message: '请输入心愿的名字' }],
        info: [{ required: true, message: '请输入心愿信息' }]
      },
      wishItem: {
        id: '',
        name: '',
        info: ''
      },
      myWishRule: {
        info: [{ required: true, message: '请输入信息' }]
      },
      // dialog的开启
      dialogFormGoods: false,
      dialogFormWishes: false,
      // 购物车
      activeNames: 1,
      shopCarts: []
    }
  },
  computed: {
    account () {
      return this.userInfo.account
    },
    nickname () {
      return this.userInfo.nickname
    },
    building () {
      return this.userInfo.building
    },
    unit () {
      return this.userInfo.unit
    },
    room () {
      return this.userInfo.room
    },
    count () {
      return this.userInfo.count
    },
    star () {
      return this.userInfo.star
    },
    email () {
      return this.userInfo.email === null ? '空' : this.userInfo.email
    },
    mobile () {
      return this.userInfo.mobile === null ? '空' : this.userInfo.mobile
    },
    ...mapGetters([
      'userInfo'
    ])
  },
  created () {
    this.createSubs()
    this._getMyGoods()
    this._getMyWishes()
    this._getMyShopCart()
  },
  methods: {
    // 提交我的信息
    submitMyInfo (form) {
      this.$set(this.info, 'mobile', this.isNull(this.info.mobile, this.userInfo.mobile))
      this.$set(this.info, 'email', this.isNull(this.info.email, this.userInfo.email))
      this.$refs[form].validate((valid) => {
        if (valid) {
          let info = {
            nickname: this.isNull(this.info.nickname, this.userInfo.nickname),
            building: this.isNull(this.info.building, this.userInfo.building),
            unit: this.isNull(this.info.unit, this.userInfo.unit),
            room: this.isNull(this.info.room, this.userInfo.room),
            email: this.isNull(this.info.email, this.userInfo.email),
            mobile: this.isNull(this.info.mobile, this.userInfo.mobile)
          }
          saveUserInfo(info).then(() => {
            Message({
              message: '保存成功',
              type: 'success'
            })
            window.location.reload()
            this.updateUser()
          })
        }
      })
    },
    isNull (newVal, preVal) {
      if (newVal === '') {
        return preVal
      } else {
        return newVal
      }
    },
    _getMyGoods () {
      getMyGoods().then((res) => {
        this.tableData = this.normalMyGoods(res.data)
      })
    },
    normalMyGoods (data) {
      let temp = []
      data.forEach((d) => {
        temp.push(createGoods(d))
      })
      return temp
    },
    // 收集所有的子目录
    createSubs () {
      getAllSubs().then((res) => {
        let subs = res.data
        this.options = this.normalSubs(subs)
      })
    },
    normalSubs (subs) {
      let s = []
      subs.forEach((sub) => {
        let content = sub.contents
        if (this.findContent(sub, s)) {
          let i = s.findIndex((item) => item.value === content.id)
          s[i].children.push({
            'value': sub.id,
            'label': sub.name
          })
        } else {
          let o = {
            'value': content.id,
            'label': content.name,
            'children': []
          }
          let c = {
            'value': sub.id,
            'label': sub.name
          }
          o.children.push(c)
          s.push(o)
        }
      })
      return s
    },
    findContent (sub, current) {
      if (current.length === 0) {
        return false
      }
      let content = sub.contents
      for (let i = 0; i < current.length; i++) {
        let c = current[i]
        if (c.value === content.id) {
          return true
        }
      }
    },
    submitAddGoods (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let good = {
            'cid': this.cid,
            'sid': this.sid,
            'name': this.good['name'],
            'specification': this.good['specification'],
            'detail': this.good['detail']
          }
          addMyGood(good).then(() => {
            Message({
              message: '保存成功',
              type: 'success'
            })
            this.$refs[form].resetFields()
            this._getMyGoods()
          }).catch(e => {
            Message({
              message: '已经重复登记了',
              type: 'error'
            })
          })
        }
      })
    },
    // 查看每件货品的详情，并修改
    selectMyGood (row) {
      this.dialogFormGoods = true
      let good = this.goodItem
      good.name = row.name
      good.gid = row.gid
      good.specification = row.specification
      good.detail = row.detail
    },
    handleMyGOod (row) {
      switch (row.status) {
        case '使用中':
          handleMyGood(row.gid, 10).then((res) => {
            Message({
              message: '撤销成功',
              type: 'success'
            })
            this._getMyGoods()
          })
          break
        case '暂停中':
          handleMyGood(row.gid, 11).then((res) => {
            Message({
              message: '开启成功',
              type: 'success'
            })
            this._getMyGoods()
          })
          break
      }
    },
    isShowCancelOrEnable (row) {
      let status = row.status
      if (status === '使用中') {
        return '撤销'
      } else {
        return '启用'
      }
    },
    updateMyGood (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let good = {
            'gid': this.goodItem['gid'],
            'specification': this.goodItem['specification'],
            'detail': this.goodItem['detail']
          }
          upDataMyGood(good).then((res) => {
            this.dialogFormGoods = false
            this._getMyGoods()
          })
        }
      })
    },
    selectGoodType (val) {
      this.cid = val[0]
      this.sid = val[1]
    },
    // wish部分
    _getMyWishes () {
      getMyHelp().then((res) => {
        this.wishData = this.normalWishes(res.data)
      })
    },
    normalWishes (data) {
      let temp = []
      data.forEach((d) => {
        temp.push(createHelps(d))
      })
      return temp
    },
    selectMyWish (row) {
      this.dialogFormWishes = true
      let wish = this.wishItem
      wish.id = row.id
      wish.name = row.name
      wish.info = row.info
    },
    submitAddWish (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let wish = {
            'sid': this.sid,
            'name': this.wish['name'],
            'info': this.wish['info']
          }
          addMyHelp(wish).then((res) => {
            Message({
              message: '保存成功',
              type: 'success'
            })
            this.$refs[form].resetFields()
            this._getMyWishes()
          }).catch(e => {
            Message({
              message: '已经重复登记了',
              type: 'error'
            })
          })
        }
      })
    },
    updateMyWish (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let wish = {
            'id': this.wishItem['id'],
            'name': this.wishItem['name'],
            'info': this.wishItem['info']
          }
          upDataMyHelp(wish).then((res) => {
            this.dialogFormWishes = false
            this._getMyWishes()
          }).catch(e => {
            Message({
              message: '已经重复登记了',
              type: 'error'
            })
          })
        }
      })
    },
    handleMyHelp (row) {
      switch (row.status) {
        case '使用中':
          handleMyHelp(row.id, 10).then((res) => {
            Message({
              message: '撤销成功',
              type: 'success'
            })
            this._getMyWishes()
          })
          break
        case '暂停中':
          handleMyHelp(row.id, 11).then((res) => {
            Message({
              message: '开启成功',
              type: 'success'
            })
            this._getMyWishes()
          })
          break
      }
    },
    ...mapActions([
      'updateUser'
    ]),
    _getMyShopCart () {
      getMyShopCart(1).then((res) => {
        this.shopCarts = this.shopCarts.concat(res.data)
      })
    }
  },
  watch: {
    wishData () {
      this.$nextTick(() => {
        this.$refs.tab.refresh()
      })
    },
    tableData () {
      this.$nextTick(() => {
        this.$refs.tab.refresh()
      })
    }
  },
  components: {
    Tabs
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/variable.styl"
  .myHome
    width: $width-container
    margin: 0 auto
    display: flex
    justify-content space-between
    padding-top: 20px
    .my-container
      width: 65%
      border-top: 5px solid $color-theme
      background-color: $color-background
      box-shadow: 4px 5px 8px rgba(0, 0, 0, .1)
      border-radius: 5px
      padding: 10px
      margin-bottom :100px
      .my
        position: relative
        margin-bottom: 30px

        .title
          font-size: $font-size-large-xx
          margin-left: 20px

        .logo
          position: absolute
          right: 10%
          top: 15%
          display: flex
          flex-direction: column
          align-items: center

      .goods
        margin-bottom: 30px

        .title
          font-size: $font-size-large-xx
          margin-left: 20px

        .add
          margin-top: 60px

        .but
          margin-left: 30px

      .wish
        margin-bottom: 30px
        .title
          font-size: $font-size-large-xx
          margin-left: 20px
        .add
            margin-top: 60px
        .but
            margin-left: 30px
    .info
      width: 30%
      .shop
        padding :20px
        background-color: $color-background
        .title
          font-size: $font-size-large-xx
        .item
          margin-top :20px
          .collapse-item
            width :100%
            display :flex
            justify-content :space-around
            margin-top :15px
          .pending
            color :$color-theme
            margin-top :15px
            font-size : $font-size-large
</style>
