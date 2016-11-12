'use strict';

var React = require('react');

import { Button, Input, Modal } from 'react-bootstrap'
import ReadingInstance from './Reading'

var PanelInstance = React.createClass({
  render: function () {
    return (
      <div className="col-md-12">
        <div className="panel panel-info">
          <div className="pull-right panel-title-inner">Equipment Notes</div>
          <div className="panel-body">
            <p className="" dangerouslySetInnerHTML={{__html: this.props.panelBody}}></p>
          </div>
        </div>
      </div>
    )
  }
})

var PartnerPanelInstance = React.createClass({
  render: function () {
    return (
      <div className="panel panel-info">
        <div className="panel-heading">
          <h4 className="panel-title">{this.props.title}</h4>
        </div>
        <div className="panel-body">
          <p className="address">{this.props.partner.name}</p>
          <p className="address">{this.props.partner.street} {this.props.partner.house_number}</p>
          <p className="address">{this.props.partner.post_code} {this.props.partner.city}</p>
        </div>
      </div>
    )
  }
})

var EquipmentInfo = React.createClass({
	getInitialState() {
	return { 
		new_readDate: "",
		new_readBy: "",
		new_readVal: "",
		new_readText: ""
	};
  },

  render: function () {
    let readingModal = <ReadingInstance equipment={this.props.equipment} onMeasurementDocSave={this.props.onMeasurementDocSave} />
  
    let runningHoursClassName;
    if (parseInt(this.props.equipment.actual_annual_running_hours) > parseInt(this.props.equipment.estimated_annual_running_hours)) {
      runningHoursClassName = "text-danger"
    }
    let runningHoursTotal = <div></div>;
    if (this.props.equipment.actual_running_hours) {
      runningHoursTotal = <div className="pull-right running-hours-total">Total Running Hours: {this.props.equipment.actual_running_hours}</div>
    }
    let warrantyEndClassName;
    if (this.props.equipment.warranty_expired) {
      warrantyEndClassName = "text-danger"
    }
    let user_status = "";
    if (this.props.equipment.user_status) {
      user_status = this.props.equipment.user_status.map(function(status) {
        let element = ""
        switch(status) {
          case 'ZCON':
            element = <span key={status} className="label label-success pull-right user-status-label">connected</span>
            break;
          case 'ZNOS':
            element = <span key={status} className="label label-danger pull-right user-status-label">no service</span>
            break;
          case 'ZNOC':
            element = <span key={status} className="label label-warning pull-right user-status-label">no contract service</span>
            break;
          case 'ZWWC':
            element = <span key={status} className="label label-success pull-right user-status-label">contract</span>
            break;
        }
        return element
      })
    }
    let contact = ""
    if (this.props.equipment.contact) {
      contact = <p className="address contact"><span className="glyphicon glyphicon-user" aria-hidden="true"></span> {this.props.equipment.contact.first_name} {this.props.equipment.contact.name}</p>
    }
    let internal_note = ""
    if (this.props.equipment.internal_note) {
      internal_note = <PanelInstance panelTitle="Equipment Note" panelBody={this.props.equipment.internal_note} />
    }

    return (
      <div>
        <div className="row equipment-details">
          <div className="col-md-12">
            <div className="form-group">
              <p className="form-control-static equipment-name">{this.props.equipment.name} {user_status}</p>
            </div>
          </div>
          <div className="clearfix" />
          <div className="col-sm-5 col-lg-2">
            <div className="panel panel-default age-widget">
              <div className="panel-body">
                <div className="text-center age-value">{this.props.equipment.age}Y</div>
                <span className="pull-right text-right age-title">Equipment Age</span>
              </div>
            </div>
          </div>
          <div className="col-sm-7 col-lg-4">
            <div className="row">
              <div className="col-sm-12">
                <div className="panel panel-default">
                  <div className="panel-body">
                    <div className="pull-left running-hours-title">Running<br/> Hours Yearly</div>
                    <div className='pull-right running-hours-value'>
                      <span className={runningHoursClassName}>{readingModal}</span>
                      <br />
                      { runningHoursTotal }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className="panel panel-default">
                  <div className="panel-body">
                    <div className="pull-left warranty-end-title">Warranty<br/> End</div>
                    <div className="pull-right warranty-end-value"><span className={warrantyEndClassName}>{this.props.equipment.vendor_warranty_end}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3">
            <div className="panel panel-info">
              <div className="panel-heading">
                <h4 className="panel-title">Installed At</h4>
              </div>
              <div className="panel-body">
                <p className="address">{this.props.equipment.installed_at_name}</p>
                <p className="address">{this.props.equipment.street} {this.props.equipment.house_number}</p>
                <p className="address">{this.props.equipment.post_code} {this.props.equipment.city}</p>
                {contact}
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3">
            <PartnerPanelInstance title="Bill To" partner={this.props.equipment.bill_to || {}} />
          </div>
          <div className="clearfix" />
          {internal_note}
        </div>
      </div>
    )
  }
})

var Equipment = React.createClass({
  propTypes: {
    equipmentValid: React.PropTypes.bool,
    onEquipmentChanged: React.PropTypes.func.isRequired,
    onMeasurementDocSave: React.PropTypes.func.isRequired,
  },
  
  getInitialState() {
	return { 
		new_readDate: "",
		new_readBy: "",
		new_readVal: "",
		new_readText: ""
	};
  },

  validationState() {
    if (this.props.equipmentValid) {
      return 'success'
    }
    return 'error'
  },

  render: function () {
    var equipmentInfo = <div></div>;
    if (this.props.equipmentValid) {
      equipmentInfo = <EquipmentInfo equipment={this.props.equipment} onMeasurementDocSave={this.props.onMeasurementDocSave} />
    }

    return (
      <div>
        <Input type="text" ref="equipmentInput" placeholder="Serial Number" bsStyle={this.validationState()} hasFeedback onChange={this.props.onEquipmentChanged} value={this.props.equipment.serial} />
        { equipmentInfo }
      </div>
    );
  }
});

module.exports = Equipment;
