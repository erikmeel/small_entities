'use strict';

var React = require('react');

var Material = React.createClass({
  handleMaterialNumberChange: function(event) {
    this.setState({number: event.target.value})
  },

  render: function () {
    return (
      <div className="row">
      <div className="form-group col-xs-8">
        <input type="text" className="form-control" placeholder="Material Number" value={this.props.material.name} onChange={this.handleMaterialNumberChange} readOnly />
      </div>
      <div className="form-group col-xs-4">
        <input type="number" className="form-control" placeholder="Quantity" value={this.props.material.quantity} onChange={this.props.handleMaterialQuantityChange.bind(null, this.props.material.id)} />
      </div>
      </div>
    );
  }
});

module.exports = Material;
