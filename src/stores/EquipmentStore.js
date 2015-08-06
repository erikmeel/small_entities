import { Store, toImmutable } from 'nuclear-js'
import { RECEIVE_EQUIPMENT_SUCCESS, RECEIVE_EQUIPMENT_FAILED } from '../actionTypes'

export default Store({
  getInitialState() {
    return toImmutable({
      equipmentValid: false,
      equipment: {
        serial: "",
        name: "",
      }
    })
  },

  initialize() {
    this.on(RECEIVE_EQUIPMENT_FAILED, invalidateEquipment)
    this.on(RECEIVE_EQUIPMENT_SUCCESS, receiveEquipment)
  }
})

function receiveEquipment(state, { equipment }) {
  return state.merge({
    "equipmentValid": true,
    "equipment": equipment
  })
}

function invalidateEquipment(state) {
  return state.merge({
    "equipmentValid": false,
    "equipment": {
      "name": "",
      "main_workctr": "",
      "plant": "",
    }
  })
}
