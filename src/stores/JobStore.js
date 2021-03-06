import { Store, toImmutable } from 'nuclear-js'
import { RECEIVE_EQUIPMENT_SUCCESS, EQUIPMENT_CHOSEN, SET_JOB_VALUE, SET_OPERATION_VALUE, CONFIRM_SUCCESS, CONFIRM_FAILED, RESET_TO_INITIAL, WORKCENTER_INPUT_DISABLE, WORKCENTER_INPUT_ENABLE } from '../actionTypes'
import moment from 'moment'
import validations from '../../common/utils/SmallEntityValidations'

const initialState = toImmutable({
  jobValid: false,
  jobWorkcenterDisabled: false,
  job: {
    process: "X4",
    maint_act_type: "CH",
    fixed_price: 0.0,
    execution_date: moment().format("DD.MM.YYYY"),
    description: moment().format("YYYYMMDD") + " ",
    main_workctr: "",
    plant: "",
    sales_order_text: "",
    purchase_order: "",
    sales_person: "",
    actual_running_hours: "",
    contract: "",
    contract_item: ""
  }
})
export default Store({
  getInitialState() {
    return initialState
  },

  initialize() {
	let errMessage = ""  
    this.on(SET_JOB_VALUE, updateJob),
    this.on(RECEIVE_EQUIPMENT_SUCCESS, receiveEquipment)
    this.on(EQUIPMENT_CHOSEN, receiveEquipment)
    this.on(CONFIRM_SUCCESS, confirmSuccess)
    this.on(RESET_TO_INITIAL, resetToIntial)
    this.on(WORKCENTER_INPUT_DISABLE, workcenterDisable)
    this.on(WORKCENTER_INPUT_ENABLE, workcenterEnable)
    this.on(CONFIRM_FAILED, confirmFailed, {errMessage})
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
  s = s.setIn(['job', 'actual_running_hours'], equipment.actual_running_hours)
  if (equipment.main_workctr) {
    s = s.setIn(['job', 'main_workctr'], equipment.main_workctr)
  }
  s = s.setIn(['jobValid'], validations.validateJob(s.getIn(['job']).toJS()))
  return s
}

function confirmSuccess(state) {
  return initialState
}

function confirmFailed(state, {errMessage}) {
	return state.setIn(['jobConfirmFailedMsg'], errMessage)
}

function resetToIntial(state) {
  return initialState
}

function workcenterDisable(state) {
  return state.setIn(['jobWorkcenterDisabled'], true)
}

function workcenterEnable(state) {
  return state.setIn(['jobWorkcenterDisabled'], false)
}
