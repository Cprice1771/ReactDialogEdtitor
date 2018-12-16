import React, { Component } from 'react';
import '../css/App.css';
import ActionEditor from './ActionEditor';
import * as _ from 'lodash';
import ConversationEditor from './ConversationEditor';
const uuidv1 = require('uuid/v1');

class NodeEditor extends Component {

    IsDisabled(type) {
        return type === 'Start' || type === 'End'
    }

  onActionChange = (action) => {
    var actionIdx = _.findIndex(this.props.Node.Actions, item => item.id === action.id);
    var nodeCpy = _.cloneDeep(this.props.Node);
    nodeCpy.Actions[actionIdx] = action;
    this.props.onNodeChanged(nodeCpy)
  }

  deleteAction = (id) => {
    var actionIdx = _.findIndex(this.props.Node.Actions, item => item.id === id);
    var nodeCpy = _.cloneDeep(this.props.Node);
    nodeCpy.Actions.splice(actionIdx, 1);
    this.props.onNodeChanged(nodeCpy)
  }

  onDialogueAdded = (x) => {
    var nodeCopy  = _.cloneDeep(this.props.Node);
    nodeCopy.Conversation.push({
        id: uuidv1(),
        Speaker: 'narrator',
        Text: ''
      });
    this.props.onNodeChanged(nodeCopy);
  }

  onDialogueChanged = (dialogue) => {
    var actionIdx = _.findIndex(this.props.Node.Conversation, item => item.id === dialogue.id);
    var nodeCpy = _.cloneDeep(this.props.Node);
    nodeCpy.Conversation[actionIdx] = dialogue;
    this.props.onNodeChanged(nodeCpy);
  }

  onDialogueDeleted = (id) => {
    var dialogueIdx = _.findIndex(this.props.Node.Conversation, item => item.id === id);
    var nodeCpy = _.cloneDeep(this.props.Node);
    nodeCpy.Conversation.splice(dialogueIdx, 1);
    this.props.onNodeChanged(nodeCpy)
  }

  render() {
      if(!this.props.Node) {

        return <div>Select a node</div>
      }

      

      let actions = this.props.Node.Actions.map((a, i) => {
        return <ActionEditor
                key={i}
                Node={this.props.Node}
                Nodes={this.props.AllNodes} 
                Action={a}
                onActionChange={this.onActionChange}
                deleteAction={this.deleteAction}
                />;
        });

    return (
        <div className="borderBox">
            <div className="row">
                <div className="col-md-12 pull-left">
                    <div className="row">
                    <div className="col-md-12">
                        <label className="label-display">Name<input type="text" value={this.props.Node.Name} 
                        onChange={x =>{
                            let copy = _.cloneDeep(this.props.Node);
                            copy.Name = x.target.value;
                            this.props.onNodeChanged(copy);
                        }}/></label>
                    </div></div>
                    <div className="row"><div className="col-md-12">
                        <label className="label-display">Description
                            <input type="text" 
                            value={this.props.Node.Description}
                            onChange={x =>{
                                let copy = _.cloneDeep(this.props.Node);
                                copy.Description = x.target.value;
                                this.props.onNodeChanged(copy);
                            }}
                        /></label>
                    </div></div>
                    <div className="row">
                        <div className="col-md-12">
                        <label className="label-display">Node type
                            <select 
                            value={this.props.Node.NodeType} 
                            disabled={this.IsDisabled(this.props.Node.NodeType)}
                            onChange={x =>{
                                let copy = _.cloneDeep(this.props.Node);
                                copy.NodeType = x.target.value;
                                this.props.onNodeChanged(copy);
                            }}
                            >
                                <option value="Dialoge">Dialoge</option>
                                <option value="Cutscene">Cutscene</option>
                                <option value="Puzzle">Puzzle</option>
                            </select>
                        </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                        {
                            this.props.Node.Conversation.map((c, i) => {
                                return <ConversationEditor 
                                Dialogue={c}
                                key={i}
                                Characters={this.props.Characters}
                                onDialogueChanged={this.onDialogueChanged}
                                onDialogueDeleted={this.onDialogueDeleted}
                                />
                            })
                        }
                        
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <button className='btn btn-primary pull-right'
                    onClick={this.onDialogueAdded}>
                    Add Dialogue
                    </button>
                </div>
            </div>
            <div className="row">
                <h3>Actions</h3>            
            </div>
            <div className="row">
                {actions}
            </div>
            <div className="row">
            <div className="col-md-12">
                    <button
                        className="btn btn-primary pull-right" 
                        onClick={() => {this.props.addAction(this.props.Node.id)}}>Add Action</button>
            </div>
            </div>
      
        </div>
    );
  }
}

export default NodeEditor;
