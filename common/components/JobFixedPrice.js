'use strict';

var React = require('react');

var JobFixedPrice = React.createClass({
  render: function () {
    return (
      <div className="form-group">
        <label>Price</label>
        <input className="form-control" type="number" step="any" min="1" pattern="^\d+(\.|\,)\d{2}$" defaultValue={this.props.job.fixed_price} onChange={this.props.onUpdateField.bind(null, "fixed_price")}/>
      </div>
    )
  }
})

module.exports = JobFixedPrice;
