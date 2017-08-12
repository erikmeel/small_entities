const flashSuccess = ['flash','success']
const flashError = ['flash','error']
const flashMessageVisisble = ['flash','visisble']
const equipment = ['equipment','equipment']
const equipmentValid = ['equipment','equipmentValid']
const lastEquipmentRequestId = ['equipment', 'lastEquipmentRequestId']
const needToChooseEquipment = ['equipment', 'needToChooseEquipment']
const possibleEquipments = ['equipment', 'possibleEquipments']
const operations = ['operations']
const readings = ['readings', 'readings']
const materials = ['materials', 'itemQty']
const subconmaterials = ['subconmaterials','subcon_materials']
const addedSubConMaterials = ['subconmaterials','addedsubconmaterials']
const material = ['materials', 'material']
const subconmaterial = ['subconmaterials', 'subconmaterial']
const validMaterial = ['materials', 'validMaterial']
const validSubConMaterial = ['subconmaterials', 'validSubConMaterial']
const availableAtStorageLocation = ['materials', 'availableAtStorageLocation']
const job = ['job', 'job']
const jobValid = ['job', 'jobValid']
const jobWorkcenterDisabled = ['job', 'jobWorkcenterDisabled']
const jobReadBy = ['job', 'readBy']
const jobReadDate = ['job', 'readDate']
const jobReadVal = ['job', 'readVal']
const jobReadText = ['job', 'readText']

const materialsForSubmit = [
  ['materials', 'itemQty'],
  (itemQty) => {
    return itemQty.map((material) => {
      return material.delete('name').set('material', material.get('id'))
    }).toList()
  }
]

export default { flashSuccess, flashError, flashMessageVisisble, equipment, equipmentValid, lastEquipmentRequestId, needToChooseEquipment, possibleEquipments, operations, materials, subconmaterials, material, subconmaterial, validMaterial, validSubConMaterial, addedSubConMaterials, availableAtStorageLocation, job, jobValid, materialsForSubmit, jobWorkcenterDisabled, jobReadBy, jobReadDate, jobReadVal, jobReadText }
