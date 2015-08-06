import React from 'react'

import Material from '../../common/components/Material'
import MaterialList from '../../common/components/MaterialList'
import MaterialInput from '../../common/components/MaterialInput'

import reactor from '../reactor'
import getters from '../getters'
import actions from '../actions'


const MaterialContainer = React.createClass({
  render() {
    return (
      <Material material={this.props.material} />
    );
  }
});


export default React.createClass({
  mixins: [reactor.ReactMixin],

  getDataBindings() {
    return {
      materials: getters.materials,
    }
  },

  render: function () {
    return (
      <div>
        <MaterialList title="Materials">
          {this.state.materials.map(material => {
            return <MaterialContainer key={material.get('id')} material={material.toJS()} />;
          }).toList()}
        </MaterialList>
        <MaterialInput key="material_input" />
      </div>
    );
  },
});
