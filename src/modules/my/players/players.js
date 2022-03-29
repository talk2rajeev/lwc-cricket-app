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

    dragstart_handler(ev) {
        const data = ev.target.dataset.playername;
        // Add the target element's id to the data transfer object
        ev.dataTransfer.setData("text/plain", data);
        ev.dataTransfer.effectAllowed = "move";
    }

    drop_handler(ev) {
        ev.preventDefault();
        // Get the id of the target and add the moved element to the target's DOM
        const data = ev.dataTransfer.getData("text/plain");
        console.log('drop_handler > received data ', data)
    }

    dragover_handler(ev) {
        ev.preventDefault();
        ev.dataTransfer.dropEffect = "move";
    }

    deletePlayer() {
        
    }
}
