import React, { Component } from 'react';
import * as _ from 'lodash';

const StateTypes = ['num', 'bool', 'enum']

class GameStateLine extends Component {

    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div style={{
                width: '100%',
                margin: '5px',
                paddingTop: '12px',
                paddingBottom: '12px',
                textAlign: 'center',
                border: '1px solid #ccc',
                borderRadius: '4px'
            }}>
            <div className='row'>
                <div className='col-md-2'>
                    <input value={this.props.item.name} onChange={(x) => {
                        var copy = _.cloneDeep(this.props.item);
                        copy.name = x.target.value;
                        this.props.onChange(copy)
                    }} />
                </div>
                <div className='col-md-2'>
                    { this.props.item.type === 'num' &&
                        <input 
                        style={{ width: '100%'}}
                        type='number' value={this.props.item.defaultValue} onChange={(x) => {
                            var copy = _.cloneDeep(this.props.item);
                            copy.defaultValue = x.target.value;
                            this.props.onChange(copy)
                        }} />
                    }
                    { this.props.item.type === 'bool' &&
                        <select value={this.props.item.defaultValue} 
                        style={{ width: '100%'}}
                        onChange={(x) => { 
                            var copy = _.cloneDeep(this.props.item);
                            copy.defaultValue = x.target.value;
                            this.props.onChange(copy)
                            
                            }}>
                            <option value='true'>True</option>
                            <option value='false'>False</option>
                        </select>
                    }
                    { this.props.item.type === 'enum' &&
                        <select value={this.props.item.defaultValue} 
                        style={{ width: '100%'}}
                        onChange={(x) => { 
                            var copy = _.cloneDeep(this.props.item);
                            copy.defaultValue = x.target.value;
                            this.props.onChange(copy)
                            
                            }}>
                            <option value=''>No Value</option>
                            {
                                this.props.item.enumValues.map((val, index) => {
                                    return <option value={val}>{val}</option>
                                })
                            }
                        </select>
                    }
                </div>
                <div className='col-md-2'>
                    <select value={this.props.item.type} onChange={(x) => { 

                        var copy = _.cloneDeep(this.props.item);
                        copy.type = x.target.value;
                        this.props.onChange(copy)
                        
                        }}>
                        <option value='num'>Number</option>
                        <option value='bool'>Boolean</option>
                        <option value='enum'>Enumeration</option>
                    </select>
                </div>
                <div className='col-md-2'>
                    <button className='btn btn-danger' 
                    onClick={(val) => {this.props.onDelete(this.props.item.id)}}>Delete</button>
                </div>
                
            </div>
            {  this.props.item.type === 'enum' &&
            <div className='row'>
                <div className='col-md-10 pull-left'>
                    Values
                     {
                        this.props.item.enumValues.map((item, idx) => {
                            return (<span>
                                        <input value={item} style={{ margin:'0 0px 0 10px' }}
                                        onChange={(x) => {
                                            var copy = _.cloneDeep(this.props.item);
                                            var idx = _.findIndex(copy.enumValues, x => x === item);
                                            copy.enumValues[idx] = x.target.value;
                                            this.props.onChange(copy)
                                        }}
                                        /> 
                                        <span 
                                        style={{cursor:'pointer'}}
                                        onClick={(x) => { 
                                            var copy = _.cloneDeep(this.props.item);
                                            var idx = _.findIndex(copy.enumValues, x => x === item);
                                            copy.enumValues.splice(idx, 1);
                                            this.props.onChange(copy)
                                            }}>X</span>
                                    </span>);
                        })
                    }
                    
                </div>
                <div className='col-md-2'>
                    <button className='btn btn-secondary' onClick={(x) => { 
                            var copy = _.cloneDeep(this.props.item);
                            copy.enumValues.push('');
                            this.props.onChange(copy)
                            }}>Add Value</button>
                </div>
            </div>
            }
            </div>
        );
    }
}

export default GameStateLine;