const flashSuccess = ['flash','success']
const flashError = ['flash','error']
const flashMessageVisisble = ['flash','visisble']
const equipment = ['equipment','equipment']
const equipmentValid = ['equipment','equipmentValid']
const lastEquipmentRequestId = ['equipment', 'lastEquipmentRequestId']
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

export default { flashSuccess, flashError, flashMessageVisisble, equipment, equipmentValid, lastEquipmentRequestId, operations, materials, material, validMaterial, availableAtStorageLocation, job, jobValid, materialsForSubmit }
