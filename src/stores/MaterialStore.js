import { Store, toImmutable } from 'nuclear-js'
import { SET_MATERIAL_VALUE, ADD_MATERIAL_TO_JOB, RECEIVE_MATERIAL_SUCCESS, RECEIVE_MATERIAL_FAILED, CHANGE_MATERIAL_QUANTITY, CONFIRM_SUCCESS, INVALID_MATERIAL_INPUT } from '../actionTypes'

const initialState = toImmutable({
  'itemQty': {},
  'validMaterial': false,
  'material' : {
    'id': ''
  }
})

export default Store({
  getInitialState() {
    return initialState
  },

  initialize() {
    this.on(SET_MATERIAL_VALUE, setMaterialValue)
    this.on(ADD_MATERIAL_TO_JOB, addMaterialToJob)
    this.on(CHANGE_MATERIAL_QUANTITY, handleChangeMaterialQuantity)
    this.on(RECEIVE_MATERIAL_SUCCESS, receiveMaterial)
    this.on(RECEIVE_MATERIAL_FAILED, resetMaterial)
    this.on(CONFIRM_SUCCESS, confirmSuccess)
    this.on(INVALID_MATERIAL_INPUT, resetMaterial)
  }
})

function setMaterialValue(state, { value }) {
  return state.setIn(['material','id'], value)
}

function addMaterialToJob(state, { material }) {
  return (state.hasIn(['itemQty', material.id]))
    ? state.updateIn(['itemQty', material.id, 'quantity'], quantity => quantity + 1).updateIn(['itemQty', material.id, 'stock_quantity'], quantity => quantity - 1).updateIn(['material','id'], i => '').merge({'validMaterial': false})
    : state.setIn(['itemQty', material.id], toImmutable(material)).setIn(['itemQty', material.id, 'quantity'], 1).updateIn(['itemQty', material.id, 'stock_quantity'], quantity => quantity - 1).updateIn(['material','id'], i => '').merge({'validMaterial': false})
}

function handleChangeMaterialQuantity(state, { material_id, quantity }) {
  if (quantity === 0) {
    return state.deleteIn(['itemQty', material_id])
  } else {
    return state.setIn(['itemQty', material_id, 'quantity'], quantity).updateIn(['itemQty', material_id, 'stock_quantity'], quantity => quantity - 1)
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

function confirmSuccess(state) {
  return initialState
}
