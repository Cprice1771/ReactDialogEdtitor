import React, { Component } from 'react';
import * as _ from 'lodash';

class ConversationEditor extends Component {
    render() {
        return (
            <div className="row">
            <div className="col-md-2 pull">
                <label>Speaker<select type="text" 
                onChange={x =>{
                    let copy = _.cloneDeep(this.props.Dialogue);
                    copy.CharacterId = x.target.value;
                    this.props.onDialogueChanged(copy);
                }}
                value={this.props.Dialogue.CharacterId}>
                    {this.props.Characters.map(c => {
                        return (<option key={c.id} value={c.id}>{c.Name}</option>);
                        })}
                </select>
                </label>
            </div>
            <div className="col-md-8">
                <label className="label-display">Dialogue
                <textarea type="text" 
                style={{
                    width: '100%'
                }}
                onChange={x =>{
                    let copy = _.cloneDeep(this.props.Dialogue);
                    copy.Text = x.target.value;
                    this.props.onDialogueChanged(copy);
                }}
                value={this.props.Dialogue.Text}/></label>
            </div>
            <div className="col-md-2">
                <button className="btn btn-danger" 
                    onClick={() => { this.props.onDialogueDeleted(this.props.Dialogue.id)}}>
                    Delete
                </button>
            </div>
          </div>
        );
    }
}

export default ConversationEditor;