'use strict';

import { Input, Button } from 'react-bootstrap';

var React = require('react');

var MaterialInput = React.createClass({
  render: function () {
    var materialInput = <Input type="text" placeholder="Material Number ..." onChange={this.props.onChangeMaterial} value={this.props.material.id} />
    if (this.props.validMaterial) {
      var buttonAddMaterial = <Button onClick={this.props.addMaterial}>Add Material</Button>
      materialInput = <Input type="text" placeholder="Material Number ..." onChange={this.props.onChangeMaterial} value={this.props.material.id} buttonAfter={buttonAddMaterial} />
    }

    return (
      <div>{ materialInput }</div>
    );
  }
});

module.exports = MaterialInput;
