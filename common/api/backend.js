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
var READING_ENTITY = 'measpoint'

var _operations = require('./operations.json');

Backend.getEquipment = function (payload, lastEquipmentRequestId, cb, cb_error) {
  payload = payload.toUpperCase();
  var j = {
    'serial_number': payload
  }
  request
    .get(sprintf('%s/%s?sap-client=510&sap-language=EN', BASE_URL, EQUIPMENT_ENTITY))
    .query({json: JSON.stringify(j)})
    .query({action: 'get_by_serial'})
    .accept('json')
    .end(function (err, res) {
      if (!err && res.body) {
        var data = res.body[0].model;
        var result = []
        if (data.length > 0) {
          for (var i = 0; i < data.length; i++) {
            var equipment = {
              'id': data[i].id,
              'name': data[i].description,
              'serial': data[i].serial_number.replace(/^0*/,''),
              'plant': data[i].planning_plant,
              'main_workctr': data[i].workcenter,
              'street': data[i].street,
              'house_number': data[i].house_number,
              'post_code': data[i].post_code,
              'city': data[i].city,
              'estimated_annual_running_hours': data[i].estimated_annual_running_hours,
              'actual_annual_running_hours': data[i].actual_annual_running_hours,
              'actual_running_hours': data[i].actual_running_hours,
              'measurement_point': data[i].measurement_point,
              'age': moment().diff(moment(data[i].start_date, 'YYYYMMDD'), 'years'),
              'installed_at_name': data[i].installed_at_name,
              'installed_at': data[i].installed_at,
              'invoice_to': data[i].invoice_to,
              'ship_to': data[i].ship_to,
              'bill_to': data[i].bill_to,
              'contracts': data[i].contracts,
              'readings': data[i].readings,
            };
            if (data[i].internal_note) {
                equipment['internal_note'] = data[i].internal_note.replace(/\\n/g, "<br />")
            }
            if (data[i].vendor_warranty_end) {
              equipment['vendor_warranty_end'] = moment(data[i].vendor_warranty_end, 'YYYYMMDD').format('DD.MM.YYYY')
              equipment['warranty_expired'] = moment(data[i].vendor_warranty_end, 'YYYYMMDD') < moment()
            }
            if (data[i].user_status) {
              equipment['user_status'] = data[i].user_status.split(" ")
            }
            result.push(equipment)
          }
          //console.log(JSON.stringify(result));
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
    .get(sprintf('%s/%s/%s?sap-client=510&sap-language=EN', BASE_URL, MATERIAL_ENTITY, number))
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
            'base_uom': data[0].base_uom,
            'alt_uom': data[0].alt_uom,
          }
          if (data[0].stock_quantity) {
            result['plant'] = data[0].plant,
            result['storage_location'] = data[0].storage_location,
            result['stock_quantity'] = data[0].stock_quantity
          }
          cb(result)
          //console.log(JSON.stringify(result));
        } else {
          cb_error()
        }
      }
    })
};

Backend.getSubConMaterial = function (number, plant, cb, cb_error) {
	var j = {
		'matnr': number,	
		'werks': plant,
		'lgort': '1001',
		'flief': 0,
		'preis': 0
	}
	
	request
    .get(sprintf('%s/%s/%s?sap-client=510&sap-language=EN', BASE_URL, MATERIAL_ENTITY, number))
    .query({'action': 'GET_SUBCON'})
    .query({'json': JSON.stringify(j)})
    .accept('json')
    .end(function (err, res) {
      if (!err && res.body) {
        var data = res.body[0].model;
        var result
        if (data.length > 0) {
          result = {
            'subcon_materials': data[0].subcon_materials
          }
          cb(result)
          //console.log(JSON.stringify(result));
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
    .get(sprintf('%s/%s?sap-client=510&sap-language=EN', BASE_URL, CUSTOMER_ENTITY))
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

Backend.getSalesEmployee = function (sales_employee, plant, cb, cb_error) {
	var j = {
	  'sales_employee': [sales_employee],
	  'plant': [plant]
	}
	request
		.get(sprintf('%s/%s?sap-client=510&sap-language=EN', BASE_URL, CUSTOMER_ENTITY))
		.query({'action': 'GET_PERSON_IN_RANGE'})
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
  j.travel_dist_qty = operations.travel_dist_qty.quantity
  j.allowance_qty = operations.allowance_qty.quantity
  j.env_act_qty = operations.env_act_qty.quantity
  j.t_mat_used = materials
  
  //console.log("Params: " + JSON.stringify(job, null, 4))
  //console.log(JSON.stringify(j));
  request
   .post(sprintf('%s/%s?sap-client=510&sap-language=EN', BASE_URL, SME_ENTITY))
   .type('form')
   .send({json: JSON.stringify(j)})
   .send({action: 'create'})
   .end(function (err, res) {
    if (!err && res.body) {
      if (res.body[1].message.length === 0) {
    	//console.log(JSON.stringify(res));  
        cb();
      } else {
          cb_error(res.body[1].message[0].message);
      }
    } else {
      console.log(err); 
      cb_error();
    }
   });
};

Backend.submitReading = function(point, equipment, readDate, readTime, readBy, readVal, readText, cb, cb_error) {
	if (!equipment) {
	    return cb_error("Invalid equipment");
	}
	readDate = readDate.replace(/-/g,"");
	var j = {
		'point': point,
		'idate': readDate,
		'itime': readTime,
		'readr': readBy,
		'readg': readVal,
		'mdtxt': readText
	}; 
	request
		.post(sprintf('%s/%s?sap-client=510&sap-language=EN', BASE_URL, READING_ENTITY))
		.type('form')
		.send({json: JSON.stringify(j)})
		.send({action: 'create'})
		.end(function (err, res) {
			if (!err && res.body) {
				if (res.body[1].message.length === 0) {
					if(res.body[0].model[0].readings.length>0) 
						cb(res.body[0].model[0].readings);
					else
						cb();
				} else {
					cb_error(res.body[1].message[0].message);
				}
			} else {
				console.log(err); 
				cb_error();
			}
		});
};