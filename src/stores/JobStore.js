import { Store, toImmutable } from 'nuclear-js'
import { RECEIVE_EQUIPMENT_SUCCESS, SET_JOB_VALUE, SET_OPERATION_VALUE } from '../actionTypes'
import moment from 'moment'

export default Store({
  getInitialState() {
    return toImmutable({
      process: "X1",
      maint_act_type: "select",
      fixed_price: 0.0,
      execution_date: moment().format("DD.MM.YYYY"),
      description: moment().format("YYYYMMDD") + " ",
      equipment: "",
      plant: "",
    })
  },

  initialize() {
    this.on(SET_JOB_VALUE, updateJob),
    this.on(SET_OPERATION_VALUE, updateOperation),
    this.on(RECEIVE_EQUIPMENT_SUCCESS, receiveEquipment)
  }
})

function updateJob(state, { fieldName, value }) {
  return state.set(fieldName, value)
}

function updateOperation(state, { operationId, fieldName, value }) {
  return state.set(operationId, value)
}

function receiveEquipment(state, { equipment }) {
  var s = state.merge(equipment);
  s.merge({'equipment': equipment.id})
  return s
}
