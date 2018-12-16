import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import GameStore from '../Stores/GameStore';

class Sidebar extends Component {

    save = (event) => {
        event.preventDefault();
        var a = document.createElement("a");
		document.body.appendChild(a);
		a.style = "display: none";
		var json = JSON.stringify(GameStore.getGame(), null, '\t'),
		blob = new Blob([json], {type: "octet/stream"}),
		url = window.URL.createObjectURL(blob);
		a.href = url;
		a.download = 'game-file.json';
		a.click();
		window.URL.revokeObjectURL(url);
    }

    load(event) {
        var reader = new FileReader();
        reader.onload = function(progressEvent){
            var game = JSON.parse(this.result);
            GameStore.loadGame(game);
        };
        reader.readAsText(event.target.files[0]);
    }

    render() {
        return (
            <div className='sidebar'>
            <div className='sidebar__content'>
                <ul className='nav-main'>
                    <li>
                        <NavLink exact to='/graph'>Graph</NavLink>
                    </li>
                    <li>
                        <NavLink exact to='/characters'>Characters</NavLink>
                    </li>
                    <li>
                        <NavLink exact to='/state'>Game State</NavLink>
                    </li>
                    <li>
                        <a href='' onClick={this.save} class='sidebar-link'>Save</a>
                    </li>
                    <li>
                        <input type="file" name="file" id="file" className="inputfile" onChange={this.load}/>
                        <label for="file" className='file-link'>Load</label>
                    </li>
                </ul>
                </div>
            </div>
        );
    }
}

export default Sidebar;