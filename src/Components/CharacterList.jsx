import React, { Component } from 'react';
import * as _ from 'lodash';
import CharacterEditor from './CharacterEditor';
import GameStore from '../Stores/GameStore';
const uuidv1 = require('uuid/v1');

class CharacterList extends Component {


    constructor() {
        super();
        this.state = {
            Characters: GameStore.getCharacters()
        }
    }

    componentDidMount() {
        GameStore.addChangeListener(this.onGameStoreChange);
    }
  
      componentWillUnmount() {
        GameStore.removeChangeListener(this.onGameStoreChange);
    }
      
    onGameStoreChange = (newState) => {
        this.setState({ Characters: GameStore.getCharacters() });
    }

    addCharacter = () => {
        var charactersClone = _.cloneDeep(this.state.Characters);
        charactersClone.push({
            id: uuidv1(),
            Name: 'New',
            Description: ''
        });
        this.setState({
            Characters: charactersClone
        });
        GameStore.updateCharacters(charactersClone);
    }

    onDeleteCharacter = (characterId) => {
        var idx = _.findIndex(this.state.Characters, x => x.id === characterId);
        var charactersClone = _.cloneDeep(this.state.Characters);
        charactersClone.splice(idx, 1);
        this.setState({
            Characters: charactersClone
        });
        GameStore.updateCharacters(charactersClone);
    }

    onCharacterChange = (character) => {
        var idx = _.findIndex(this.state.Characters, x => x.id === character.id);
        var charactersClone = _.cloneDeep(this.state.Characters);
        charactersClone[idx] = character;
        this.setState({
            Characters: charactersClone
        });
        GameStore.updateCharacters(charactersClone);
    }

    render() {
        return (
            <div className='content'>
            <div className='row'>
            <h2>Characters</h2>
            </div>
                {
                    this.state.Characters.map(x => {
                        return <CharacterEditor Character={x} 
                        onCharacterChange={this.onCharacterChange} 
                        onDeleteCharacter={this.onDeleteCharacter}
                        />
                    })
                }
                <div className="row" style={{
                    paddingTop: '10px',
                }}>
                    <div className='col-md-12'>
                    <button className='btn btn-primary pull-right' onClick={this.addCharacter}>Add Character</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CharacterList;