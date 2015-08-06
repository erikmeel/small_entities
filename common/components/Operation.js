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
        <input className="form-control" type="number" defaultValue={this.props.operation.quantity} onChange={this.props.onInputChanged.bind(null, this.props.operation.key, "quantity")}></input>
      </div>
    );
  }
});

module.exports = Operation;
