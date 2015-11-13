var React = require('react');
import { ListGroup, ListGroupItem } from 'react-bootstrap'


var EquipmentContainer = React.createClass({
  render: function () {
    return (
      <ListGroupItem href="#" onClick={this.props.onEquipmentSelected.bind(null, this.props.equipment.id)}><strong>{this.props.equipment.name}</strong> installed at <strong>{this.props.equipment.installed_at_name}</strong> in <strong>{this.props.equipment.city}</strong> (id: {this.props.equipment.id})</ListGroupItem>
    )
  }
})

var EquipmentList = React.createClass({
  propTypes: {
    onEquipmentSelected: React.PropTypes.func.isRequired
  },

  render: function () {
    return (
      <ListGroup>
        {this.props.equipments.map(equipment => {
          return <EquipmentContainer key={equipment.get('id')} equipment={equipment.toJS()} onEquipmentSelected={this.props.onEquipmentSelected} />;
        }).toList()}
      </ListGroup>
    );
  }
});

module.exports = EquipmentList;
