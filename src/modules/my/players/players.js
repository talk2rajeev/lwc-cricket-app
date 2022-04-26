import { LightningElement, api, track } from 'lwc';
import { setStore, getFromStore } from '../../../services/storage';

export default class Players extends LightningElement {
    @track teams = [];
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
            setStore('unPickedPlayers',  JSON.stringify(this.unpickedPlayers));        
        }
        this.playerName ='';
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
        const playerName = ev.dataTransfer.getData("text/plain");
        const team = ev.target.dataset.team;
        
        const curTeam = this.teams.find(t => t.name === team);
        if(!curTeam.players.includes(playerName)) {
            curTeam.players.push(playerName);
            this.unpickedPlayers = this.unpickedPlayers.filter(player => player !== playerName);
        } 
        const newTeam = this.teams.map(team => team.name === team ? curTeam : team);
        this.teams = newTeam;
        setStore('teams', JSON.stringify(this.teams));
        setStore('unPickedPlayers', JSON.stringify(this.unpickedPlayers));
    }

    dragover_handler(ev) {
        ev.preventDefault();
        ev.dataTransfer.dropEffect = "move";
    }

    deletePlayer(e) {
        console.log('deletePlayer', e.target.dataset);   
        const newPlayerList = this.unpickedPlayers.filter(p => p !== e.target.dataset.playername);
        this.unpickedPlayers = newPlayerList;
        setStore('unPickedPlayers', JSON.stringify(newPlayerList));
    }

    removePlayerFromTeam(e) {
        console.log('removePlayerFromTeam', e.target.dataset); 
        const { team, playername } =  e.target.dataset;
        const newTeam = JSON.parse(JSON.stringify(this.teams));
        const t = this.teams.find(t => t.name === team);
        const newPlayers = t.players.filter(p => p!== playername);

        this.playerName = playername;
        this.createPlayer();

        const newTeamList = newTeam.map(t => {
            if(t.name === team) {
                return {
                    ...t,
                    players: newPlayers
                }
            }
            return t
        });
        this.teams = newTeamList;
        setStore('teams', JSON.stringify(this.teams));

        
    }
}
