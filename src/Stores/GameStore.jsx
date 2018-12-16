import { NodeType, ActionType } from '../Constants';
import { EventEmitter } from 'events'

var _state = {
    nodes: [
        {
            id: '1',
            Name: 'Start Node',
            NodeType: NodeType.Start,
            Description: 'Where the game starts',
            Conversation: [{
                id: '1',
                Speaker: 'narrator',
                Text: 'Hello World'
            }],
            x: 0,
            y: 0,
            Actions: [{
              Id: 'apples',
              EndAt: '2',
              Name: 'End Game',
              Description: 'End the game'
            }]
          },
          {
            id: '2',
            Name: 'End Node',
            NodeType: NodeType.End,
            Description: 'Where the game ends',
            Conversation: [{
                id: '1',
                Speaker: 'narrator',
                Text: 'Goodbye World'
              }],
            x: 0,
            y: 100,
            Actions: []
          }
    ],
    characters: [{
        id: 'narrator',
        Name: 'Narrator',
        Description: 'Narrator for the story'
    }]
}

class GameStoreClass {

    constructor() {
        this.emitter = new EventEmitter();        
    }

    getGameState() {
        return _state.gameState;
    }

    getGraph() {
        return _state.nodes;
    }

    getCharacters() {
        return _state.characters;
    }

    getGame() {
        return _state;
    }

    loadGame(game) {
        _state = game;
        this.emitChange(_state);
    }

    updateGameState(gameState) {
        _state.gameState = gameState;
    }

    updateCharacters(newChars) {
        _state.characters = newChars;
    }

    updateGraph(newNodes) {
        _state.nodes = newNodes;
    }

    emitChange( data ) {
        this.emitter.emit('GamestoreChange', data)
    }

    addChangeListener( callback ) {
        this.emitter.on('GamestoreChange', callback)
    }

    removeChangeListener( callback ) {
        this.emitter.removeListener('GamestoreChange', callback)
    }
}


const GameStore = new GameStoreClass();
export default GameStore;