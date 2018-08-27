import * as _ from 'lodash';
import React, { Component } from 'react';
import GameGraph from './GameGraph'
import { NodeType, ActionType } from '../Constants';
import NodeEditor from './NodeEditor';
import GameStore from '../Stores/GameStore';

const uuidv1 = require('uuid/v1');

class GraphView extends Component {

    constructor() {
      super();
      let startId = '1';
      let endId = '2';
      this.state = {
        Nodes: GameStore.getGraph(),
        Characters: GameStore.getCharacters(),
        SelectedNode: startId
      };
    }
  
    componentDidMount() {
      
    }
  
    RemoveNode = (id) => {
      var NodeCopy = _.cloneDeep(this.state.Nodes);
      var idx = _.findIndex(this.state.Nodes, item => item.id === id);
      if(idx > -1) {
        NodeCopy.splice(idx, 1);
      }
      this.setState({
        Nodes: NodeCopy
      })
      GameStore.updateGraph(NodeCopy);
    }
  
    AddNode = () => {
      var NodeCopy = _.cloneDeep(this.state.Nodes);
      NodeCopy.push({
        id: uuidv1(),
        Name: 'New Node',
        Description: '',
        NodeType: NodeType.Dialogue,
        Text: '',
        x: 0,
        y: 0,
        Actions: [],
        Conversation: []
      });
  
      this.setState({ Nodes: NodeCopy});
      GameStore.updateGraph(NodeCopy);
    }
  
    addAction = (nodeId) => {
      var NodeCopy = _.cloneDeep(this.state.Nodes);
      var idx = _.findIndex(this.state.Nodes, item => item.id === nodeId);
      NodeCopy[idx].Actions.push({
        id: uuidv1(),
        Name: 'New Action',
        Description: '',
        EndAt: nodeId,
      });
  
      this.setState({
        Nodes: NodeCopy
      });
      GameStore.updateGraph(NodeCopy);
    }
  
    onNodeChanged = (newNode) => {
      var NodeCopy = _.cloneDeep(this.state.Nodes);
      var nodeIdx = _.findIndex(this.state.Nodes, item => item.id === newNode.id);
      NodeCopy[nodeIdx] =  Object.assign(NodeCopy[nodeIdx], newNode);;
      this.setState({
        Nodes: NodeCopy
      });
      GameStore.updateGraph(NodeCopy);
    }
  
    NodeSelected = (node) => {
  
      if(node != null) {
        this.setState({
          SelectedNode: node.id
        });
      }
    }
  
    IsDisabled(type) {
        return type === 'Start' || type === 'End'
    }
  
    render() {
      var selectedNode = _.find(this.state.Nodes, x => x.id === this.state.SelectedNode);
  
      let deleteButton = !this.IsDisabled(selectedNode.NodeType) ? 
      (<button className="btn btn-danger" onClick={() => { this.props.deleteNode(this.props.Node.id)}}>Delete Node</button>)
        : '';

      return (
        <div>
          <GameGraph Nodes={this.state.Nodes}
          selected={selectedNode}
          onSelectNode={this.NodeSelected}
          onNodeChanged={this.onNodeChanged}/>
          <div className="row">
            <div className="col-md-6">
            </div>
              <div className="col-md-2">
                <select
                value={this.state.SelectedNode} 
                  onChange={x => {
                    this.NodeSelected({
                      id: x.target.value
                    });
                  }}
                >
                {this.state.Nodes.map(node => {
                return (<option key={uuidv1()} value={node.id}>{node.Name}</option>);
                })}
                </select>
              </div>
              <div className="col-md-2">
                <button className="btn btn-primary" onClick={this.AddNode}>Add Node</button>
              </div>
              <div className="col-md-2 ">
                {deleteButton}
              </div>
          </div>
          <br />
          <div className="row">
          <div className="col-md-12">
             <NodeEditor 
              AllNodes={this.state.Nodes} 
              Node={this.state.Nodes.find(node => node.id === this.state.SelectedNode)} 
              deleteNode={this.RemoveNode}
              addAction={this.addAction}
              onNodeChanged={this.onNodeChanged}
              Characters={this.state.Characters}
              />
             </div>
          </div>
        </div>
      );
    }
  }
  
  export default GraphView;