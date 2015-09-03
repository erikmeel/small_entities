'use strict';

var React = require('react');
import { Input } from 'react-bootstrap'

var EquipmentInfo = React.createClass({
  render: function () {
    var runningHoursClassName;
    if (parseInt(this.props.equipment.actual_annual_running_hours) > parseInt(this.props.equipment.annual_estimated_running_hours)) {
      runningHoursClassName = "text-danger"
    }

    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <input type="text" className="form-control" id="inputEquipment" placeholder="Equipment Description" value={this.props.equipment.name} readOnly />
            </div>
          </div>
          <div className="col-md-6">
            <div className="panel panel-info">
              <div className="panel-heading">
                <h3 className="panel-title">Installed At</h3>
              </div>
              <div className="panel-body">
                <p className="">{this.props.equipment.installed_at_name}</p>
                <p className="">{this.props.equipment.street} {this.props.equipment.house_number}</p>
                <p className="">{this.props.equipment.post_code} {this.props.equipment.city}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="panel panel-info">
              <div className="panel-heading">
                <h3 className="panel-title">Equipment Info</h3>
              </div>
              <div className="panel-body">
                <p className={runningHoursClassName}>Running Hours (YTD): {this.props.equipment.actual_annual_running_hours} / {this.props.equipment.annual_estimated_running_hours}</p>
                <p>Running Hours (Total): {this.props.equipment.actual_running_hours}</p>
                <p>Warranty End: {this.props.equipment.vendor_warranty_end}</p>
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
        <Input type="text" ref="equipmentInput" label="Equipment" placeholder="Serial Number" bsStyle={this.validationState()} hasFeedback onChange={this.props.onEquipmentChanged} value={this.props.equipment.serial} />
        { equipmentInfo }
      </div>
    );
  }
});

module.exports = Equipment;
