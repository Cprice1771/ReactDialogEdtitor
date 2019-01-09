import React, { Component } from 'react';
import '../css/App.css';
import * as _ from 'lodash';
import GameStore from '../Stores/GameStore';

const uuidv1 = require('uuid/v1');
class ActionEditor extends Component {

  render() {
    return (<div>
      <div className="row">
        <div className="col-md-2 pull">
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
        <div className="col-md-4">
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
        {/* <div className="col-md-3">
            <button className="btn btn-primary" onClick={() => {  
                    let copy = _.cloneDeep(this.props.Action);

                    if(!copy.Requirements) {
                        copy.Requirements = [];
                    }

                    copy.Requirements.push({
                        State: null,
                        Operator: null,
                        Value: null,
                    });
                    this.props.onActionChange(copy);
                    }}>Add Req</button>
        </div> */}
        <div className="col-md-2">
            <button className="btn btn-danger" onClick={() => { this.props.deleteAction(this.props.Action.id)}}>Delete</button>
        </div>
      </div>
      {
         this.props.Action.Requirements && this.props.Action.Requirements.map((item, idx) => {
             debugger;
            let gameState = GameStore.getGameState();
            let selectedState = _.find(gameState, x => x.id === item.State);
            let selectedStateType = selectedState ? selectedState.type : null;

            return (
            <div className="row">
                <div className="col-md-3">
                    <label className="label-display">State
                        <select value={item.State}
                            onChange={x =>{
                                let copy = _.cloneDeep(this.props.Action);
                                copy.Requirements[idx].State = x.target.value;
                                this.props.onActionChange(copy);
                            }}
                            >
                            {gameState.map(state => {
                            return (<option key={state.id} value={state.id}>{state.name}</option>);
                            })}
                        </select>
                    </label>
                </div>
                { selectedStateType === 'num' &&
                    <div className="col-md-3">
                        <label className="label-display">Operator
                            <select value={item.State}
                                onChange={x =>{
                                    let copy = _.cloneDeep(this.props.Action);
                                    copy.Requirements[idx].Operator = x.target.value;
                                    this.props.onActionChange(copy);
                                }}
                                >
                                <option value='LessThan'>Less Than</option>
                                <option value='GreaterThan'>Greater Than</option>
                                <option value='EqualTo'>Equal To</option>
                            </select>
                        </label>
                    </div> 
                }
                <div className="col-md-3">
                    <label className="label-display">Required Value
                        { selectedStateType === 'enum' &&
                            <select value={item.Value}
                                onChange={x =>{
                                    let copy = _.cloneDeep(this.props.Action);
                                    copy.Requirements[idx].value = x.target.value;
                                    this.props.onActionChange(copy);
                                }}
                                >
                                    {selectedState.enumValues.map(state => {
                                    return (<option key={state.id} value={state.id}>{state.Name}</option>);
                                    })}
                            </select>
                        }
                        { selectedStateType === 'bool' &&
                            <select value={item.Value}
                                onChange={x =>{
                                    let copy = _.cloneDeep(this.props.Action.Requirements);
                                    copy.Requirements[idx].value = x.target.value;
                                    this.props.onActionChange(copy);
                                }}
                                >
                                    <option value={'true'}>True</option>
                                    <option value={'false'}>False</option>
                            </select>
                        }
                        { selectedStateType === 'num' &&
                            <input 
                                style={{
                                    width:'100%'
                                }}
                                type="text" 
                                onChange={x =>{
                                    let copy = _.cloneDeep(this.props.Action);
                                    copy.Requirements[idx].value = x.target.value;
                                    this.props.onActionChange(copy);
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
