import React from 'react'

import reactor from '../reactor'
import getters from '../getters'
import actions from '../actions'


export default React.createClass({
  mixins: [reactor.ReactMixin],

  getInitialState: function() {
    return {
    }
  },

  getDataBindings() {
    return {
      job: getters.job,
    }
  },

  updateField(fieldName, e) {
    actions.setJobValue(fieldName, e.target.value)
  },

  render: function () {
    let job = this.state.job.toJS();
    return (
      <div>
        <div className="form-group">
          <label>Flow</label>
          <select className="form-control" defaultValue={job.maint_act_type} onChange={this.updateField.bind(this, "maint_act_type")}>
            <option value="select">Choose an option</option>
            <option value="FP">Fixed Price</option>
            <option value="CH">Chargeable</option>
          </select>
        </div>
        <div className="form-group">
          <label>Price</label>
          <input className="form-control" type="number" defaultValue={job.fixed_price} onChange={this.updateField.bind(this, "fixed_price")}/>
        </div>
        <div className="form-group">
          <label>Execution Date</label>
          <input className="form-control" type="text" defaultValue={job.execution_date} onChange={this.updateField.bind(this, "execution_date")}/>
        </div>
        <div className="form-group">
          <label>Work Center</label>
          <input className="form-control" type="text" value={job.main_workctr} onChange={this.updateField.bind(this, "main_workctr")}/>
        </div>
        <div className="form-group">
          <label>Description</label>
          <input className="form-control" type="text" defaultValue={job.description} onChange={this.updateField.bind(this, "description")}/>
        </div>
      </div>
    );
  },
});
