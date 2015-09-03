import { Store, toImmutable } from 'nuclear-js'
import { RECEIVE_EQUIPMENT_SUCCESS, SET_JOB_VALUE, SET_OPERATION_VALUE, CONFIRM_SUCCESS } from '../actionTypes'
import moment from 'moment'
import validations from '../../common/utils/SmallEntityValidations'

const initialState = toImmutable({
  jobValid: false,
  job: {
    process: "X1",
    maint_act_type: "select",
    fixed_price: 0.0,
    execution_date: moment().format("DD.MM.YYYY"),
    description: moment().format("YYYYMMDD") + " ",
    main_workctr: "",
    plant: "",
    sales_order_text: "",
  }
})
export default Store({
  getInitialState() {
    return initialState
  },

  initialize() {
    this.on(SET_JOB_VALUE, updateJob),
    this.on(RECEIVE_EQUIPMENT_SUCCESS, receiveEquipment)
    this.on(CONFIRM_SUCCESS, confirmSuccess)
  }
})

function updateJob(state, { fieldName, value }) {
  let s = state
  s = state.setIn(['job', fieldName], value)
  return s.setIn(['jobValid'], validations.validateJob(s.getIn(['job']).toJS()))
}

function receiveEquipment(state, { equipment }) {
  let s = state
  s = s.setIn(['job', 'plant'], equipment.plant)
  if (equipment.main_workctr) {
    return s.setIn(['job', 'main_workctr'], equipment.main_workctr)
  }
}

function confirmSuccess(state) {
  return initialState
}
