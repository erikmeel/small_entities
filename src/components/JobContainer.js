import React from 'react'

import JobFixedPrice from '../../common/components/JobFixedPrice'

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
    var fixedPrice = <div></div>;
    if (job.maint_act_type.match(/^(FP|OH|MX|CX|UC|UP)/)) {
      fixedPrice = <JobFixedPrice job={job} onUpdateField={this.updateField} />
    }
    return (
      <div>
        <div className="form-group">
          <label>Flow</label>
          <select className="form-control" defaultValue={job.maint_act_type} onChange={this.updateField.bind(this, "maint_act_type")}>
            <option value="select">Choose an option</option>
            <option value="FP">Fixed Price</option>
            <option value="OH">Overhaul Fixed Price</option>
            <option value="MX">Motor Xchange</option>
            <option value="CX">Converter Xchange</option>
            <option value="UC">Upgrades (Controls)</option>
            <option value="UP">Upgrades (Protection)</option>
            <option value="CH">Service Repair</option>
            <option value="SG">Service Goodwill</option>
            <option value="GW">Sales Goodwill</option>
          </select>
        </div>
        { fixedPrice }
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
        <div className="form-group">
          <label>Invoice Text</label>
          <textarea className="form-control" rows="3" defaultValue={job.invoiceText}></textarea>
        </div>
      </div>
    );
  },
});
