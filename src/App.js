import * as _ from 'lodash';
import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';
import GameGraph from './Components/GameGraph'
import { NodeType, ActionType } from './Constants';
import NodeEditor from './Components/NodeEditor';

const uuidv1 = require('uuid/v1');


class App extends Component {

  constructor() {
    super();
    let startId = uuidv1();
    let endId = uuidv1();
    this.state = {
      Nodes: [
        {
          Id: startId,
          Name: 'Start Node',
          NodeType: NodeType.Start,
          Description: 'Where the game starts',
          Actions: [{
            EndAt: endId
          }]
        },
        {
          Id: endId,
          Name: 'End Node',
          NodeType: NodeType.End,
          Description: 'Where the game ends',
          Actions: []
        }
      ],
      SelectedNode: startId
    };
  }

  componentDidMount() {
    
  }

  RemoveNode = (id) => {
    var NodeCopy = _.cloneDeep(this.state.Nodes);
    var idx = _.findIndex(this.state.Nodes, item => item.Id === id);
    if(idx > -1) {
      NodeCopy.splice(idx, 1);
    }
    this.setState({
      Nodes: NodeCopy
    })
  }

  AddNode = () => {
    var NodeCopy = _.cloneDeep(this.state.Nodes);
    NodeCopy.push({
      Id: uuidv1(),
      Name: 'New Node',
      Description: '',
      NodeType: NodeType.Dialoge,
      Actions: []
    });

    this.setState({ Nodes: NodeCopy});
  }

  NodeSelected = (id) => {
    this.setState({
      SelectedNode: id
    })
  }

  render() {
    return (
      <div className="App">
        <GameGraph Nodes={this.state.Nodes} onSelected={this.NodeSelected}/>
        <div className="row">
        <div className="col-md-6">
        </div>
        <div className="col-md-6">
          <select value={this.state.SelectedNode}>
           {this.state.Nodes.map(node => {
           return (<option key={uuidv1()} value={node.Id}>{node.Name}</option>);
           })}
          </select>
          <button className="btn btn-primary" onClick={this.AddNode}>Add Node</button>
        </div>
        </div>
        <div className="row">
        <div className="col-md-12">
           <NodeEditor Node={this.state.Nodes.find(node => node.Id === this.state.SelectedNode)} deleteNode={this.RemoveNode}/>
           </div>
        </div>
      </div>
    );
  }
}

export default App;
