import React, { Component } from 'react';
import { Link, NavLink, Route } from 'react-router-dom';

class Sidebar extends Component {
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
                        <NavLink exact to='/saveload'>Save/Load</NavLink>
                    </li>
                </ul>
                </div>
            </div>
        );
    }
}

export default Sidebar;