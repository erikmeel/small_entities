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
  var newQty = state.getIn(['itemQty', material.id, 'quantity']) - 1
  if (state.hasIn(['itemQty', material.id])) {
    return state
    .updateIn(['itemQty', material.id, 'quantity'], quantity => quantity + 1)
    .setIn(['itemQty', material.id, 'remaining_stock_quantity'], material.stock_quantity - newQty)
    .updateIn(['material','id'], i => '')
    .merge({'validMaterial': false})
  } else {
    return state
    .setIn(['itemQty', material.id], toImmutable(material))
    .setIn(['itemQty', material.id, 'quantity'], 1)
    .setIn(['itemQty', material.id, 'remaining_stock_quantity'], material.stock_quantity - 1)
    .setIn(['material'], toImmutable({'id': ''}))
    .merge({'validMaterial': false})
  }
}

function handleChangeMaterialQuantity(state, { material_id, quantity }) {
  if (quantity === 0) {
    return state.deleteIn(['itemQty', material_id])
  } else {
    return state
    .setIn(['itemQty', material_id, 'quantity'], quantity)
  }
}

function receiveMaterial(state, { material }) {
  if (material.stock_quantity) {
    return state.merge({
      'validMaterial': true,
      'availableAtStorageLocation': true,
      'material': material
    })
  } else {
    return state.merge({
      'validMaterial': true,
      'availableAtStorageLocation': false,
      'material': material
    })
  }

}

function resetMaterial(state) {
  return state.merge({
    'validMaterial': false,
    'availableAtStorageLocation': false
  })
}

function confirmSuccess(state) {
  return initialState
}
