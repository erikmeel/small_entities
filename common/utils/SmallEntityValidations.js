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
  return process.match(/^(X1|X2|X3|X4)/) !== null
}

Validator.validateFlow = function (flow) {
  return flow.match(/^(FP|OH|MX|CX|UC|UP|CH|SG|GW)/) !== null
};

Validator.validateExecutionDate = function (date) {
  return date.match(/^\d{2}\.\d{2}\.\d{4}$/) && moment(date, 'DD.MM.YYYY').isValid()
};

Validator.validateMainWorkcenter = function (workcenter) {
  return workcenter && workcenter.match(/^\w{2}\d{2}\w\d{3}$/) !== null
};

Validator.validatePlant = function (plant) {
  return plant && plant.match(/^\w{2}\d{2}$/) !== null
};

Validator.validateDescription = function (description) {
  return !validator.isNull(description)
};

Validator.validatePriceForFlow = function (price, flow) {
  if (flow.match(/^(CH|SG|GW)/) !== null) {
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
