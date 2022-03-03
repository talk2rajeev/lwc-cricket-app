import { LightningElement, api } from 'lwc';
import { setStore, getFromStore } from '../../../services/storage';

export default class Players extends LightningElement {
    teams = [];

    playerName='';

    constructor() {
        super();

        this.teams = getFromStore('teams') || [];
    }

    addPlayer(e) {
        alert(e.template.querySelect('playerName').value);
    }
}
