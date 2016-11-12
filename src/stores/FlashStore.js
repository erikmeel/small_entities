import { Store, toImmutable } from 'nuclear-js'
import { CONFIRM_SUCCESS, CONFIRM_FAILED, DISMISS_FLASH } from '../actionTypes'

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
    let errMessage = ""
    this.on(CONFIRM_SUCCESS, flashSuccess)
    this.on(CONFIRM_FAILED, flashError, {errMessage})
    this.on(DISMISS_FLASH, dismissFlash)
  }
})

function flashSuccess(state) {
  return state.merge({
    'success': 'The job was successfully send to the server.',
    'visisble': true
  })
}

function flashError(state, {errMessage}) {
  return state.merge({
    'error': 'There was something wrong while sending to the server. ' + errMessage,
    'visisble': true
  })
}

function dismissFlash(state) {
  return state.setIn(['visisble'], false)
}
