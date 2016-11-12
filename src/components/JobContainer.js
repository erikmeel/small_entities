import React from 'react'
import { Input } from 'react-bootstrap'

import JobFixedPrice from '../../common/components/JobFixedPrice'
import validations from '../../common/utils/SmallEntityValidations'

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
      job: getters.job,
      equipment: getters.equipment,
      workcenterDisabled: getters.jobWorkcenterDisabled
    }
  },

  updateField(fieldName, e) {
	  if(fieldName == 'contract_item_display') {
		  if(e.target.value.indexOf('/')>0) {
			  actions.setJobValue('contract', e.target.value.substring(0, e.target.value.indexOf('/')));
			  actions.setJobValue('contract_item', e.target.value.substring(e.target.value.indexOf('/')+1));
		  } else {  
			  actions.setJobValue('contract', '');
			  actions.setJobValue('contract_item', '');
		  }
	  }
	  else {
		  actions.setJobValue(fieldName, e.target.value);
	  }
  },

  render: function () {
	  //general vars:
	  var today = new Date();
	  var dd = today.getDate();
	  var mm = today.getMonth()+1; //January is 0!
	  var yyyy = today.getFullYear();
	  
    let job = this.state.job.toJS();
    let equipment = this.state.equipment.toJS();
    
    let processCreateClassName = "marked end";
    let processPlanClassName = "unmarked";
    let processConfirmClassName = "unmarked";
    let processInvoiceClassName = "unmarked";
    let processTECOClassName = "unmarked";
    if (job.process === 'X3') {
      processCreateClassName = "marked";
      processPlanClassName = "marked end";
      processConfirmClassName = "unmarked";
      processInvoiceClassName = "unmarked";
      processTECOClassName = "unmarked";
    } else if (job.process === 'X4') {
      processCreateClassName = "marked";
      processPlanClassName = "marked";
      processConfirmClassName = "marked end";
      processInvoiceClassName = "unmarked";
      processTECOClassName = "unmarked";
    } else if (job.process === 'X1') {
      processCreateClassName = "marked";
      processPlanClassName = "marked";
      processConfirmClassName = "marked";
      processInvoiceClassName = "marked end";
      processTECOClassName = "marked end";
    }
    
    var fixedPrice = <div></div>;
    if (job.maint_act_type.match(/^(FP|OH|MX|CX|UC|UP)/)) {
      fixedPrice = <JobFixedPrice job={job} onUpdateField={this.updateField} bsStyle={validations.vs(validations.validatePriceForFlow(job.fixed_price, job.maint_act_type))} />
    }
    var remarksCustomer = <div></div>;
    if (job.process.match(/^(X1|X4)/)) {
      remarksCustomer = <Input type="textarea" label="Remarks Customer (Visible on Invoice)" placeholder="Remarks Customer" value={job.sales_order_text} onChange={this.updateField.bind(this, "sales_order_text")} />
    }
    
    var invoiceOrTeco = <div></div>;
    if (job.maint_act_type.match(/^(IC|IS)/)) {
    	invoiceOrTeco = <label className={processTECOClassName}><input type='radio' name='process' value='X1' checked={job.process === 'X1'} disabled={validations.validateDisableInvoice(job.maint_act_type)} onChange={this.updateField.bind(this, "process")}></input><span>Complete</span> <span className="glyphicon glyphicon-triangle-top process-marker"></span></label>
    } else if (job.maint_act_type.match(/^(SG|GW|PG|GL|WG|SW|CU)/)) {
    	invoiceOrTeco = <div></div>;
    } else {
    	invoiceOrTeco = <label className={processInvoiceClassName}><input type='radio' name='process' value='X1' checked={job.process === 'X1'} disabled={validations.validateDisableInvoice(job.maint_act_type)} onChange={this.updateField.bind(this, "process")}></input><span>Invoice</span> <span className="glyphicon glyphicon-triangle-top process-marker"></span></label>
    }
    var contractSelect = <div></div>;
    var jobCUSelect = <div></div>;
    if (equipment.contracts != null) {
    	var optionList = [];	//create list to contain multiple option values in case of multiple contract lines
    	var placeholder = "";
    	var classNameSelect = "";
    	var inputSelectContract = null;
    	var optionItem = React.createElement('option', {value: 'select', label: 'Select contract line' }, null);
    	if(equipment.contracts != null) {  //enable selection of flow = CU in case contract line exist
    		jobCUSelect = "";//<option value="CU">Unplanned Contract Service (CU)</option>;
    		if(job.maint_act_type == '') { //if(job.maint_act_type == 'CU')  //temporary disabled
    			if(equipment.contracts.length > 1) {  //multiple options in case more than 1 contract line found
    				optionList.push(optionItem);
    				for(var i=0; i < equipment.contracts.length; i++) {
    					var contract_item_display = parseInt(equipment.contracts[i].contract, 10)+"/"+parseInt(equipment.contracts[i].item,10);
    					var contract_enddate = equipment.contracts[i].enddate;
    					contract_enddate = contract_enddate.substring(6,8)+"/"+contract_enddate.substring(4,6)+"/"+contract_enddate.substring(0,4);
    					var contract_desc = contract_item_display + " "+equipment.contracts[i].type+" end:"+contract_enddate;
    					var optionItem = React.createElement('option', {value: contract_item_display, label: contract_desc }, null);
    					optionList.push(optionItem);
    				}
    				placeholder = 'select';
    				if(job.contract_item == '' || job.contract_item == 'select') {
    					contract_item_display = '';
    					classNameSelect = 'has-feedback has-error';
    				}
    				else {
    					contract_item_display = job.contract+"/"+job.contract_item;
    					classNameSelect = 'has-feedback has-success';
    				}
    				inputSelectContract = React.createElement('select', {name: 'contract_item_display', className: 'form-control', type: 'select', label: 'Contract', value: contract_item_display, onChange: this.updateField.bind(this, "contract_item_display"), bsStyle:validations.vs(validations.validateContractItem(job.maint_act_type,contract_item_display)), placeholder: placeholder, hasFeedback:true }, optionList);
    			} else {  //otherwise, only 1 contract line. Fill an input box with contract pre-filled
    				classNameSelect = 'has-feedback has-success';
    				var contract_item_display = parseInt(equipment.contracts[0].contract,10)+"/"+parseInt(equipment.contracts[0].item,10);
    				inputSelectContract = React.createElement('input', {className: 'form-control', label: 'Contract', disabled: 'disabled', value: contract_item_display }, null);
    				job.contract = parseInt(equipment.contracts[0].contract,10);
    				job.contract_item = parseInt(equipment.contracts[0].item,10);
    			}
    		}
    	}
    	else {  //no contract exists and flow cannot proceed
    		var contract_item = "no contract found";
    		classNameSelect = 'has-feedback has-error';
			inputSelectContract = React.createElement('input', {className: 'control-label', label: 'Contract', disabled: 'disabled', value: contract_item }, null);
    	}
    	if(job.maint_act_type == 'CU') {
    		classNameSelect = 'form-group '+classNameSelect
    		contractSelect = React.createElement('div', {className: classNameSelect},
    				React.createElement('label', {className: 'control-label'}, 'Contract'),
    				inputSelectContract);
    	}
    }
    var SalesEmployee = <div></div>;
    if (job.maint_act_type.match(/^(FP|OH|MX|CX|UC|UP|CH)/)) {
    	SalesEmployee = <Input type="number" name="sales_person" label="Sales Employee" placeholder="Sales Employee nr" value={job.sales_person} onChangeSalesPerson={this.changeSalesPerson} bsStyle={validations.vs(validations.validateSalesPerson(job.sales_person))} hasFeedback onChange={this.updateField.bind(this, "sales_person")} />
    }
    
    return (
      <div className="row job-details">
      	<div className="col-lg-2">
      	</div>
        <div className="col-lg-8">
          <div className="form-inline">
            <div className='process-select'>
              <label className={processCreateClassName}><input type='radio' name='process' value='X2' checked={job.process === 'X2'} onChange={this.updateField.bind(this, "process")}></input><span className="process-label">Create</span> <span className="glyphicon glyphicon-triangle-top process-marker"></span></label>
              <label className={processPlanClassName}><input type='radio' name='process' value='X3' checked={job.process === 'X3'} onChange={this.updateField.bind(this, "process")}></input><span>Plan</span> <span className="glyphicon glyphicon-triangle-top process-marker"></span></label>
              <label className={processConfirmClassName}><input type='radio' name='process' value='X4' checked={job.process === 'X4'} onChange={this.updateField.bind(this, "process")}></input><span>Confirm</span> <span className="glyphicon glyphicon-triangle-top process-marker"></span></label>
              { invoiceOrTeco }
            </div>
            <Input type='select' label='Flow' placeholder='select' value={job.maint_act_type} onChange={this.updateField.bind(this, "maint_act_type")} bsStyle={validations.vs(validations.validateFlow(job.maint_act_type))} hasFeedback>
              <option value="select">Select a Flow</option>
              <option value="FP">Fixed Price (FP)</option>
              <option value="CH">Service Repair (CH)</option>
              { jobCUSelect }
              <option value="SG">Service Goodwill (SG)</option>
              <option value="GW">Sales Goodwill (GW)</option>
              <option value="IC">Internal Machine Work (IC)</option>
              <option value="IS">Internal Service Work (IS)</option>
              <option value="PG">Product Company Warranty (PG)</option>
              <option value="GL">Customer Center Warranty (GL)</option>
              <option value="WG">Customer Center Service Warranty (WG)</option>
              <option value="SW">Product Company Service Warranty (SW)</option>
            </Input>
            { fixedPrice }
            { contractSelect }
            <Input type="text" label="Execution Date" placeholder="Execution Date" value={job.execution_date} bsStyle={validations.vs(validations.validateExecutionDate(job.execution_date))} hasFeedback onChange={this.updateField.bind(this, "execution_date")} />
            <Input type="text" label="Work Center" placeholder="Work Center" value={job.main_workctr} bsStyle={validations.vs(validations.validateMainWorkcenter(job.main_workctr))} hasFeedback onChange={this.updateField.bind(this, "main_workctr")} disabled={this.state.workcenterDisabled} />
            { SalesEmployee }
            <Input type="text" label="Purchase Order" placeholder="Purchase Order" value={job.purchase_order} hasFeedback onChange={this.updateField.bind(this, "purchase_order")} />
            <Input type="text" label="Description" placeholder="Description" value={job.description} bsStyle={validations.vs(validations.validateDescription(job.description))} hasFeedback onChange={this.updateField.bind(this, "description")} />
            { remarksCustomer }
          </div>
        </div>
      </div>
    );
  },
});
