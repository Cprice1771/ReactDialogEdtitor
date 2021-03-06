import React, { Component } from 'react';
import { Route } from 'react-router';
import GraphView from './GraphView';
import CharacterList from './CharacterList';
import SaveLoad from './SaveLoad';
import GameStateEditor from './GameStateEditor';

class Main extends Component {
    render() {
        return (
            <div className='main__container'>
                <Route path='/graph' render={() => <GraphView />} />
                <Route path='/characters' render={() => <CharacterList />} />
                <Route path='/state' render={() => <GameStateEditor />} />
                <Route path='/saveload' render={() => <SaveLoad />} />
            </div>
        );
    }
}

export default Main;