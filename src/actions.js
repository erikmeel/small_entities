import backend from '../common/api/backend'
import reactor from './reactor'
import getters from './getters'
import {
  RECEIVE_PRODUCTS,
  ADD_TO_CART,
  CHECKOUT_START,
  CHECKOUT_SUCCESS,
  CHECKOUT_FAILED,
  RECEIVE_EQUIPMENT_START,
  RECEIVE_EQUIPMENT_SUCCESS,
  RECEIVE_EQUIPMENT_FAILED,
  RECEIVE_OPERATIONS,
  CONFIRM_START,
  CONFIRM_SUCCESS,
  CONFIRM_FAILED,
  SET_EQUIPMENT_VALUE,
  SET_JOB_VALUE,
  SET_OPERATION_VALUE,
  RECEIVE_MATERIAL_START,
  RECEIVE_MATERIAL_SUCCESS,
  RECEIVE_MATERIAL_FAILED,
  ADD_MATERIAL_TO_JOB,
  CHANGE_MATERIAL_QUANTITY,
  INVALID_MATERIAL_INPUT,
} from './actionTypes'

export default {
  fetchProducts() {
    shop.getProducts(products => {
      reactor.dispatch(RECEIVE_PRODUCTS, { products })
    });
  },

  addToCart(product) {
    reactor.dispatch(ADD_TO_CART, { product })
  },

  cartCheckout() {
    const productsInCart = reactor.evaluateToJS(getters.cartProducts)

    reactor.dispatch(CHECKOUT_START)

    shop.buyProducts(productsInCart, () => {
      console.log("YOU BOUGHT: ", productsInCart)

      reactor.dispatch(CHECKOUT_SUCCESS)

      // uncomment out to see a rollback when a checkout fails
      //setTimeout(() => {
      //reactor.dispatch(CHECKOUT_FAILED)
      //}, 1000)
    });
  },

  fetchEquipment(equipment) {
    reactor.dispatch(RECEIVE_EQUIPMENT_START)
    backend.getEquipment(equipment, equipment => {
      reactor.dispatch(RECEIVE_EQUIPMENT_SUCCESS, {equipment})
    }, () => {reactor.dispatch(RECEIVE_EQUIPMENT_FAILED)});
  },

  fetchOperations() {
    backend.getOperations(operations => {
      reactor.dispatch(RECEIVE_OPERATIONS, {operations})
    });
  },

  addMaterialToJob(material) {
    reactor.dispatch(ADD_MATERIAL_TO_JOB, { material })
  },

  changeMaterialQuantity(material_id, quantity) {
    reactor.dispatch(CHANGE_MATERIAL_QUANTITY, { material_id, quantity })
  },

  setEquipmentValue(value) {
    reactor.dispatch(SET_EQUIPMENT_VALUE, { value });
  },

  setJobValue(fieldName, value) {
    reactor.dispatch(SET_JOB_VALUE, { fieldName, value, });
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

  getMaterial(number) {
    reactor.dispatch(RECEIVE_MATERIAL_START)
    backend.getMaterial(number, 'BE01', '1000', material => {
      reactor.dispatch(RECEIVE_MATERIAL_SUCCESS, {material})
    }, () => {reactor.dispatch(RECEIVE_MATERIAL_FAILED)});
  },

  invalidateMaterialInput() {
    reactor.dispatch(INVALID_MATERIAL_INPUT)
  }
}
