import { Store, toImmutable } from 'nuclear-js'
import { ADD_MATERIAL_TO_JOB, RECEIVE_MATERIAL_SUCCESS, RECEIVE_MATERIAL_FAILED, CHANGE_MATERIAL_QUANTITY } from '../actionTypes'

export default Store({
  getInitialState() {
    return toImmutable({
      'itemQty': {},
      'validMaterial': false,
      'material' : {
        'id': ''
      }
    })
  },

  initialize() {
    this.on(ADD_MATERIAL_TO_JOB, addMaterialToJob)
    this.on(CHANGE_MATERIAL_QUANTITY, handleChangeMaterialQuantity)
    this.on(RECEIVE_MATERIAL_SUCCESS, receiveMaterial)
    this.on(RECEIVE_MATERIAL_FAILED, resetMaterial)
  }
})

function addMaterialToJob(state, { material }) {
  return (state.hasIn(['itemQty', material.id]))
    ? state.updateIn(['itemQty', material.id, 'quantity'], quantity => quantity + 1)
    : state.setIn(['itemQty', material.id], toImmutable(material)).setIn(['itemQty', material.id, 'quantity'], 1)
}

function handleChangeMaterialQuantity(state, { material_id, quantity }) {
  if (quantity === 0) {
    return state.deleteIn(['itemQty', material_id])
  } else {
    return state.setIn(['itemQty', material_id, 'quantity'], quantity)
  }
}

function receiveMaterial(state, { material }) {
  return state.merge({
    'validMaterial': true,
    'material': material
  })
}

function resetMaterial(state) {
  return state.merge({
    'validMaterial': false
  })
}
