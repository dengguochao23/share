import * as types from './mutation-type'

const mutations = {
  [types.TOKEN]: (state, token) => {
    state.token = token
  },
  [types.USERINFO]: (state, info) => {
    state.userInfo = info
  },
  [types.LOGINSTATUS]: (state, bool) => {
    state.loginStatus = bool
  }
}

export default mutations
