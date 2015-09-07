'use strict';

var React = require('react');
import { Input } from 'react-bootstrap'

var EquipmentInfo = React.createClass({
  render: function () {
    let runningHoursClassName;
    if (parseInt(this.props.equipment.actual_annual_running_hours) > parseInt(this.props.equipment.annual_estimated_running_hours)) {
      runningHoursClassName = "text-danger"
    }
    let warrantyEndClassName;
    if (this.props.equipment.warranty_expired) {
      warrantyEndClassName = "text-danger"
    }
    let user_status = this.props.equipment.user_status.map(function(status) {
      let element = ""
      switch(status) {
        case 'ZCON':
          element = <span key={status} className="label label-info">connected</span>
          break;
        case 'ZWWC':
          element = <span key={status} className="label label-success">contract</span>
          break;
      }
      return element
    })

    return (
      <div>
        <div className="row equipment-details">
          <div className="col-md-12">
            <div className="form-group">
              <p className="form-control-static">{this.props.equipment.name} {user_status}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3">
            <div className="panel panel-default age-widget">
              <div className="panel-body">
                <div className="text-center age-value">{this.props.equipment.age}Y</div>
                <span className="pull-right text-right age-title">Equipment Age</span>
              </div>
            </div>
          </div>
          <div className="col-sm-5">
            <div className="row">
              <div className="col-sm-12">
                <div className="panel panel-default">
                  <div className="panel-body">
                    <div className="pull-left running-hours-title">Running<br/> Hours</div>
                    <div className='pull-right running-hours-value'><span className={runningHoursClassName}>{this.props.equipment.actual_annual_running_hours}</span>/{this.props.equipment.annual_estimated_running_hours}</div>
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
          <div className="col-sm-4">
            <div className="panel panel-info">
              <div className="panel-heading">
                <h4 className="panel-title">Installed At</h4>
              </div>
              <div className="panel-body">
                <p className="address">{this.props.equipment.installed_at_name}</p>
                <p className="address">{this.props.equipment.street} {this.props.equipment.house_number}</p>
                <p className="address">{this.props.equipment.post_code} {this.props.equipment.city}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-info">
              <div className="panel-heading">
                <h3 className="panel-title">Equipment Note</h3>
              </div>
              <div className="panel-body">
                <p className="">{this.props.equipment.internal_note}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

var Equipment = React.createClass({
  propTypes: {
    equipmentValid: React.PropTypes.bool,
    onEquipmentChanged: React.PropTypes.func.isRequired
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
      equipmentInfo = <EquipmentInfo equipment={this.props.equipment} />
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
