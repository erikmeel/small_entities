'use strict';

import React from 'react'

import App from './components/App'
import reactor from './reactor'
import actions from './actions'
import FlashStore from './stores/FlashStore'
import EquipmentStore from './stores/EquipmentStore'
import OperationStore from './stores/OperationStore'
import MaterialStore from './stores/MaterialStore'
import JobStore from './stores/JobStore'

reactor.registerStores({
  flash: FlashStore,
  equipment: EquipmentStore,
  operations: OperationStore,
  materials: MaterialStore,
  job: JobStore,
})

React.render(
    React.createElement(App, null),
    document.getElementById('app')
);
