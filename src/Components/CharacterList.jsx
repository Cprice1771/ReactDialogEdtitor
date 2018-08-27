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
        var idx = _.findIndex(this.state.Characters, x => x.id == characterId);
        var charactersClone = _.cloneDeep(this.state.Characters);
        charactersClone.splice(idx, 1);
        this.setState({
            Characters: charactersClone
        });
        GameStore.updateCharacters(charactersClone);
    }

    onCharacterChange = (character) => {
        var idx = _.findIndex(this.state.Characters, x => x.id == character.id);
        var charactersClone = _.cloneDeep(this.state.Characters);
        charactersClone[idx] = character;
        this.setState({
            Characters: charactersClone
        });
        GameStore.updateCharacters(charactersClone);
    }

    render() {
        return (
            <div style={{
                padding:'20px',
                width:'100%',
                height: '100%'
            }}>
                {
                    this.state.Characters.map(x => {
                        return <CharacterEditor Character={x} 
                        onCharacterChange={this.onCharacterChange} 
                        onDeleteCharacter={this.onDeleteCharacter}
                        />
                    })
                }
                <div className="row" style={{
                    wdith: '100%',
                    padding: '10px',
                }}>
                    <button 
                    style={{
                        right:'10px',
                        position: 'absolute'
                    }}
                    className='btn btn-primary' onClick={this.addCharacter}>Add Character</button>
                </div>
            </div>
        );
    }
}

export default CharacterList;