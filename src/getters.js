const products = ['products']

const cartProducts = [
  ['products'],
  ['cart', 'itemQty'],
  (products, itemQty) => {
    return itemQty.map((quantity, productId) => {
      var product = products.get(productId)
      return product
        .set('quantity', quantity)
        .remove('inventory') // inventory shouldnt be known in cart
    }).toList()
  }
]

const cartTotal = [
  cartProducts,
  (items) => {
    const total = items.reduce((total, item) => {
      return total + (item.get('quantity')* item.get('price'))
    }, 0) || 0
    return total.toFixed(2)
  }
]

const equipment = ['equipment','equipment']
const equipmentValid = ['equipment','equipmentValid']
const operations = ['operations']
const materials = ['materials', 'itemQty']
const material = ['materials', 'material']
const validMaterial = ['materials', 'validMaterial']
const job = ['job']

const materialsForSubmit = [
  ['materials', 'itemQty'],
  (itemQty) => {
    return itemQty.map((material) => {
      return material.set('material', material.get('id'))
    }).toList()
  }
]

export default { products, cartProducts, cartTotal, equipment, equipmentValid, operations, materials, material, validMaterial, job, materialsForSubmit }
