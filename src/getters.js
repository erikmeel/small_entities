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

export default { equipment, equipmentValid, operations, materials, material, validMaterial, job, materialsForSubmit }
