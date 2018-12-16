import React, { Component } from 'react';
import * as _ from 'lodash';
import StyledTextarea from 'react-autosize-textarea';

class ConversationEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {
          textareaHeight: 38
        };
        this.myRef = React.createRef();
      }

    handleKeyUp(evt) {
        // Max: 75px Min: 38px
        let newHeight = Math.max(Math.min(evt.target.scrollHeight + 2, 500), 38);
        if (newHeight !== this.state.textareaHeight) {
          this.setState({
            textareaHeight: newHeight
          });
        }
      }

      getHeight() {
        // Max: 75px Min: 38px
        if(this.myRef != null && this.myRef.current != null) {
            let newHeight = Math.max(Math.min(this.myRef.current.scrollHeight + 2, 500), 38);
            return newHeight;
        } else {
            return 38;
        }
      }

    render() {
        let textareaStyle = { width: '100%', resize:'vertical' };
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
                {/* <textarea type="text" ref={this.myRef}
                style={textareaStyle}
                onChange={x =>{
                    let copy = _.cloneDeep(this.props.Dialogue);
                    copy.Text = x.target.value;
                    this.props.onDialogueChanged(copy);
                }}
                value={this.props.Dialogue.Text}/> */}
                
                <StyledTextarea
                style={textareaStyle}
                rows={1}
                theme={{
                    textarea: {
                        resize: 'vertical'
                    }
                }}
                onChange={x =>{
                    let copy = _.cloneDeep(this.props.Dialogue);
                    copy.Text = x.target.value;
                    this.props.onDialogueChanged(copy);
                }}
                value={this.props.Dialogue.Text}
                />

                </label>
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