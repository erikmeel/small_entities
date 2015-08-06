import { Store, toImmutable } from 'nuclear-js'
import { ADD_MATERIAL_TO_JOB } from '../actionTypes'

export default Store({
  getInitialState() {
    return toImmutable({materials: []})
  },

  initialize() {
    this.on(ADD_MATERIAL_TO_JOB, addMaterialToJob)
  }
})

function addMaterialToJob(state, { material }) {
  return (state.hasIn(['itemQty', material.id]))
    ? state.updateIn(['itemQty', material.id], quantity => quantity + 1)
    : state.setIn(['itemQty', material.id], 1)
}
