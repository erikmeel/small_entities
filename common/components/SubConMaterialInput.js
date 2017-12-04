'use strict';

import { Input, Button, Select, Option, Label, FormGroup } from 'react-bootstrap';

var React = require('react');

var SubConMaterialInput = React.createClass({
  render: function () {
    var help = ""
    
    var subconMaterialInput = <Input type="text" placeholder="Input Subcontracting material to add to the job" help={help} onChange={this.props.onChangeSubConMaterial} value={this.props.subconmaterial.id} />
    if (this.props.validSubConMaterial) {
      var buttonAddMaterial = <Button className="col-lg-2" onClick={this.props.addSubContracting}>Add Subcontracting Material</Button>
      var subconMaterialLabel = <div className="col-lg-4">{this.props.subconmaterial.lv_matnr} - {this.props.subconmaterial.lv_maktx}</div>
      var subConInput = <div className="col-lg-8"><Input type="text" className="col-lg-4 form-inline" placeholder="Enter vendor" onChange={this.props.onChangeVendor} value={this.props.subconmaterial.vendor} /><Input type="number" className="col-lg-4 form-inline" placeholder="Enter price" onChange={this.props.onChangePrice} value={this.props.subconmaterial.price}  buttonAfter={buttonAddMaterial} /></div>
      //var priceInput = 
      subconMaterialInput = <div className="form-inline">{subconMaterialLabel}{subConInput}</div>  //React.createElement('div', {className: 'form-inline'}, subconMaterialLabel, subConInput); //<div className="form-group">{subconMaterialLabel}{vendorInput}{priceInput}{buttonAddMaterial}</div>
    } else {
    	if(this.props.materialList && this.props.materialList.size > 0) {
    		var optionList = [];
    		var optionItem = React.createElement('option', {key: 1, value: this.props.subconmaterial.id, label: "Select subcontracting" }, null);
    		optionList.push(optionItem);
    		for(var i=0; i < this.props.materialList.size; i++) {
    			var sub_con_material = this.props.materialList.toJS()[i].lv_matnr;
    			var sub_con_desc = this.props.materialList.toJS()[i].lv_maktx;
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
