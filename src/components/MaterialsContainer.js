import React from 'react'

import Material from '../../common/components/Material'
import MaterialList from '../../common/components/MaterialList'
import MaterialInput from '../../common/components/MaterialInput'

import reactor from '../reactor'
import getters from '../getters'
import actions from '../actions'


const MaterialListContainer = React.createClass({
  render() {
    return (
      <MaterialList title="Materials">
        <div className="row">
          <div className="form-group col-xs-3">
            <h4>Number</h4>
          </div>
          <div className="form-group col-xs-5">
            <h4>Description</h4>
          </div>
          <div className="form-group col-xs-1">
            <h4>Stock</h4>
          </div>
          <div className="form-group col-xs-3">
            <h4>Used</h4>
          </div>
        </div>
        {this.props.materials.map(function (material) {
          return <MaterialContainer material={material.toJS()} />;
        })}
      </MaterialList>
    );
  }
});

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
    actions.setMaterialValue(event.target.value)
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
    var materialListContainer = <div></div>;
    if (this.state.materials && this.state.materials.size > 0) {
      materialListContainer = <MaterialListContainer materials={this.state.materials} />
    }
    return (
      <div>
        <h2>Materials</h2>
        { materialListContainer }
        <MaterialInput key="material_input" material={this.state.material.toJS()} onChangeMaterial={this.changeMaterialInput} validMaterial={this.state.validMaterial} addMaterial={this.addMaterial} />
      </div>
    );
  },
});
