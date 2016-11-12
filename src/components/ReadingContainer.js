import React from 'react'

import Reading from '../../common/components/Reading'
import ReadingList from '../../common/components/ReadingList'

import reactor from '../reactor'
import getters from '../getters'
import actions from '../actions'

var ReactBootstrap = require('react-bootstrap');
var Button = ReactBootstrap.Button
var Modal = ReactBootstrap.Modal;

const ReadingContainer = React.createClass({
  
	closeModal(){
	    this.setState({
	      showModal: false,
	    });
	},
	
	openModal() {
	    this.setState({
	    	readVal : this.props.equipment.actual_running_hours, 
	    	readBy: this.props.workcenter,
	    	showModal: true });
	},
	
	render() {
		return (
			<div className="pull-right">
	    		<div className="glyphicon glyphicon-pencil" onClick={this.openModal}></div>
	    		<Modal bsSize="large" show={this.state.showModal} onHide={this.closeModal.bind(this)} aria-labelledby="contained-modal-title-lg">
	    			<form>
	    				<Modal.Header>
	    		       		<Modal.Title>Readings</Modal.Title>
	    		       	</Modal.Header>
	    		       	<Modal.Body >
	    		       		<table className="table">
	    		       			<tr>
	    		       				<th>Date of reading</th>
	    		       				<th>Reading by</th>
	    		       				<th>Value</th>
	    		       				<th>Comment</th>
	    		       			</tr>
	    		       			<tr>
	    		       				<td>
	    		       					<input type="datetime" data-format="dd/MM/yyyy hh:mm:ss" id="readDate" name="readDate" value={this.state.readDate} ref="readDate" hasFeedback onChange={this.onReadByChanged} />
	    		       				</td>
	    		       				<td>
	    		       					<input type="text" id="readBy" name="readBy" value={this.state.readBy} ref="readBy" hasFeedback onChange={this.onReadByChanged}/>
	    		       				</td>
	    		       				<td>
	    		       					<input type="number" id="readVal" name="readVal" value={this.state.readVal} ref="readVal" hasFeedback onChange={this.onReadByChanged} />
	    		       				</td>
	    		       				<td>
	    		       					<input type="text" id="readText" value={this.state.readText} hasFeedback onChange={this.onReadByChanged} />
	    		       				</td>
	    		       			</tr>
	    		       		</table>
	    		       	</Modal.Body>
	    		       	<Modal.Footer>	
	    		       		<button type="button" className="btn" onClick={this.closeModal.bind(this)}>Return</button>
	    		       		<button type="button" className="btn btn-primary">Save changes</button>
	    		       	</Modal.Footer>
	    		    </form>
	    		</Modal>
	    	</div>
		);
	}
});

export default React.createClass({
  mixins: [reactor.ReactMixin],

  getDataBindings() {
    return {
      readings: getters.readings,
    }
  },

  render: function () {
    return (
      <ReadingList title="Readings">
        {this.state.readings.map(reading => {
          return <ReadingContainer key={reading.get('key')} reading={reading.toJS()} />;
        }).toList()}
      </ReadingList>
    );
  },
});
