import React, { Component } from 'react';
import GameStateLine from './GameStateLine';
import GameStore from '../Stores/GameStore';
import * as _ from 'lodash';

const uuidv1 = require('uuid/v1');




class GameStateEditor extends Component {


    constructor() {
        super();
        this.state = {
            GameState : GameStore.getGameState() || []
        };
    }

    addState = () => {
        var gameState = _.cloneDeep(this.state.GameState);
        gameState.push({
            id: uuidv1(),
            name: 'New Value',
            defaultValue: 0,
            type: 'num',
            enumValues: [],
        });
        this.setState({ GameState: gameState })
    }

    componentDidMount() {
        GameStore.addChangeListener(this.onGameStoreChange);
    }
  
    componentWillUnmount() {
        GameStore.removeChangeListener(this.onGameStoreChange);
    }
      
    onGameStoreChange = (newState) => {
        this.setState({ GameState : GameStore.getGameState() || [] });
    }

    onDelete = (id) => {
        var idx = _.findIndex(this.state.GameState, x => x.id === id)
        var gameState = _.cloneDeep(this.state.GameState);
        gameState.splice(idx, 1);
        this.setState({ GameState: gameState });
        GameStore.updateGameState(gameState);
    }

    onStateChange = (newRow) => {
        var idx = _.findIndex(this.state.GameState, x => x.id === newRow.id)
        var gameState = _.cloneDeep(this.state.GameState);
        gameState[idx] = newRow;
        this.setState({ GameState: gameState });
        GameStore.updateGameState(gameState);
    }

    render() {
        return (
            <div className='content'>
                <h2>Game State</h2>
                { this.state.GameState &&
                    this.state.GameState.map((item, id) => {
                        return <GameStateLine 
                            onChange={this.onStateChange}
                            item={item}
                            onDelete={this.onDelete}
                        />
                    })
                }
                <div className="row" style={{
                    paddingTop: '10px',
                }}>
                    <div className='col-md-12'>
                    <button className='btn btn-primary pull-right' onClick={this.addState}>Add State</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default GameStateEditor;