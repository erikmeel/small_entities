import React from 'react'

import Material from '../../common/components/Material'
import MaterialList from '../../common/components/MaterialList'
import MaterialInput from '../../common/components/MaterialInput'

import reactor from '../reactor'
import getters from '../getters'
import actions from '../actions'


const MaterialContainer = React.createClass({
  changeQuantity(number, event) {
    actions.changeMaterialQuantity(number, parseInt(event.target.value))
  },

  render() {
    return (
      <Material key={this.props.key} material={this.props.material} handleMaterialQuantityChange={this.changeQuantity} />
    );
  }
});


export default React.createClass({
  mixins: [reactor.ReactMixin],

  changeMaterialInput(event) {
    if (event.target.value.length === 10) {
      actions.getMaterial(event.target.value)
    } else {
      if (this.state.validMaterial)
        validMaterial: actions.invalidateMaterialInput()
    }
  },

  addMaterial() {
    actions.addMaterialToJob(this.state.material.toJS())
  },

  getDataBindings() {
    return {
      materials: getters.materials,
      material: getters.material,
      validMaterial: getters.validMaterial
    }
  },

  render: function () {
    return (
      <div>
        <MaterialList title="Materials">
          {this.state.materials.map(function (material) {
            return <MaterialContainer material={material.toJS()} />;
          })}
        </MaterialList>
        <MaterialInput key="material_input" material={this.state.material.toJS()} onChangeMaterial={this.changeMaterialInput} validMaterial={this.state.validMaterial} addMaterial={this.addMaterial} />
      </div>
    );
  },
});
