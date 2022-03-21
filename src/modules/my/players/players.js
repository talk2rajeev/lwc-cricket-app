import { LightningElement, api } from 'lwc';
import { setStore, getFromStore } from '../../../services/storage';

export default class Players extends LightningElement {
    teams = [];
    unpickedPlayers = [];
    playerName='';

    connectedCallback() {
        this.teams = getFromStore('teams') || [];
        this.unpickedPlayers =  getFromStore('unPickedPlayers') || [];
    }
    

    onEnterPlayerName(e) {
        this.playerName = e.target.value;
    }

    createPlayer(e) {
        this.unpickedPlayers = getFromStore('unPickedPlayers') || [];
        if(this.unpickedPlayers.includes(this.playerName)) {
            alert('player already exist');
        } else {
            this.unpickedPlayers.push(this.playerName);
            this.playerName = '';
            setStore('unPickedPlayers',  JSON.stringify(this.unpickedPlayers));        
        }
    }

    deletePlayer() {
        
    }
}
