import { Store, toImmutable } from 'nuclear-js'
import { RECEIVE_READINGS, READING_SUCCESS, READING_FAILED } from '../actionTypes'

const initialState = toImmutable({
	  
	})

export default Store({
  getInitialState() {
    return initialState
  },

  initialize() {
    
  }
})

function receiveReadings(state, { readings }) {
  if(readings!=null) {
	  let newReadings = toImmutable(readings)
	  	.toMap()
	  	.mapKeys((k, v) => v.get('key'))
	  return state.merge(newReadings)
  }
  else {
	  return state
  }
}

function confirmSuccess(state) {
	  return initialState
	}