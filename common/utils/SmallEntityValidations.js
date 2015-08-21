'use strict';

var Validator = exports;

var validator = require('validator')
var moment = require('moment')

var validationSate = function (b) {
  var result = 'error';
  if (b)
    result = 'success'
  return result
}

Validator.validateFlow = function (flow) {
  return validationSate(flow.match(/^(FP|OH|MX|CX|UC|UP|CH|SG|GW)/) !== null)
};

Validator.validateExecutionDate = function (date) {
  return validationSate(date.match(/^\d{2}\.\d{2}\.\d{4}$/) && moment(date, 'DD.MM.YYYY').isValid())
};

Validator.validateMainWorkcenter = function (workcenter) {
  return validationSate(workcenter && workcenter.match(/^\w{2}\d{2}\w\d{3}$/) !== null)
};

Validator.validatePlant = function (plant) {
  return validationSate(plant && workcenter.match(/^\w{2}\d{2}$/) !== null)
};

Validator.validateDescription = function (description) {
  return validationSate(!validator.isNull(description))
};
