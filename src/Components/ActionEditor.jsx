import React, { Component } from 'react';
import '../css/App.css';
import Graph from 'react-graph-vis';
import * as _ from 'lodash';

const uuidv1 = require('uuid/v1');
class ActionEditor extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-4 pull">
            <label className="label-display">Name<input 
            style={{
                width:'100%'
            }}
            type="text" 
            onChange={x =>{
                let copy = _.cloneDeep(this.props.Action);
                copy.Name = x.target.value;
                this.props.onActionChange(copy);
            }}
            value={this.props.Action.Name}/></label>
        </div>
        <div className="col-md-4">
            <label className="label-display">Description<input type="text" 
            onChange={x =>{
                let copy = _.cloneDeep(this.props.Action);
                copy.Description = x.target.value;
                this.props.onActionChange(copy);
            }}
            value={this.props.Action.Description}/></label>
        </div>
        <div className="col-md-2">
            <label className="label-display">End node
                <select value={this.props.Action.EndAt}
                    onChange={x =>{
                        let copy = _.cloneDeep(this.props.Action);
                        copy.EndAt = x.target.value;
                        this.props.onActionChange(copy);
                    }}
                    >
                    {this.props.Nodes.map(node => {
                    return (<option key={uuidv1()} value={node.id}>{node.Name}</option>);
                    })}
                </select>
            </label>
        </div>
        <div className="col-md-2 center-content">
            <button className="btn btn-danger" onClick={() => { this.props.deleteAction(this.props.Action.id)}}>Delete Action</button>
        </div>
      </div>
    );
  }
}

export default ActionEditor;
