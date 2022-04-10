import { LightningElement, track } from 'lwc';
import { setStore, getFromStore } from '../../../services/storage';

export default class Teams extends LightningElement {
    teams = [];
    players = [];

    teamName='';
    selectedTeam = null;
    @track isTeamSelected = false;

    connectedCallback() {
        this.teams = getFromStore('teams') || [];
    }
    onEnterTeamName(e){
        this.teamName = e.target.value;
        console.log(e.target.value);
        console.log('onchange ', this.teamName)
    }

    managePlayers(e) {
        const id = e.target.dataset.id;
        
    }

    createTeam() {
        const team = this.teams.find(team => team.name.toLowerCase() === this.teamName.toLowerCase());
        const newTeams = [...this.teams, {name: this.teamName, id: Math.floor(Math.random()*1000), players: []}];
        if (team) {
            alert('Team already exist')
        } else {
            this.teams = newTeams;
        }
        this.teamName ='';
        setStore('teams', JSON.stringify(newTeams));
    }

    deleteTeam() {
        const name = e.target.dataset.name;
        this.teams.filter(team => team.name === name);
    }
 
    managePlayers(e) {
        const selectedTeamId = e.target.dataset.id;
        this.selectedTeam = this.teams.find(team => team.id === Number(selectedTeamId));
        console.log('selectedTeam ', this.selectedTeam);
        this.isTeamSelected = true;
    }


    removeTeam(e) {
        const id = e.target.dataset.id;
        const newTeams = this.teams.filter(team => team.id !== id);
        this.teams = newTeams;
        setStore('teams', JSON.stringify(newTeams));
    }
}
