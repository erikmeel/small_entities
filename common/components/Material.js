'use strict';

var React = require('react');

var Material = React.createClass({
  handleMaterialNumberChange: function(event) {
    this.setState({number: event.target.value})
  },

  handleMaterialQuantityChange: function(event) {
    this.setState({quantity: event.target.value})
  },

  render: function () {
    return (
      <div>
        <input type="text" placeholder="Material Number" onChange={this.handleMaterialNumberChange} />
        <input type="number" placeholder="Quantity" onChange={this.handleMaterialQuantityChange} />
      </div>
    );
  }
});

module.exports = Material;
