import backend from '../common/api/backend'
import reactor from './reactor'
import getters from './getters'
import {
  DISMISS_FLASH,
  RECEIVE_EQUIPMENT_START,
  RECEIVE_EQUIPMENT_SUCCESS,
  RECEIVE_EQUIPMENT_FAILED,
  RECEIVE_CUSTOMER_START,
  RECEIVE_CUSTOMER_SUCCESS,
  RECEIVE_CUSTOMER_FAILED,
  RECEIVE_OPERATIONS,
  CONFIRM_START,
  CONFIRM_SUCCESS,
  CONFIRM_FAILED,
  SET_EQUIPMENT_VALUE,
  SET_JOB_VALUE,
  SET_OPERATION_VALUE,
  SET_MATERIAL_VALUE,
  RECEIVE_MATERIAL_START,
  RECEIVE_MATERIAL_SUCCESS,
  RECEIVE_MATERIAL_FAILED,
  ADD_MATERIAL_TO_JOB,
  CHANGE_MATERIAL_QUANTITY,
  INVALID_MATERIAL_INPUT,
  RESET_TO_INITIAL,
} from './actionTypes'

import _ from 'underscore'

export default {

  dismissFlash() {
    reactor.dispatch(DISMISS_FLASH)
  },

  setEquipmentValue(value) {
    reactor.dispatch(SET_EQUIPMENT_VALUE, { value });
  },

  fetchEquipment(equipment) {
    const lastEquipmentRequestId = _.uniqueId('equipment_')
    reactor.dispatch(RECEIVE_EQUIPMENT_START, {lastEquipmentRequestId})
    backend.getEquipment(equipment, lastEquipmentRequestId,
      equipment => {
        if (lastEquipmentRequestId != reactor.evaluate(getters.lastEquipmentRequestId)) { return }
        reactor.dispatch(RECEIVE_EQUIPMENT_SUCCESS, {equipment})
        if (equipment.installed_at) {
          this.getCustomer(equipment.installed_at, "installed_at")
        }
        if (equipment.bill_to) {
          this.getCustomer(equipment.bill_to, "bill_to")
        }
      },
      () => {
        if (lastEquipmentRequestId != reactor.evaluate(getters.lastEquipmentRequestId)) { return }
        reactor.dispatch(RECEIVE_EQUIPMENT_FAILED)
      });
  },

  getCustomer(customer, customerType) {
    reactor.dispatch(RECEIVE_CUSTOMER_START)
    backend.getCustomer(customer,
      customer => {
        reactor.dispatch(RECEIVE_CUSTOMER_SUCCESS, {customer, customerType})
      },
      () => {reactor.dispatch(RECEIVE_CUSTOMER_FAILED)
    });
  },

  setJobValue(fieldName, value) {
    reactor.dispatch(SET_JOB_VALUE, { fieldName, value, });
  },

  setMaterialValue(value) {
    reactor.dispatch(SET_MATERIAL_VALUE, { value });
  },

  invalidateMaterialInput() {
    reactor.dispatch(INVALID_MATERIAL_INPUT)
  },

  getMaterial(number) {
    reactor.dispatch(RECEIVE_MATERIAL_START)
    backend.getMaterial(number, reactor.evaluateToJS(getters.job).main_workctr, material => {
      reactor.dispatch(RECEIVE_MATERIAL_SUCCESS, {material})
    }, () => {reactor.dispatch(RECEIVE_MATERIAL_FAILED)});
  },

  addMaterialToJob(material) {
    reactor.dispatch(ADD_MATERIAL_TO_JOB, { material })
  },

  changeMaterialQuantity(material_id, quantity) {
    reactor.dispatch(CHANGE_MATERIAL_QUANTITY, { material_id, quantity })
  },

  setOperationValue(operationId, fieldName, value) {
    reactor.dispatch(SET_OPERATION_VALUE, { operationId, fieldName, value, });
  },

  submitJob() {
    reactor.dispatch(CONFIRM_START)
    backend.submitJob(reactor.evaluateToJS(getters.job), reactor.evaluateToJS(getters.equipment), reactor.evaluateToJS(getters.operations), reactor.evaluateToJS(getters.materialsForSubmit),
    () => {
      reactor.dispatch(CONFIRM_SUCCESS)
    },
    () => {
      reactor.dispatch(CONFIRM_FAILED)
    })
  },

  resetToIntial() {
    reactor.dispatch(RESET_TO_INITIAL)
  }
}
