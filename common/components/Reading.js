'use strict';

var React = require('react');

import { Alert, Button, Input, Modal, Table, Tooltip, OverlayTrigger } from 'react-bootstrap'

var ReadingInstance = React.createClass({
	propTypes: {
	    new_readDate: React.PropTypes.string,
	    new_readBy: React.PropTypes.string,
	    onMeasurementDocSave: React.PropTypes.func.isRequired
  },

  getInitialState() {
	  let point = 0
	  let readby = ""
	  let readtext = ""
	  if(this.props.equipment.readings) {
		  point = this.props.equipment.readings[0].point
		  readby = this.props.equipment.readings[0].readBy
		  readtext = this.props.equipment.readings[0].readText
	  }
		  
	return { 
		point: point,
		new_readDate: this.getDefaultDate(),
		new_readTime: "00:00",
		new_readBy: readby,
		new_readVal: 0, //parseInt(this.props.equipment.readings[0].readVal, 1),
		new_readText: readtext,
		showModal: false,
		readingDateValid: "success",
		readingTimeValid: "success",
		readingByValid: "success",
		readingValValid: "error",
		readingTextValid: "success"
	};
  },
  
  getMeasurementDoc() {
    var reactRows = [];
   	if(this.props.equipment.readings != null) {
   		for(var i = 0; i < this.props.equipment.readings.length && i < 10; i++) {
        	var stDate = this.props.equipment.readings[i].readDate;
        	var stTime = this.props.equipment.readings[i].readTime;
        	if(stTime==null)
        		stTime="00:00:00";
        	else
        		stTime = stTime.substring(0,2)+":"+stTime.substring(2, 4)+":"+stTime.substring(4, 6);
   	    	stDate = stDate.substring(0, 4)+"-"+stDate.substring(4, 6)+"-"+stDate.substring(6, 8)+" / "+stTime;
			var reactInput1 = React.createElement("Label", null, stDate);
			var reactCell1 = React.createElement("td", {colSpan: 2}, reactInput1);
			var reactInput2 = React.createElement("Label", null, this.props.equipment.readings[i].readBy);
			var reactCell2 = React.createElement("td", null, reactInput2);
			var reactInput3 = React.createElement("Label", null, this.props.equipment.readings[i].readVal);
			var reactCell3 = React.createElement("td", null, reactInput3);
			var reactInput4 = React.createElement("Label", null, this.props.equipment.readings[i].readText);
			var reactCell4 = React.createElement("td", {colSpan: 2}, reactInput4);
			var reactRow = React.createElement("tr", {key: i}, reactCell1, reactCell2, reactCell3, reactCell4);
			reactRows.push(reactRow);
		}
	}
	else {
		var reactInput = React.createElement("Label", { bsStyle: "warning"}, "No readings found...");
		var reactCell = React.createElement("td", {colSpan: 5}, reactInput);
		var reactRow = React.createElement("tr", {key: 1}, reactCell);
		reactRows.push(reactRow);
	}
	
  	return reactRows;
  	
  },
  
  getDefaultDate() {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear()+"-"+(month)+"-"+(day) ;

    return today;
   },
  
  onReadByChanged() {
  	var rValue = document.getElementById("readVal").value;
  	var rDate = document.getElementById("readDate").value;
  	var rTime = document.getElementById("readTime").value;
  	if(rValue!=null & parseInt(rValue) > parseInt(this.props.equipment.actual_running_hours))
  		this.setState({
  			readingValValid: "success"
  		})
  	if(!this.props.equipment.actual_running_hours) {
  		this.setState({
  			readingValValid: "success"
  		})
  	}
  	let now = new Date();
  	let readingDateTime = new Date(rDate + " " + rTime);
  	if(readingDateTime > now)
  		{
  		this.setState({
  			readingDateValid: "error",
  			readingTimeValid: "error"	
  		})
  	}
  	else {
  		if(this.props.equipment.readings) {
  	  		let prDate = this.props.equipment.readings[0].readDate;
  	  		let prTime = this.props.equipment.readings[0].readTime;
  	  		
  	  		if(prTime==null)
  	  			prTime="00:00:00";
  	    	else
  	    		prTime = prTime.substring(0,2)+":"+prTime.substring(2, 4)+":"+prTime.substring(4, 6);
  	  		let stDate = prDate.substring(0, 4)+"-"+prDate.substring(4, 6)+"-"+prDate.substring(6, 8)+" " + prTime;
  	  		let prev_ReadDateTime = new Date(stDate)
  	  		if(readingDateTime <= prev_ReadDateTime) {
  	  			this.setState({
  	  				readingDateValid: "error",
  	  	  			readingTimeValid: "error"
  	  	  		})
  	  		}
  	  		else {
  	  			this.setState({
  	  				readingDateValid: "success",
  	  	  			readingTimeValid: "success"
  	  	  		})
  	  		}
  	  			
  	  	}
  		else {
  			this.setState({
	  				readingDateValid: "success",
	  	  			readingTimeValid: "success"
	  	  		})
  		}
  	}
  	
  	
  	this.setState({
    	new_readDate : document.getElementById("readDate").value,
    	new_readTime : document.getElementById("readTime").value,
  	  	new_readBy : document.getElementById("readBy").value,
  	  	new_readVal : rValue,
  	  	new_readText : document.getElementById("readText").value
  	});
  	return true;
  },

  closeModal(){
    this.setState({
      showModal: false,
    });
  },

  openModal() {
  	var readBy = "";
    if(this.props.equipment.readings!=null) {
    	 readBy = this.props.equipment.readings[0].readBy;
    }
    if(this.new_readVal == 0) {
    	this.setState({
    		new_readVal : this.props.equipment.actual_running_hours, 
	    	new_readBy: readBy,
    		showModal: true });
    }
    else {
    	this.setState({
    		showModal: true
    	});
    }
  },
  
  saveReading() {
	
	let point = 0;
	if(this.props.equipment.readings)
		point = this.props.equipment.readings[0].point;
  	let readDate = document.getElementById("readDate").value;
  	let readTime = document.getElementById("readTime").value;
  	let readBy = document.getElementById("readBy").value;
  	let readVal = document.getElementById("readVal").value;
  	let readText = document.getElementById("readText").value;
  	//check if reading is bigger than previous saved reading
  	if(this.props.equipment.actual_running_hours && parseInt(readVal) < parseInt(this.props.equipment.actual_running_hours))
  		{
  		this.setState({
  			readingValValid: "error"
  		})
  		return;
  	}
  	//check if reading date and time are not in future
  	let now = new Date();
  	let readingDate = new Date(readDate);
  	if(readingDate > now)
  		{
  		this.setState({
  			readingDateValid: "error"
  		})
  		return;
  	}
  	let readingDateTime = new Date(readDate + " " + readTime + ":00");
  	if(readingDateTime > now)
  		{
  		this.setState({
  			readingTimeValid: "error"
  		})
  		return;
  	}
  	if(this.props.equipment.readings) {
  		let prDate = this.props.equipment.readings[0].readDate;
  		let prTime = this.props.equipment.readings[0].readTime;
  		
  		if(prTime==null)
  			prTime="00:00:00";
    	else
    		prTime = prTime.substring(0,2)+":"+prTime.substring(2, 4)+":"+prTime.substring(4, 6);
  		let stDate = prDate.substring(0, 4)+"-"+prDate.substring(4, 6)+"-"+prDate.substring(6, 8)+" " + prTime;
  		let prev_ReadDateTime = new Date(stDate)
  		if(readingDateTime <= prev_ReadDateTime) {
  			this.setState({
  	  			readingTimeValid: "error"
  	  		})
  	  		return;
  		}	
  	}
  	else {
  		if(this.props.equipment.measurement_point) {
  			point = this.props.equipment.measurement_point
  		}
  	}
  	
  	this.props.onMeasurementDocSave(point, this.props.equipment, readDate, readTime, readBy, readVal, readText)
  	this.setState({
  		readingDateValid: "success",
  		readingTimeValid: "success",
  		readingValValid: "success",
  		showModal: false,
  	});
  	
  },
  
  clearSavedReading() {
	  let point = this.props.equipment.readings[0].point;
	  let readDate = document.getElementById("readDate").value;
	  let readTime = document.getElementById("readTime").value;
	  let readBy = document.getElementById("readBy").value;
	  let readText = document.getElementById("readText").value;
	  this.props.onMeasurementDocSave(point, this.props.equipment, readDate, readTime, readBy, 0, readText)
  },
  
  render: function () {
	let readingSaved = <i></i>;
	let tooltipInstance = <Tooltip id="tip1">Readings will be saved when Submitting Job</Tooltip>
	let readingError = <i></i>;
	if (this.props.equipment.save_reading) {
	      //readingSaved = <i className="glyphicon glyphicon-trash" onClick={this.clearSavedReading}></i>
		readingSaved = <i></i>
	    }
	if(this.state.readingValValid=="error"||this.state.readingDateValid=="error"||this.state.readingTimeValid=="error")
		readingError = <tr><td colSpan="6"><Alert bsStyle="danger">Wrong reading value. Please correct...</Alert></td></tr>
    return (
    <div className="pull-left">
      <div onClick={this.openModal}>{this.props.equipment.actual_annual_running_hours || 'N.A.'}/{this.props.equipment.estimated_annual_running_hours}</div>
      <Modal bsSize="large" show={this.state.showModal} onHide={this.closeModal} >
        	<Modal.Header closeButton>
	            <Modal.Title>Readings</Modal.Title>
   	     	</Modal.Header>
        	<Modal.Body >
        		<Table id="tabReadings" className="Table">
        			<thead>
        				<tr>
        					<th colSpan="2">Date of reading</th>
        					<th>Reading by</th>
        					<th>Value</th>
        					<th colSpan="2">Comment</th>
        				</tr>
        			</thead>
        			<tbody>
        				<tr>
        					<td>
        						<Input type="Date" width="50px" id="readDate" name="readDate" value={this.state.new_readDate} ref="readDate" bsStyle={this.state.readingDateValid} hasFeedback onChange={this.onReadByChanged} />
        					</td>
        					<td>
        						<Input type="Time" id="readTime" name="readTime" value={this.state.new_readTime} ref="readTime" bsStyle={this.state.readingTimeValid} hasFeedback onChange={this.onReadByChanged} />
        					</td>
        					<td>
        						<Input type="text" id="readBy" name="readBy" value={this.state.new_readBy} ref="readBy" hasFeedback onChange={this.onReadByChanged}/>
        					</td>
        					<td>
        						<Input type="number" id="readVal" name="readVal" value={this.state.new_readVal} ref="readVal" bsStyle={this.state.readingValValid} hasFeedback onChange={this.onReadByChanged} />
        					</td>
        					<td>
        						<Input type="text" id="readText" maxLength="30" size="30" value={this.state.new_readText} hasFeedback onChange={this.onReadByChanged} />
        					</td>
        					<td>
        						{readingSaved}
        					</td>
        				</tr>
        				{readingError}
        				{this.getMeasurementDoc()}
        			</tbody>
        		</Table>
        	</Modal.Body>
        	<Modal.Footer>
	        	<button type="button" className="btn" onClick={this.closeModal}>Return</button>
	        	<button type="button" className="btn btn-primary" onClick={this.saveReading}>Create Reading</button>
        	</Modal.Footer>
	  </Modal>
	</div>
    )
  }
});

module.exports = ReadingInstance;