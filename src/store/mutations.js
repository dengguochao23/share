import * as types from './mutation-type'

const mutations = {
  [types.TOKEN]: (state, token) => {
    state.token = token
  },
  [types.USERINFO]: (state, info) => {
    state.userInfo = info
  },
  [types.MYSHOP]: (state, myShop) => {
    state.myShop = myShop
  }
}

export default mutations
