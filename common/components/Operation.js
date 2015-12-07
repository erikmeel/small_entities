'use strict';

var React = require('react');

var Operation = React.createClass({
  propTypes: {
    onInputChanged: React.PropTypes.func.isRequired
  },

  render: function () {
    return (
      <div className="col-sm-2">
        <div className="form-group form-group-lg">
          <label className="operation-label"><strong>{this.props.operation.name}</strong> <br />{this.props.operation.uom}</label>
          <input className="form-control operation-value"
                 type="number"
                 step={this.props.operation.key === "travel_dist_qty" ? "1" : "0.01"} 
                 min={this.props.operation.key === "work_qty" ? "0.25" : "0"}
                 value={this.props.operation.quantity}
                 onChange={this.props.onInputChanged.bind(null, this.props.operation.key, "quantity")}>
          </input>
        </div>
      </div>
    );
  }
});

module.exports = Operation;
