import React, { Component } from 'react';
import '../css/App.css';
import Graph from 'react-graph-vis';

class NodeEditor extends Component {

  constructor(props) {
    super(props);
  }


  IsDisabled(type) {
      return type === 'Start' || type === 'End'
  }

  render() {
      if(!this.props.Node) {

        return <div>Select a node</div>
      }

      let deleteButton = !this.IsDisabled(this.props.Node.NodeType) ? 
      (<button className="btn btn-danger" onClick={() => { this.props.deleteNode(this.props.Node.Id)}}>Delete</button>)
        : '';

    return (
      <div>
        <div className="row"><div className="col-md-4">
            <label>Name<input type="text" value={this.props.Node.Name}/></label>
        </div></div>
        <div className="row"><div className="col-md-4">
            <label>Description<input type="text" value={this.props.Node.Description}/></label>
        </div></div>
          <div className="row"><div className="col-md-4">
            <label>Node type
                <select value={this.props.NodeType} disabled={this.IsDisabled(this.props.Node.NodeType)}>
                    <option value="Dialoge">Dialoge</option>
                    <option value="Cutscene">Cutscene</option>
                    <option value="Puzzle">Puzzle</option>
                </select>
            </label>
        </div></div>
        <div className="row pull-right">
            <div className="col-md-2 ">
            {deleteButton}
            </div>
        </div>
      </div>
    );
  }
}

export default NodeEditor;
