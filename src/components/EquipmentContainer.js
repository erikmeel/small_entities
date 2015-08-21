import React from 'react'

import Equipment from '../../common/components/Equipment'

import reactor from '../reactor'
import getters from '../getters'
import actions from '../actions'


export default React.createClass({
  mixins: [reactor.ReactMixin],

  getDataBindings() {
    return {
      equipment: getters.equipment,
      equipmentValid: getters.equipmentValid
    }
  },

  equipmentChange(event) {
    actions.setEquipmentValue(event.target.value)
    if (event.target.value.length > 3) {
      actions.fetchEquipment(event.target.value)
    }
  },

  render: function () {
    let equipment = this.state.equipment.toJS()
    return (
      <div>
        <Equipment equipment={equipment} equipmentValid={this.state.equipmentValid} onEquipmentChanged={this.equipmentChange}/>
      </div>
    );
  },
});
