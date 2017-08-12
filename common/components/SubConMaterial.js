'use strict';

var React = require('react');

var SubConMaterial = React.createClass({

  render: function () {
    return (
      <div className="row">
        <div className="form-group col-xs-3">
          <input type="text" className="form-control" placeholder="Subcontracting Material" value={this.props.subconmaterial.id} readOnly />
        </div>
        <div className="form-group col-xs-5">
          <input type="text" className="form-control" placeholder="Description" value={this.props.subconmaterial.name} readOnly />
        </div>
        <div className="form-group col-xs-2">
          <input type="text" className="form-control" placeholder="Vendor" value={this.props.subconmaterial.vendor} />
        </div>
        <div className="form-group col-xs-2">
          <input type="number" className="form-control" placeholder="Price" value={this.props.subconmaterial.price} />
        </div>
      </div>
    );
  }
});

module.exports = SubConMaterial;
