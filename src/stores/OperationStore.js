import { Store, toImmutable } from 'nuclear-js'
import { RECEIVE_OPERATIONS, SET_OPERATION_VALUE, CONFIRM_SUCCESS, RESET_TO_INITIAL } from '../actionTypes'

var _operations = require('../../common/api/operations.json')

const initialState = toImmutable(_operations).toMap().mapKeys((k, v) => v.get('key'))

export default Store({
  getInitialState() {
    return initialState
  },

  initialize() {
    this.on(RECEIVE_OPERATIONS, receiveOperations)
    this.on(SET_OPERATION_VALUE, updateOperation)
    this.on(CONFIRM_SUCCESS, confirmSuccess)
    this.on(RESET_TO_INITIAL, resetToIntial)
  }
})

function receiveOperations(state, { operations }) {
  let newOperations = toImmutable(operations)
    .toMap()
    .mapKeys((k, v) => v.get('key'))
  return state.merge(newOperations)
}

function updateOperation(state, {operationId, fieldName, value}) {
  return state.setIn([operationId, fieldName], value)
}

function confirmSuccess(state) {
  return initialState
}

function resetToIntial(state) {
  return initialState
}
