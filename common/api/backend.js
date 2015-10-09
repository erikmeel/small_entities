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
var CUSTOMER_ENTITY = 'customer'

var _operations = require('./operations.json');

Backend.getEquipment = function (payload, lastEquipmentRequestId, cb, cb_error) {
  var j = {
    'serial_number': payload
  }
  request
    .get(sprintf('%s/%s?sap-client=500&sap-language=EN', BASE_URL, EQUIPMENT_ENTITY))
    .query({json: JSON.stringify(j)})
    .query({action: 'get_by_serial'})
    .accept('json')
    .end(function (err, res) {
      if (!err && res.body) {
        var data = res.body[0].model;
        var result
        if (data.length > 0) {
          result = {
            'id': data[0].id,
            'name': data[0].description,
            'serial': data[0].serial_number.replace(/^0*/,''),
            'plant': data[0].planning_plant,
            'main_workctr': data[0].workcenter,
            'street': data[0].street,
            'house_number': data[0].house_number,
            'post_code': data[0].post_code,
            'city': data[0].city,
            'estimated_annual_running_hours': data[0].estimated_annual_running_hours,
            'actual_annual_running_hours': data[0].actual_annual_running_hours,
            'actual_running_hours': data[0].actual_running_hours,
            'age': moment().diff(moment(data[0].start_date, 'YYYYMMDD'), 'years'),
            'installed_at_name': data[0].installed_at_name,
            'installed_at': data[0].installed_at,
            'invoice_to': data[0].invoice_to,
            'ship_to': data[0].ship_to,
            'bill_to': data[0].bill_to,
          };
          if (data[0].internal_note) {
              result['internal_note'] = data[0].internal_note.replace(/\\n/g, "<br />")
          }
          if (data[0].vendor_warranty_end) {
            result['vendor_warranty_end'] = moment(data[0].vendor_warranty_end, 'YYYYMMDD').format('DD.MM.YYYY')
            result['warranty_expired'] = moment(data[0].vendor_warranty_end, 'YYYYMMDD') < moment()
          }
          if (data[0].user_status) {
            result['user_status'] = data[0].user_status.split(" ")
          };
          cb(result)
        } else {
          cb_error()
        }
      }
    })
};

Backend.getMaterial = function (number, workcenter, cb, cb_error) {
  if (!workcenter || workcenter.length != 8) {
    return cb_error()
  }
  var j = {
    'plant': workcenter.substring(0,4),
    'storage_location': workcenter.substring(4,8)
  }
  request
    .get(sprintf('%s/%s/%s?sap-client=500&sap-language=EN', BASE_URL, MATERIAL_ENTITY, number))
    .query({'action': 'GET_STOCK'})
    .query({'json': JSON.stringify(j)})
    .accept('json')
    .end(function (err, res) {
      if (!err && res.body) {
        var data = res.body[0].model;
        var result
        if (data.length > 0) {
          result = {
            'id': data[0].id,
            'name': data[0].description,
            'uom': data[0].base_uom,
          }
          if (data[0].stock_quantity) {
            result['plant'] = data[0].plant,
            result['storage_location'] = data[0].storage_location,
            result['stock_quantity'] = data[0].stock_quantity
          }
          cb(result)
        } else {
          cb_error()
        }
      }
    })
};

Backend.getCustomer = function (payload, cb, cb_error) {
  var j = {
    'read_equipments': 'FALSE',
    'read_contacts': 'TRUE',
    'ids': [payload]
  }
  request
    .get(sprintf('%s/%s?sap-client=500&sap-language=EN', BASE_URL, CUSTOMER_ENTITY))
    .query({'action': 'GET_ALL_IN_RANGE'})
    .query({'json': JSON.stringify(j)})
    .accept('json')
    .end(function (err, res) {
      if (!err && res.body) {
        var data = res.body[0].model;
        var result
        if (data.length > 0) {
          result = data[0];
          cb(result)
        } else {
          cb_error()
        }
      }
    })
};

Backend.submitJob = function(job, equipment, operations, materials, cb, cb_error) {
  if (!equipment.id) {
    return cb_error()
  }
  var j = job
  j.equipment = equipment.id
  j.execution_date = moment(job.execution_date, 'DD.MM.YYYY').format("YYYYMMDD")
  j.work_qty = operations.work_qty.quantity
  j.expenses_qty = operations.expenses_qty.quantity
  j.travel_qty = operations.travel_qty.quantity
  j.travel_dist_qty = operations.travel_qty.quantity
  j.allowance_qty = operations.allowance_qty.quantity
  j.env_act_qty = operations.env_act_qty.quantity
  j.t_mat_used = materials
  console.log("Params: " + JSON.stringify(job, null, 4))
  request
   .post(sprintf('%s/%s?sap-client=500&sap-language=EN', BASE_URL, SME_ENTITY))
   .type('form')
   .auth('AIR14977','Atlas2015')
   .send({json: JSON.stringify(j)})
   .send({action: 'create'})
   .end(function (err, res) {
    if (!err && res.body) {
      if (res.body[1].message.length === 0) {
        cb();
      } else {
        cb_error();
      }
    } else {
      console.log(err);
      cb_error();
    }
   });
};
