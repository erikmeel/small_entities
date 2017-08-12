'use strict';

import { Input, Button, Select, Option, Label, FormGroup } from 'react-bootstrap';

var React = require('react');

var SubConMaterialInput = React.createClass({
  render: function () {
    var help = ""
    
    var subconMaterialInput = <Input type="text" placeholder="Input Subcontracting material to add to the job" help={help} onChange={this.props.onChangeSubConMaterial} value={this.props.subconmaterial.id} />
    if (this.props.validSubConMaterial) {
      var buttonAddMaterial = <Button className="form-control" onClick={this.props.addSubContracting}>Add Subcontracting Material</Button>
      var subconMaterialLabel = <Label class="form-control" text={this.props.subconmaterial.material} />
      var vendorInput = <Input type="text" class="form-control" placeholder="Enter vendor" onChange={this.props.onChangeVendor} value={this.props.subconmaterial.vendor} />
      var priceInput = <Input type="number" class="form-control" placeholder="Enter price" onChange={this.props.onChangePrice} value={this.props.subconmaterial.price} />
      subconMaterialInput = React.createElement('div', {className: 'form-inline'}, subconMaterialLabel, vendorInput, priceInput, buttonAddMaterial); //<div className="form-group">{subconMaterialLabel}{vendorInput}{priceInput}{buttonAddMaterial}</div>
    } else {
    	if(this.props.materialList && this.props.materialList.size > 0) {
    		var optionList = [];
    		var optionItem = React.createElement('option', {key: 1, value: this.props.subconmaterial.id, label: "Select subcontracting" }, null);
    		optionList.push(optionItem);
    		for(var i=0; i < this.props.materialList.size; i++) {
    			var sub_con_material = this.props.materialList.toJS()[i].material;
    			var sub_con_desc = this.props.materialList.toJS()[i].description;
    			var optionItem = React.createElement('option', {key: sub_con_material, value: sub_con_material, label: sub_con_material+" - "+sub_con_desc }, null);
    			optionList.push(optionItem);
    		}    		
    		subconMaterialInput = React.createElement('select', {name: 'subcon_select', className: 'form-control', type: 'select', label: 'Subcontracting', value: this.props.subconmaterial.id, onChange: this.props.onChangeSubConMaterial, placeholder: "test", hasFeedback:true }, optionList);
    	}
    }

    return (
      <div>{ subconMaterialInput }</div>
    );
  }
});

module.exports = SubConMaterialInput;
