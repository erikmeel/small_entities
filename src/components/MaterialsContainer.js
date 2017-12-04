import React from 'react'

import Material from '../../common/components/Material'
import SubConMaterial from '../../common/components/SubConMaterial'
import MaterialList from '../../common/components/MaterialList'
import MaterialInput from '../../common/components/MaterialInput'
import SubConMaterialInput from '../../common/components/SubConMaterialInput'

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
          <div className="form-group col-xs-4">
            <h4>Description</h4>
          </div>
          <div className="form-group col-xs-1">
            <h4>Stock</h4>
          </div>
          <div className="form-group col-xs-2">
          <h4>Location</h4>
        </div>
          <div className="form-group col-xs-2">
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

const SubConMaterialListContainer = React.createClass({
	  render() {
	    return (
	      <MaterialList title="Subcontracting">
	        <div className="row">
	          <div className="form-group col-xs-3">
	            <h4>Number</h4>
	          </div>
	          <div className="form-group col-xs-5">
	            <h4>Description</h4>
	          </div>
	          <div className="form-group col-xs-2">
	            <h4>Vendor</h4>
	          </div>
	          <div className="form-group col-xs-2">
	            <h4>Price</h4>
	          </div>
	        </div>
	        {this.props.subconmaterials.map(function (subconmaterial) {
	          return <SubConMaterialContainer subconmaterial={subconmaterial.toJS()} />;
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

const SubConMaterialContainer = React.createClass({
	  
	  render() {
	    return (
	      <SubConMaterial key={this.props.key} subconmaterial={this.props.subconmaterial} subconvendor={this.props.subconvendor} subconprice={this.props.subconprice} />
	    );
	  }
	});

export default React.createClass({
  mixins: [reactor.ReactMixin],

  changeMaterialInput(event) {
	var chkCentralWarehouse = document.getElementById("chkCentralWarehouse");
    actions.setMaterialValue(event.target.value,chkCentralWarehouse.checked)
    if (event.target.value.length >= 6) {
      actions.getMaterial(event.target.value,chkCentralWarehouse.checked)
    } else {
      if (this.state.validMaterial)
        validMaterial: actions.invalidateMaterialInput()
    }
  },
  
  changeSubConMaterialInput(event) {
	actions.setSubConMaterialValue(event.target.value)
	if (event.target.value.length >= 4) {
	  var plant = this.state.equipment.toJS().plant	
      actions.getSubConMaterial(event.target.value, plant)
    } else {
      if (this.state.validSubConMaterial)
        validSubConMaterial: actions.invalidateSubConMaterialInput()
    }
  },

  addMaterial() {
    actions.addMaterialToJob(this.state.material.toJS())
  },
  
  addSubContracting() {
	actions.addSubContractingToJob(this.state.subconmaterial.toJS())  
  },
  
  toggleWarehouse() {
	  actions.setUseWarehouse(event.target.checked)
	  actions.getMaterial(this.state.material.toJS().id,event.target.checked)
  },

  getDataBindings() {
    return {
      equipment: getters.equipment,
      materials: getters.materials,
      material: getters.material,
      validMaterial: getters.validMaterial,
      availableAtStorageLocation: getters.availableAtStorageLocation,
      subconmaterials: getters.subconmaterials,
      subconmaterial: getters.subconmaterial,
     // addedSubConMaterials: getters.addedsubconmaterials,
      validSubConMaterial: getters.validSubConMaterial,
      useCentralWarehouse: getters.useCentralWarehouse
    }
  },

  render: function () {
	var useCentralWarehouse = <div></div>;
	useCentralWarehouse = React.createElement('input', {type: "checkbox",id:'chkCentralWarehouse',checked:this.state.useCentralWarehouse,onChange:this.toggleWarehouse}, React.createElement('label', {htmlFor:'chkCentralWarehouse',id:'lblCentralWarehouse'}," Use Central Warehouse"));
    var materialListContainer = <div></div>;
    if (this.state.materials && this.state.materials.size > 0) {
      materialListContainer = <MaterialListContainer materials={this.state.materials} />
    }
    var subconListContainer = <div></div>;
    if(this.state.addedSubConMaterials && this.state.addedSubConMaterials.size > 0) {
    	subconListContainer = <SubConMaterialListContainer subconmaterials={this.state.addedSubConMaterials} />
    }
    return (
//      <div>
      	<div className="row material-details">
      		<div className="col-lg-8 col-lg-offset-2">
      			{ useCentralWarehouse }
      		</div>
      		<div className="col-lg-8 col-lg-offset-2">
      			{ materialListContainer }
      			<MaterialInput key="material_input" material={this.state.material.toJS()} onChangeMaterial={this.changeMaterialInput} validMaterial={this.state.validMaterial} availableAtStorageLocation={this.state.availableAtStorageLocation} useCentralWarehouse= {this.state.useCentralWarehouse} addMaterial={this.addMaterial} />
      		</div>
      	</div>
//      	<div className="row material-details">
//      		<div className="col-lg-8 col-lg-offset-2">
//      			{ subconListContainer }
//      			<SubConMaterialInput key="subcon_input" subconmaterial={this.state.subconmaterial.toJS()} onChangeSubConMaterial={this.changeSubConMaterialInput} validSubConMaterial={this.state.validSubConMaterial} materialList={this.state.subconmaterials} addSubContracting={this.addSubContracting} />
//      		</div>
//      	</div>
//      </div>
    );
  },
});
