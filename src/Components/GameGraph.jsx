import React, { Component } from 'react';
import '../css/App.css';
import Graph from 'react-graph-vis';

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
      return {id: x.Id, label: x.Name};
    })
    var edges = this.props.Nodes.reduce((acc, node) => {
      let id = node.Id
      return acc.concat(node.Actions.map(action => {
        return { from: id, to: action.EndAt }
      }))
    }, [])
    var graph = {
      nodes: nodes,
      edges: edges
    };
     
    var options = {
        layout: {
            hierarchical: true
        },
        edges: {
            color: "#000000"
        }
    };
    

    var events = {
        select: this.nodeSelected
    }

    return (
      <div className="App">
        <Graph graph={graph} options={options} events={events} style={{ height: "640px"}} />
      </div>
    );
  }
}

export default GameGraph;
