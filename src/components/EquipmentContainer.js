import React from 'react'

import Equipment from '../../common/components/Equipment'
import EquipmentList from '../../common/components/EquipmentList'

import reactor from '../reactor'
import getters from '../getters'
import actions from '../actions'


export default React.createClass({
  mixins: [reactor.ReactMixin],
  
  getInitialState: function() {
	    return {
	    	
	    }
	  },

  getDataBindings() {
    return {
      equipment: getters.equipment,
      equipmentValid: getters.equipmentValid,
      needToChooseEquipment: getters.needToChooseEquipment,
      possibleEquipments: getters.possibleEquipments
    }
  },

  equipmentChange(event) {
    actions.setEquipmentValue(event.target.value)
    if (event.target.value.length > 3) {
      actions.fetchEquipment(event.target.value)
    }
    if (event.target.value.length === 0) {
      actions.resetToIntial()
    }
  },

  selectEquipment(equipmentId) {
    let equipments = this.state.possibleEquipments.toJS()
    let readings = []
    if(this.state.readings)
    	readings = this.state.readings.toJS()
    let equipment
    for (var i = 0; i < equipments.length; i++) {
      if (equipments[i].id === equipmentId) {
        equipment = equipments[i]
      }
    }
    actions.selectEquipment(equipment)
  },
  
  measurementDocSave(point, equipment, readDate, readTime, readBy, readVal, readText) {
	  actions.setReadingsValue(point, equipment, readDate, readTime, readBy, readVal, readText);
  },

  render: function () {
    let equipment = this.state.equipment.toJS()
    let equipmentList = <div></div>
    if (this.state.needToChooseEquipment) {
      equipmentList = <EquipmentList equipments={this.state.possibleEquipments} onEquipmentSelected={this.selectEquipment} />
    }
    return (
      <div>
        <Equipment equipment={equipment} equipmentValid={this.state.equipmentValid} onEquipmentChanged={this.equipmentChange} onMeasurementDocSave={this.measurementDocSave} />
        {equipmentList}
      </div>
    );
  },
});
