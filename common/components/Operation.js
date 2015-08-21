'use strict';

var React = require('react');

var Operation = React.createClass({
  propTypes: {
    onInputChanged: React.PropTypes.func.isRequired
  },

  render: function () {
    return (
      <div className="form-group">
        <label>{this.props.operation.name}</label>
        <input className="form-control" type="number" step="0.01" min={this.props.operation.key === "work_qty" ? "0.25" : "0"} value={this.props.operation.quantity} onChange={this.props.onInputChanged.bind(null, this.props.operation.key, "quantity")}></input>
      </div>
    );
  }
});

module.exports = Operation;
