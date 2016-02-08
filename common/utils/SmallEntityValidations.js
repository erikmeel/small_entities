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
  return flow.match(/^(FP|CH|SG|GW|IC|IS|PG|GL|SW|WG)/) !== null
};

Validator.validateExecutionDate = function (date) {
  return date.match(/^\d{2}\.\d{2}\.\d{4}$/) && moment(date, 'DD.MM.YYYY').isValid()
};

Validator.validateMainWorkcenter = function (workcenter) {
  return workcenter && (workcenter.match(/^\w{2}\d{2}\w\d{3}$/) || workcenter.match(/^\w{2}\d{2}\w{2}\d{2}$/) ) !== null
};

Validator.validateDisableInvoice = function (flow) {
	var result = '';
	if (flow.match(/^(EC|PG|GL|SW|WG)/) !== null) {
		result = 'disabled';
	}
	return result;
}

Validator.validatePlant = function (plant) {
  return plant && plant.match(/^\w{2}\d{2}$/) !== null
};

Validator.validateDescription = function (description) {
  return !validator.isNull(description)
};

Validator.validatePurchaseOrder = function (purchase_order) {
	return !validator.isNull(purchase_order)
};

Validator.validatePriceForFlow = function (price, flow) {
  if (flow.match(/^(CH|IC|IS|SG|GW|PG|GL|SW|WG)/) !== null) {
    return true
  }
  return validator.isFloat(price, { min: 1.0})
};

Validator.validateJob = function (job) {
  if (!Validator.validateProcess(job.process)) { return false; }
  if (!Validator.validateFlow(job.maint_act_type)) { return false; }
  if (!Validator.validatePriceForFlow(job.fixed_price, job.maint_act_type)) { return false ;}
  if (!Validator.validateExecutionDate(job.execution_date)) { return false; }
  if (!Validator.validatePlant(job.plant)) { return false; }
  if (!Validator.validateMainWorkcenter(job.main_workctr)) { return false; }
  if (!Validator.validateDescription(job.description)) { return false; }
  return true
}
