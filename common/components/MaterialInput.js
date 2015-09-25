'use strict';

import { Input, Button } from 'react-bootstrap';

var React = require('react');

var MaterialInput = React.createClass({
  render: function () {
    var help = ""
    if (this.props.material.id.length === 10) {
      if (this.props.availableAtStorageLocation) {
        help = this.props.material.name + " can be added to the job."
      } else {
        help = this.props.material.name + " is not available for the technician."
      }
    }
    var materialInput = <Input type="text" placeholder="Input material number to add to the job" help={help} onChange={this.props.onChangeMaterial} value={this.props.material.id} />
    if (this.props.validMaterial && this.props.material.storage_location) {
      var buttonAddMaterial = <Button onClick={this.props.addMaterial}>Add Material</Button>
      materialInput = <Input type="text" placeholder="Input material number to add to the job" help={help} onChange={this.props.onChangeMaterial} value={this.props.material.id} buttonAfter={buttonAddMaterial} />
    }

    return (
      <div>{ materialInput }</div>
    );
  }
});

module.exports = MaterialInput;
