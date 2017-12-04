import { Store, toImmutable } from 'nuclear-js'
import { SET_EQUIPMENT_VALUE, RECEIVE_EQUIPMENT_START, RECEIVE_EQUIPMENT_SUCCESS, RECEIVE_EQUIPMENT_FAILED, CHOOSE_EQUIPMENT, EQUIPMENT_CHOSEN, RECEIVE_CUSTOMER_SUCCESS, CONFIRM_SUCCESS, SET_READINGS_VALUE, READING_SUCCESS, SET_USEWAREHOUSE } from '../actionTypes'

var _companies = require('../../common/api/companies.json')

const initialState = toImmutable({
  lastEquipmentRequestId: '',
  equipmentValid: false,
  needToChooseEquipment: false,
  possibleEquipments: [],
  equipment: {
    serial: "",
    name: "",
  },
  useCentralWarehouse: false
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
    this.on(SET_READINGS_VALUE, updateReadings)
    this.on(READING_SUCCESS, updateReadingList)
    this.on(SET_USEWAREHOUSE, setUseWarehouse)
  }
})

function setEquipmentValue(state, { value }) {
  return initialState.setIn(['equipment','serial'], value)
}

function startReceiveEquipment(state, { lastEquipmentRequestId }) {
  return state.setIn(['lastEquipmentRequestId'], lastEquipmentRequestId)
}

function receiveEquipment(state, { equipment }) {
	var companies = toImmutable(_companies).toMap().mapKeys((k, v) => v.get('key'))
	var useCentralWarehouse = false;
	if(companies.get(equipment.plant)) {
		useCentralWarehouse = true
	}
  return state.merge({
    "equipmentValid": true,
    "needToChooseEquipment": false,
    "possibleEquipments": [],
    "equipment": equipment,
    "useCentralWarehouse": useCentralWarehouse
  })
}

function setUseWarehouse(state, useCentralWarehouse) {
	return state.merge({
		"useCentralWarehouse": useCentralWarehouse
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

function updateReadings(state, {readDate, readTime, readBy, readVal, readText}) {
	if(readVal != 0) {
	  let s = state
	  s = s.setIn(['equipment', 'new_actual_reading_date'], readDate)
	  s = s.setIn(['equipment', 'new_actual_reading_time'], readTime)
	  s = s.setIn(['equipment', 'new_actual_reading_by'], readBy)
	  s = s.setIn(['equipment', 'new_actual_reading_val'], readVal)
	  s = s.setIn(['equipment', 'new_actual_reading_text'], readText)
	  return s.setIn(['equipment', 'save_reading'], true)
	} 
	else {
		let s = state
		s = s.setIn(['equipment', 'new_actual_reading_date'], readDate)
		s = s.setIn(['equipment', 'new_actual_reading_time'], readTime)
		s = s.setIn(['equipment', 'new_actual_reading_by'], readBy)
		s = s.setIn(['equipment', 'new_actual_reading_text'], readText)
		return s.setIn(['equipment', 'save_reading'], false)
	}
}

function updateReadingList(state, {readings}) {
	let s = state
	s = s.setIn(['equipment', 'actual_running_hours'], readings[0].readVal)
	return s.setIn(['equipment', 'readings'], readings)
}
