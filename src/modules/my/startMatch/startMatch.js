import { LightningElement, api, track } from 'lwc';
import { setStore, getFromStore } from '../../../services/storage';

export default class StartMatch extends LightningElement {
    teams = [];
    playerName='';
    selectedTeamForMatch = [];
    start_toss = false;
    toss_winner;

    connectedCallback() {
        this.teams = getFromStore('teams') || [];
        console.log(this.teams);
    }

    get teamSelected() {
        this.selectedTeamForMatch.length === 2;
    }

    get selectTeam_one() {
        if(this.selectedTeamForMatch[0]) {
            return this.selectedTeamForMatch[0]
        }
        return null;
    }

    get selectTeam_two() {
        if(this.selectedTeamForMatch[1]) {
            return this.selectedTeamForMatch[1]
        }
        return null;
    }

    get startingToss() {
        if(this.selectedTeamForMatch.length === 2) {
            this.start_toss = true;
            return true;
        }
        return false;
    }

    get battingTeam() {
        return this.teams.find(t => t.name === this.toss_winner);
    }

    get showTeam() {
        return this.toss_winner ? true : false;
    }

    selectTeam(e) {
        if(e.target.value === 'select') {
            alert('please select a valid team from list');
            return;
        }
        if(this.selectedTeamForMatch.length === 2) {
            alert('2 teams already selected');
            return;
        } 
        if(this.selectedTeamForMatch.includes(e.target.value)) {
            alert(e.target.value, ' already selected for match');
            return;
        }
        this.selectedTeamForMatch = [...this.selectedTeamForMatch, e.target.value];
        console.log(this.selectedTeamForMatch)
    }

    randomlySelectWinner() {
        this.toss_winner = Math.floor(Math.random() *10) % 2 === 0 ? this.selectedTeamForMatch[0] : this.selectedTeamForMatch[1];
        alert(this.toss_winner+' Won the toss and will bat first');
    }


}
