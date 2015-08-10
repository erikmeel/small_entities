'use strict';

var Backend = exports;

var moment = require('moment')
var request = require('superagent')
var sprintf = require('util').format
// var BASE_URL = 'http://127.0.0.1:4567/sap/zrest/STC'
var BASE_URL = '/sap/zrest/stc'
var SME_ENTITY = 'sme'
var EQUIPMENT_ENTITY = 'equipment'
var MATERIAL_ENTITY = 'material'

var _equipment = require('./equipment.json');
var _operations = require('./operations.json');

var TIMEOUT = 10;

Backend.getEquipment = function (payload, cb, cb_error) {
  request
    .get(sprintf('%s/%s/%s?sap-client=500&sap-language=EN', BASE_URL, EQUIPMENT_ENTITY, payload))
    .auth('AIR14977','Atlas2015')
    .accept('json')
    .end(function (err, res) {
      if (!err && res.body) {
        var data = res.body[0].model;
        var result
        if (data.length > 0) {
          result = {
            'equipment': data[0].id,
            'name': data[0].description,
            'serial': data[0].serial_number,
            'plant': data[0].planning_plant,
            'main_workctr': data[0].workcenter,
            'street': data[0].street,
            'house_number': data[0].house_number,
            'post_code': data[0].post_code,
            'city': data[0].city,
            'annual_estimated_running_hours': data[0].annual_estimated_running_hours,
            'actual_annual_running_hours': data[0].actual_annual_running_hours,
            'actual_running_hours': data[0].actual_running_hours,
            'vendor_warranty_end': moment(data[0].vendor_warranty_end, 'YYYYMMDD').format('DD.MM.YYYY'),
            'internal_note': data[0].internal_note,
            'installed_at_name': data[0].installed_at_name
          }
          cb(result)
        } else {
          cb_error()
        }
      }
    })
};

Backend.getOperations = function (cb, timeout) {
    timeout = timeout || TIMEOUT;
    setTimeout(function () {
        cb(_operations);
    }, timeout);
};

Backend.submitJob = function(job, materials, cb) {
  console.log("Submitting Job to " + sprintf('%s/%s?sap-client=500&sap-language=EN', BASE_URL, SME_ENTITY));
  console.log("Params: " + job)
  console.log("Material params: " + materials);
  var j = job
  j.execution_date = moment(job.execution_date, 'DD.MM.YYYY').format("YYYYMMDD")
  j.t_mat_used = materials
  request
   .post(sprintf('%s/%s?sap-client=500&sap-language=EN', BASE_URL, SME_ENTITY))
   .type('form')
   .auth('AIR14977','Atlas2015')
   .send({json: JSON.stringify(j)})
   .send({action: 'create'})
   .end(function (err, res) {
    if (!err && res.body)
      cb();
   });

};

Backend.getMaterial = function (payload, cb, cb_error) {
  request
    .get(sprintf('%s/%s/%s?sap-client=500&sap-language=EN', BASE_URL, MATERIAL_ENTITY, payload))
    .auth('AIR14977','Atlas2015')
    .accept('json')
    .end(function (err, res) {
      if (!err && res.body) {
        var data = res.body[0].model;
        var result
        if (data.length > 0) {
          result = {
            'id': data[0].id,
            'name': data[0].description,
          }
          cb(result)
        } else {
          cb_error()
        }
      }
    })
};
