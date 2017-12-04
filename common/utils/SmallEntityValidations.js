'use strict';

var Validator = exports;

var validator = require('validator')
var moment = require('moment')

Validator.vs = function (b) {
  var result = 'error';
  if (b)
    result = 'success'
  return result
}

Validator.validateProcess = function (process) {
  //X1	= Up to Invoicing (chargeable orders only)
  //X2  = Only create order
  //X3  = Stop after plan of order
  //X4  = Stop after confirmation
  //X4  = TECO of unchargeable order	
  return process.match(/^(X1|X2|X3|X4)/) !== null
}

Validator.validateFlow = function (flow) {
  return flow.match(/^(FP|CH|SG|GW|IC|IS|PG|GL|SW|WG|CU)/) !== null
};

Validator.validateContractItem = function (flow, contract_item) {
	if(flow.match(/^(CU)/)!== null)
		return contract_item != "" && contract_item != "select";
	else 
		return true;
}

Validator.validateExecutionDate = function (date) {
  return date.match(/^\d{2}\.\d{2}\.\d{4}$/) && moment(date, 'DD.MM.YYYY').isValid()
};

Validator.validateMainWorkcenter = function (workcenter) {
  //return workcenter && (workcenter.match(/^\w{2}\d{2}\w\d{3}$/) || workcenter.match(/^\w{2}\d{2}\w{2}\d{2}$/) ) !== null
	return workcenter && (workcenter.match(/^\w{8}$/)) !== null
};

Validator.validateDisableInvoice = function (flow) {
	var result = '';
	if (flow.match(/^(EC|PG|GL|SW|WG)/) !== null) {
		result = 'disabled';
	}
	return result;
}

Validator.validatePlant = function (plant) {
  return plant && plant.match(/^\w{4}$/) !== null
};

Validator.validateDescription = function (description) {
  return !validator.isNull(description)
};

Validator.validatePurchaseOrder = function (purchase_order) {
	return !validator.isNull(purchase_order)
};

Validator.validateSalesPerson = function (sales_person) {
	var iSP = parseInt(sales_person);
	return iSP > 0;
}

Validator.validatePriceForFlow = function (price, flow) {
  if (flow.match(/^(CH|IC|IS|SG|GW|PG|GL|SW|WG|CU)/) !== null) {
    return true
  }
  return validator.isFloat(price, { min: 1.0})
};

Validator.validateSubConVendor = function (vendor) {
	  var iVendor = parseInt(vendor, 0);
	  return iVendor > 0;
	};

Validator.validateSubConValue = function (value) {
	  var fValue = parseFloat(value);
	  return fValue > 0;
	};

Validator.validateRunningHours = function (prev_Reading, new_Reading) {
	if (new_Reading > prev_Reading) {
		//alert("Reading ok");
		return true;
	}
	else {
		//alert("Reading too low");
		return false;
	}
}

Validator.validateJob = function (job) {
  if (!Validator.validateProcess(job.process)) { return false; }
  if (!Validator.validateFlow(job.maint_act_type)) { return false; }
  if (!Validator.validatePriceForFlow(job.fixed_price, job.maint_act_type)) { return false ;}
  if (!Validator.validateExecutionDate(job.execution_date)) { return false; }
  if (!Validator.validatePlant(job.plant)) { return false; }
  if (!Validator.validateMainWorkcenter(job.main_workctr)) { return false; }
  if (!Validator.validateDescription(job.description)) { return false; }
  if (job.maint_act_type.match(/^(CU)/)!== null)
	  if(!Validator.validateContractItem(job.maint_act_type, job.contract_item)) {return false; }
  if (job.maint_act_type.match(/^(FP|OH|MX|CX|UC|UP|CH)/)) {
	  if(!Validator.validateSalesPerson(job.sales_person)) { return false; }
  }
  return true
}
