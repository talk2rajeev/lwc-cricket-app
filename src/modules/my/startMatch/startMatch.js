import { LightningElement, api, track } from 'lwc';
import { setStore, getFromStore } from '../../../services/storage';

export default class StartMatch extends LightningElement {
    teams = [];
    playerName='';
    selectedTeamForMatch = [];

    connectedCallback() {
        this.teams = getFromStore('teams') || [];
        console.log(this.teams);
    }

    get teamSelected() {
        this.selectedTeamForMatch.length === 2;
    }

    selectTeam(e) {
        console.log(e.target.value);
    }


}
