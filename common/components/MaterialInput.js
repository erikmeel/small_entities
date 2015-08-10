'use strict';

var React = require('react');

var MaterialInput = React.createClass({
  render: function () {
    var addMaterialEnabled = "disabled";
    if (this.props.validMaterial) {
      addMaterialEnabled = ""
    }
    return (
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Material Number ..." onChange={this.props.onChangeMaterial} defaultValue={this.props.material.id} />
          <span className="input-group-btn">
            <button className="btn btn-default" type="button" disabled={addMaterialEnabled} onClick={this.props.addMaterial}>Add Material</button>
          </span>
        </div>
    );
  }
});

module.exports = MaterialInput;
