import shop from '../common/api/shop'
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
  SET_JOB_VALUE,
  SET_OPERATION_VALUE,
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

  setJobValue(fieldName, value) {
    reactor.dispatch(SET_JOB_VALUE, { fieldName, value, });
  },

  setOperationValue(operationId, fieldName, value) {
    reactor.dispatch(SET_OPERATION_VALUE, { operationId, fieldName, value, });
  },

  submitJob() {
    reactor.dispatch(CONFIRM_START)
    backend.submitJob(reactor.evaluateToJS(getters.job), () => {
      reactor.dispatch(CONFIRM_SUCCESS)
    })
    // reactor.dispatch(RECEIVE_EQUIPMENT_FAILED)
  }
}
