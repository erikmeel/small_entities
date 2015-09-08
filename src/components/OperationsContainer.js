import React from 'react'

import Operation from '../../common/components/Operation'
import OperationList from '../../common/components/OperationList'

import reactor from '../reactor'
import getters from '../getters'
import actions from '../actions'


const OperationContainer = React.createClass({
  updateField(operationId, fieldName, e) {
    actions.setOperationValue(operationId, fieldName, e.target.value)
  },

  render() {
    return (
      <Operation operation={this.props.operation} onInputChanged={this.updateField}/>
    );
  }
});

export default React.createClass({
  mixins: [reactor.ReactMixin],

  getDataBindings() {
    return {
      operations: getters.operations,
    }
  },

  render: function () {
    return (
      <OperationList title="Labour Costs">
        {this.state.operations.map(operation => {
          return <OperationContainer key={operation.get('key')} operation={operation.toJS()} />;
        }).toList()}
      </OperationList>
    );
  },
});
