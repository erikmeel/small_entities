import { Store, toImmutable } from 'nuclear-js'
import { SET_EQUIPMENT_VALUE, RECEIVE_EQUIPMENT_SUCCESS, RECEIVE_EQUIPMENT_FAILED, CONFIRM_SUCCESS } from '../actionTypes'

const initialState = toImmutable({
  equipmentValid: false,
  equipment: {
    serial: "",
    name: "",
  }
})

export default Store({
  getInitialState() {
    return initialState
  },

  initialize() {
    this.on(SET_EQUIPMENT_VALUE, setEquipmentValue)
    this.on(RECEIVE_EQUIPMENT_FAILED, invalidateEquipment)
    this.on(RECEIVE_EQUIPMENT_SUCCESS, receiveEquipment)
    this.on(CONFIRM_SUCCESS, confirmSuccess)
  }
})

function setEquipmentValue(state, { value }) {
  return state.setIn(['equipment','serial'], value)
}

function receiveEquipment(state, { equipment }) {
  return state.merge({
    "equipmentValid": true,
    "equipment": equipment
  })
}

function invalidateEquipment(state) {
  return state.merge({
    "equipmentValid": false,
  })
}

function confirmSuccess(state) {
  return initialState
}
