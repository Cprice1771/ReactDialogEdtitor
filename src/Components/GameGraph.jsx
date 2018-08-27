import * as _ from 'lodash';
import React, { Component } from 'react';
import '../css/App.css';
import GraphView from 'react-digraph'

const GraphConfig =  {
    NodeTypes: {
      Start: {
        typeText: '',
        shapeId: "#start",
        shape: (
          <symbol viewBox="0 0 100 100" id="start" key="0">
            <circle cx="50" cy="50" r="45" fill="green"></circle>
          </symbol>
        )
      },
      End: {
        typeText: '',
        shapeId: "#end",
        shape: (
          <symbol viewBox="0 0 100 100" id="end" key="1">
            <circle cx="50" cy="50" r="45" fill="red"></circle>
          </symbol>
        )
      },
      Dialogue: {
        typeText: '',
        shapeId: "#dialogue",
        shape: (
          <symbol viewBox="0 0 100 100" id="dialogue" key="2">
            <circle cx="50" cy="50" r="45" fill="steelblue"></circle>
          </symbol>
        )
      }

    },
    NodeSubtypes: {},
    EdgeTypes: {
      emptyEdge: {
        shapeId: "#emptyEdge",
        shape: (
          <symbol viewBox="0 0 50 50" id="emptyEdge" key="0">
            <circle cx="25" cy="25" r="8" fill="currentColor"> </circle>
          </symbol>
        )
      }
    }
  }

  const EMPTY_TYPE = "empty"  // Text on empty nodes is positioned differently
  const NODE_KEY = "id"       // Allows D3 to correctly update DOM

class GameGraph extends Component {

  constructor(props) {
    super(props);
  }

  nodeSelected = (event) => {
    var { nodes, edges } = event;
    if(nodes.length > 0) {
      this.props.onSelected(nodes[0]);
    }
  }

  render() {

    var nodes = this.props.Nodes.map(x => {
      return {
        id: x.id, 
        title: x.Name,
        x: x.x,
        y: x.y,
        type: x.NodeType,
    };
    });
    var edges = this.props.Nodes.reduce((acc, node) => {
      let id = node.id
      return acc.concat(node.Actions.map(action => {
        return { source: id, target: action.EndAt, type: 'emptyEdge' }
      }))
    }, []);
    
    const selected = this.props.selected;
    const NodeTypes = GraphConfig.NodeTypes;
    const NodeSubtypes = GraphConfig.NodeSubtypes;
    const EdgeTypes = GraphConfig.EdgeTypes;

    return (
      <div id='graph' className="App" style={{
          height: '680px',
      }}>
        <GraphView 
            nodeKey={NODE_KEY}
            emptyType={EMPTY_TYPE}
            nodes={nodes}
            edges={edges}
            selected={selected}
            nodeTypes={NodeTypes}
            nodeSubtypes={NodeSubtypes}
            edgeTypes={EdgeTypes}
            getViewNode={id => {
                return _.find(nodes, x => x.id == id)
            }}
            onSelectNode={this.props.onSelectNode}
            onCreateNode={x => {}}
            onUpdateNode={this.props.onNodeChanged}
            onDeleteNode={x => {}}
            onSelectEdge={x => {}}
            onCreateEdge={x => {}}
            onSwapEdge={x => {}}
            onDeleteEdge={x => {}}
            graphControls={false}
         />
      </div>
    );
  }
}

export default GameGraph;
