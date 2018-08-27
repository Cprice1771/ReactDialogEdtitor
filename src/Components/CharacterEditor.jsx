import React, { Component } from 'react';
import * as _ from 'lodash';

class CharacterEditor extends Component {

    canDeleteEdit = () => {
        return this.props.Character.id !== 'narrator';
    }

    render() {
        return (
            <div className='row'
            style={{
                width: '100%',
                
                textAlign: 'center',
                border: '1px solid #ccc',
                borderRadius: '16px'
            }}>
            <div className='col-md-3'>
                <label className="label-display">Name:
                <input 
                    disabled={!this.canDeleteEdit()}
                    style={{
                        width: '100%',
                    }}
                    type='text'
                    value={this.props.Character.Name}
                    onChange={x => {
                        var charClone = _.cloneDeep(this.props.Character);
                        charClone.Name = x.target.value;
                        this.props.onCharacterChange(charClone);
                    }}
                />
                </label>
            </div>
            <div className='col-md-8'>
                <label className="label-display">Description:
                <textarea 
                    style={{
                        width: '100%',
                    }}
                    value={this.props.Character.Description}
                    onChange={x => {
                        var charClone = _.cloneDeep(this.props.Character);
                        charClone.Description = x.target.value;
                        this.props.onCharacterChange(charClone);
                    }}
                />
                </label>
            </div>
            {
                this.canDeleteEdit() ?
            (<div className='center-content'>
                <button className="btn btn-danger" onClick={x => {
                    this.props.onDeleteCharacter(this.props.Character.id)
                }}>Delete</button>
            </div>) : false
            }
            </div>
        );
    }
}

export default CharacterEditor;