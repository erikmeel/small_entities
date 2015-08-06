import { Store, toImmutable } from 'nuclear-js'
import { RECEIVE_OPERATIONS, SET_OPERATION_VALUE } from '../actionTypes'

export default Store({
  getInitialState() {
    return toImmutable({})
  },

  initialize() {
    this.on(RECEIVE_OPERATIONS, receiveOperations)
    this.on(SET_OPERATION_VALUE, updateOperation)
  }
})

function receiveOperations(state, { operations }) {
  let newOperations = toImmutable(operations)
    .toMap()
    .mapKeys((k, v) => v.get('key'))
  return state.merge(newOperations)
}

function updateOperation(state, {operationId, fieldName, value}) {
  return state.setIn([operationId, fieldName], parseFloat(value))
}
