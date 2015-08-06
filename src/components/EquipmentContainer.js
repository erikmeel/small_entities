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
    if (event.target.value.length > 5) {
      actions.fetchEquipment(event.target.value)
    }
  },

  render: function () {
    let equipment = this.state.equipment.toJS()
    return (
      <div>
        <h2>Equipment Details</h2>
        <Equipment equipment={equipment} equipmentValid={this.state.equipmentValid} onEquipmentChanged={this.equipmentChange}/>
      </div>
    );
  },
});
