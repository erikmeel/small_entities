import { Store, toImmutable } from 'nuclear-js'
import { SET_EQUIPMENT_VALUE, RECEIVE_EQUIPMENT_START, RECEIVE_EQUIPMENT_SUCCESS, RECEIVE_EQUIPMENT_FAILED, CHOOSE_EQUIPMENT, EQUIPMENT_CHOSEN, RECEIVE_CUSTOMER_SUCCESS, CONFIRM_SUCCESS } from '../actionTypes'

const initialState = toImmutable({
  lastEquipmentRequestId: '',
  equipmentValid: false,
  needToChooseEquipment: false,
  possibleEquipments: [],
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
    this.on(RECEIVE_EQUIPMENT_START, startReceiveEquipment)
    this.on(RECEIVE_EQUIPMENT_FAILED, invalidateEquipment)
    this.on(RECEIVE_EQUIPMENT_SUCCESS, receiveEquipment)
    this.on(CHOOSE_EQUIPMENT, chooseEquipment)
    this.on(EQUIPMENT_CHOSEN, receiveEquipment)
    this.on(RECEIVE_CUSTOMER_SUCCESS, receiveCustomer)
    this.on(CONFIRM_SUCCESS, confirmSuccess)
  }
})

function setEquipmentValue(state, { value }) {
  return initialState.setIn(['equipment','serial'], value)
}

function startReceiveEquipment(state, { lastEquipmentRequestId }) {
  return state.setIn(['lastEquipmentRequestId'], lastEquipmentRequestId)
}

function receiveEquipment(state, { equipment }) {
  return state.merge({
    "equipmentValid": true,
    "needToChooseEquipment": false,
    "possibleEquipments": [],
    "equipment": equipment
  })
}

function chooseEquipment(state, {equipments}) {
  return state.merge({
    "equipmentValid": false,
    "needToChooseEquipment": true,
    "possibleEquipments": equipments
  })
}

function receiveCustomer(state, { customer, customerType }) {
  let s = state
  if (customerType === 'installed_at' && customer.contacts && customer.contacts.length > 0) {
    s = s.setIn(['equipment','contact'], customer.contacts[0])
  }
  if (customerType === 'bill_to') {
    s = s.setIn(['equipment','bill_to'], customer)
  }
  return s
}

function invalidateEquipment(state) {
  return state.merge({
    "equipmentValid": false,
  })
}

function confirmSuccess(state) {
  return initialState
}
