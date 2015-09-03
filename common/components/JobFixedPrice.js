'use strict';

var React = require('react');
import { Input } from 'react-bootstrap'

var JobFixedPrice = React.createClass({
  render: function () {
    return (
      <Input type="number" step="any" min="1" pattern="^\d+(\.|\,)\d{2}$" label="Fixed Price" placeholder="Price" bsStyle={this.props.bsStyle} hasFeedback onChange={this.props.onUpdateField.bind(null, "fixed_price")} value={this.props.job.fixed_price} />
    )
  }
})

module.exports = JobFixedPrice;
