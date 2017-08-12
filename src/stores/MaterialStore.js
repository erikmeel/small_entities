import { Store, toImmutable } from 'nuclear-js'
import { SET_MATERIAL_VALUE, SET_SUBCON_MATERIAL_VALUE, ADD_MATERIAL_TO_JOB, RECEIVE_MATERIAL_SUCCESS, RECEIVE_MATERIAL_FAILED, CHANGE_MATERIAL_QUANTITY, RECEIVE_SUBCON_MATERIAL_START, RECEIVE_SUBCON_MATERIAL_SUCCESS, RECEIVE_SUBCON_MATERIAL_FAILED, ADD_SUBCON_MATERIAL_TO_JOB, CONFIRM_SUCCESS, INVALID_MATERIAL_INPUT, RESET_TO_INITIAL } from '../actionTypes'

const initialState = toImmutable({
  'itemQty': {},
  'validMaterial': false,
  'validSubConMaterial': false,
  'material': {
	  'id':''
  },
  'selectSubConMaterial': false,
  'subcon_materials': [],
  'addedsubconmaterials': [],
  'subconmaterial': {}
  
})

export default Store({
  getInitialState() {
    return initialState
  },

  initialize() {
    this.on(SET_MATERIAL_VALUE, setMaterialValue)
    this.on(SET_SUBCON_MATERIAL_VALUE, setSubConMaterialValue)
    this.on(ADD_MATERIAL_TO_JOB, addMaterialToJob)
    this.on(CHANGE_MATERIAL_QUANTITY, handleChangeMaterialQuantity)
    this.on(RECEIVE_MATERIAL_SUCCESS, receiveMaterial)
    this.on(RECEIVE_MATERIAL_FAILED, resetMaterial)
    this.on(RECEIVE_SUBCON_MATERIAL_SUCCESS, receiveSubConMaterial)
    this.on(RECEIVE_SUBCON_MATERIAL_FAILED, resetSubConMaterial)
    this.on(ADD_SUBCON_MATERIAL_TO_JOB, addSubContractingToJob)
    this.on(CONFIRM_SUCCESS, confirmSuccess)
    this.on(INVALID_MATERIAL_INPUT, resetMaterial)
    this.on(RESET_TO_INITIAL, resetToIntial)
  }
})

function setMaterialValue(state, { value }) {
  return state.setIn(['material','id'], value)
}

function setSubConMaterialValue(state, { value }) {
	  return state.setIn(['subconmaterial','id'], value)
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
	    'validSubConMaterial':false,
	    'availableAtStorageLocation': false
	  })
}

function receiveSubConMaterial(state, { subconmaterial}) {
	var test = 5;
	if(subconmaterial && subconmaterial.subcon_materials.length>1) {
		return state.merge({
			'selectSubConMaterial': true,
			'validSubConMaterial': false,
			'subcon_materials': subconmaterial.subcon_materials
		})
	} else {
		return state.merge({
			'selectSubConMaterial': false,
			'validSubConMaterial': true,
			'subcon_materials': [],
			'subconmaterial': subconmaterial.subcon_materials[0]
		})
	}
	
}

function resetSubConMaterial(state) {
	  return state.merge({
		    'selectSubConMaterial': false,
		    'validSubConMaterial':false,
		    'subcon_materials': [],
		    'subconmaterial': {}
		  })
}

function addSubContractingToJob(state) {
	
}

function confirmSuccess(state) {
  return initialState
}

function resetToIntial(state) {
  return initialState
}
