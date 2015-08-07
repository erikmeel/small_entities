'use strict';

var React = require('react');

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

  render: function () {
    var classNameGroup = "form-group";
    var classNameSpan = "glyphicon"
    if (this.props.equipmentValid) {
      classNameGroup += " has-success has-feedback"
      classNameSpan += " glyphicon-ok form-control-feedback"
    } else {
      classNameGroup += " has-warning has-feedback"
      classNameSpan += " glyphicon-warning-sign form-control-feedback"
    }

    var equipmentInfo = <div></div>;
    if (this.props.equipmentValid) {
      equipmentInfo = <EquipmentInfo equipment={this.props.equipment} />
    }

    return (
      <div>
        <div className={classNameGroup}>
          <label for="inputEquipment">Equipment</label>
          <input type="text" className="form-control" id="inputEquipment" placeholder="Serial Number" defaultValue={this.props.equipment.serial} onChange={this.props.onEquipmentChanged} />
          <span className={classNameSpan} aria-hidden="true"></span>
        </div>
        { equipmentInfo }
      </div>
    );
  }
});

module.exports = Equipment;
