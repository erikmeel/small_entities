import { Store, toImmutable } from 'nuclear-js'
import { CONFIRM_SUCCESS, DISMISS_FLASH } from '../actionTypes'

const initialState = toImmutable({
  error: '',
  success: '',
  visible: false,
})

export default Store({
  getInitialState() {
    return initialState
  },

  initialize() {
    this.on(CONFIRM_SUCCESS, flashSuccess)
    this.on(DISMISS_FLASH, dismissFlash)
  }
})

function flashSuccess(state) {
  return state.merge({
    'success': 'The job was successfully send to the server.',
    'visisble': true
  })
}

function dismissFlash(state) {
  return state.setIn(['visisble'], false)
}
