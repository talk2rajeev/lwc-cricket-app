import { LightningElement, api } from 'lwc';
import { setStore, getFromStore } from '../../../services/storage';

export default class Teams extends LightningElement {
    teams = [];

    teamName='';

    constructor() {
        super();

        this.teams = getFromStore('teams') || [];
    }

    onEnterTeamName(e){
        this.teamName = e.target.value;
    }

    managePlayers(e) {
        const id = e.target.dataset.id;
        
    }

    createTeam() {
        const team = this.teams.find(team => team.name.toLowerCase() === this.teamName.toLowerCase());
        const newTeams = [...this.teams, {name: this.teamName, id: Math.floor(Math.random()*1000)}];
        if (team) {
            alert('Team already exist')
        } else {
            this.teams = newTeams;
        }
        this.teamName ='';
        setStore('teams', JSON.stringify(newTeams));
    }

    removeTeam(e) {
        const id = e.target.dataset.id;
        const newTeams = this.teams.filter(team => team.id !== id);
        this.teams = newTeams;
        setStore('teams', JSON.stringify(newTeams));
    }
}
