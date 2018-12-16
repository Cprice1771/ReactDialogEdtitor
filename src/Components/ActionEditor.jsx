import React, { Component } from 'react';
import '../css/App.css';
import * as _ from 'lodash';

const uuidv1 = require('uuid/v1');
class ActionEditor extends Component {

  render() {
    return (<div>
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
        <div className="col-md-3">
            <label className="label-display">Description<input type="text" 
            onChange={x =>{
                let copy = _.cloneDeep(this.props.Action);
                copy.Description = x.target.value;
                this.props.onActionChange(copy);
            }}
            value={this.props.Action.Description}/></label>
        </div>
        <div className="col-md-3">
            <label className="label-display">End node
                <select value={this.props.Action.EndAt}
                    onChange={x =>{
                        let copy = _.cloneDeep(this.props.Action);
                        copy.EndAt = x.target.value;
                        this.props.onActionChange(copy);
                    }}
                    >
                    {this.props.Nodes.map(node => {
                    return (<option key={node.id} value={node.id}>{node.Name}</option>);
                    })}
                </select>
            </label>
        </div>
        <div className="col-md-2 center-content">
            <button className="btn btn-danger" onClick={() => { this.props.deleteAction(this.props.Action.id)}}>Delete Action</button>
        </div>
      </div>
      {
         this.props.requirements && this.props.requirements.map((item, idx) => {
            let selectedStateType = _.find(this.props.GameState, x => x.id === item.state).type;

            return (
            <div>
                <div className="col-md-3">
                    <label className="label-display">State
                        <select value={item.State}
                            onChange={x =>{
                                let copy = _.cloneDeep(this.props.requirements);
                                copy[idx].State = x.target.value;
                                this.props.onRequirementsChange(this.props.requirements);
                            }}
                            >
                            {this.props.GameState.map(state => {
                            return (<option key={state.id} value={state.id}>{state.name}</option>);
                            })}
                        </select>
                    </label>
                </div>
                <div className="col-md-3">
                    <label className="label-display">Operator
                        <select value={item.State}
                            onChange={x =>{
                                let copy = _.cloneDeep(this.props.requirements);
                                copy[idx].Operator = x.target.value;
                                this.props.onRequirementsChange(this.props.requirements);
                            }}
                            >
                            <option value='LessThan'>Less Than</option>
                            <option value='GreaterThan'>Greater Than</option>
                            <option value='EqualTo'>Equal To</option>
                        </select>
                    </label>
                </div>
                <div className="col-md-3">
                    <label className="label-display">Required Value
                        { selectedStateType === 'enum' &&
                            <select value={item.value}
                                onChange={x =>{
                                    let copy = _.cloneDeep(this.props.requirements);
                                    copy[idx].value = x.target.value;
                                    this.props.onRequirementsChange(this.props.requirements);
                                }}
                                >
                                    {item.enumValues.map(state => {
                                    return (<option key={state.id} value={state.id}>{state.Name}</option>);
                                    })}
                            </select>
                        }
                        { selectedStateType === 'bool' &&
                            <select value={item.value}
                                onChange={x =>{
                                    let copy = _.cloneDeep(this.props.requirements);
                                    copy[idx].value = x.target.value;
                                    this.props.onRequirementsChange(this.props.requirements);
                                }}
                                >
                                    {item.enumValues.map(state => {
                                    return (<option key={state.id} value={state.id}>{state.Name}</option>);
                                    })}
                            </select>
                        }
                        { selectedStateType === 'num' &&
                            <input 
                                style={{
                                    width:'100%'
                                }}
                                type="text" 
                                onChange={x =>{
                                    let copy = _.cloneDeep(this.props.requirements);
                                    copy[idx].value = x.target.value;
                                    this.props.onRequirementsChange(this.props.requirements);
                                }}
                                value={item.value}/>
                        }
                    </label>
                </div>
            </div>);
          })
      }
      </div>
    );
  }
}

export default ActionEditor;
