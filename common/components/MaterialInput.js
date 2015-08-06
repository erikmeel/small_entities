'use strict';

var React = require('react');

var MaterialInput = React.createClass({
  handleMaterialNumberChange: function(event) {
    this.setState({number: event.target.value})
  },

  render: function () {
    return (
      <div className="flex-table">
        <div className="flex-table-item flex-table-item-primary">
          <input className="input-block" type="text" placeholder="Material Number" onChange={this.handleMaterialNumberChange} />
        </div>
        <div className="flex-table-item">
          <button className="btn" type="button">Add Material</button>
        </div>
      </div>
    );
  }
});

module.exports = MaterialInput;
