const flashSuccess = ['flash','success']
const flashMessageVisisble = ['flash','visisble']
const equipment = ['equipment','equipment']
const equipmentValid = ['equipment','equipmentValid']
const operations = ['operations']
const materials = ['materials', 'itemQty']
const material = ['materials', 'material']
const validMaterial = ['materials', 'validMaterial']
const availableAtStorageLocation = ['materials', 'availableAtStorageLocation']
const job = ['job', 'job']
const jobValid = ['job', 'jobValid']

const materialsForSubmit = [
  ['materials', 'itemQty'],
  (itemQty) => {
    return itemQty.map((material) => {
      return material.set('material', material.get('id'))
    }).toList()
  }
]

export default { flashSuccess, flashMessageVisisble, equipment, equipmentValid, operations, materials, material, validMaterial, availableAtStorageLocation, job, jobValid, materialsForSubmit }
