'use strict';

var React = require('react');

var Material = React.createClass({
  handleMaterialNumberChange: function(event) {
    this.setState({number: event.target.value})
  },

  render: function () {
    return (
      <div className="row">
        <div className="form-group col-xs-3">
          <input type="text" className="form-control" placeholder="Material Number" value={this.props.material.id} readOnly />
        </div>
        <div className="form-group col-xs-5">
          <input type="text" className="form-control" placeholder="Material Number" value={this.props.material.name} readOnly />
        </div>
        <div className="form-group col-xs-2">
          <input type="text" className="form-control" placeholder="Stock" value={this.props.material.stock_quantity} readOnly />
        </div>
        <div className="form-group col-xs-2">
          <input type="number" className="form-control" placeholder="Quantity" value={this.props.material.quantity} onChange={this.props.handleMaterialQuantityChange.bind(null, this.props.material.id)} />
        </div>
      </div>
    );
  }
});

module.exports = Material;
