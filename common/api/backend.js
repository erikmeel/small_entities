/**
 * Mocking client-server processing
 */
'use strict';

var Backend = exports;

var request = require('superagent')
var sprintf = require('util').format
var BASE_URL = 'http://127.0.0.1:4567/sap/zrest/STC'
var SME_ENTITY = 'SME'
var EQUIPMENT_ENTITY = 'EQUIPMENT'

var _equipment = require('./equipment.json');
var _operations = require('./operations.json');

var TIMEOUT = 1000;

Backend.getEquipment = function (payload, cb, cb_error) {
  request
    .get(sprintf('%s/%s/%s', BASE_URL, EQUIPMENT_ENTITY, payload))
    .auth('AIR14977','Atlas2015')
    .accept('json')
    .end(function (err, res) {
      if (res.body) {
        var data = res.body[0].model;
        var result
        if (data.length > 0) {
          result = {
            'name': data[0].description,
            'serial': data[0].serial_number,
            'plant': data[0].planning_plant,
            'main_workctr': data[0].workcenter,
            'street': data[0].street,
            'post_code': data[0].post_code,
            'city': data[0].city,
            'annual_estimated_running_hours': data[0].annual_estimated_running_hours,
            'actual_annual_running_hours': data[0].actual_annual_running_hours
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

Backend.submitJob = function(job, cb) {
  request
   .post(sprintf('%s/%s', BASE_URL, SME_ENTITY))
   .auth('AIR14977','Atlas2015')
   .send({'json': job, "method": "create"})
   .accept('json')
   .end(function (err, res) {
      cb();
   });

};
