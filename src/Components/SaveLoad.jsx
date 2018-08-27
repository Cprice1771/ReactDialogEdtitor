import React, { Component } from 'react';
import GameStore from '../Stores/GameStore';

class SaveLoad extends Component {


    save() {
        var a = document.createElement("a");
		document.body.appendChild(a);
		a.style = "display: none";
		var json = JSON.stringify(GameStore.getGame(), null, '\t'),
		blob = new Blob([json], {type: "octet/stream"}),
		url = window.URL.createObjectURL(blob);
		a.href = url;
		a.download = 'config-export.json';
		a.click();
		window.URL.revokeObjectURL(url);
    }

    load(event) {
        var reader = new FileReader();
        let me = this;
        reader.onload = function(progressEvent){
            var game = JSON.parse(this.result);
            GameStore.loadGame(game);
        };
        reader.readAsText(event.target.files[0]);
    }

    render() {
        return (
            <div style={{
                padding:'50px'
            }}>
           
            <h2>Save Game</h2>
            <button className='btn btn-primary' onClick={this.save}>Save</button>
            

            <h2>Load Game</h2>
            <span>Select file </span>
            <input type="file" onChange={this.load}/>
            
            </div>
        );
    }
}

export default SaveLoad;