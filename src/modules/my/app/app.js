import { LightningElement } from 'lwc';

/**
 * Team: Team list, create Team, drag drop player to team, open a player profile
 * Player: payer list, open a player profile
 * Match: Select team for Match, 
*/

export default class App extends LightningElement { 
    tabs = [{name: 'Teams', activeClass: 'active'}, {name: 'Players', activeClass: ''}, {name: 'Start Match', activeClass: ''}, {name: 'Point Table', activeClass: ''}];
    
    isHomePage = true;
    isTeamsPage=false;
    isPlayersPage=false;
    isStartMatchPage = false;
    isPointTablePage = false;

    handleTabChange(e) {
        this.tab = e.detail;
        this.tabs = this.tabs.map(tab => {
            this.isHomePage = e.detail === 'Home';
            this.isTeamsPage = e.detail === 'Teams';
            this.isPlayersPage = e.detail === 'Players';
            this.isStartMatchPage = e.detail === 'Start Match';
            this.isPointTablePage = e.detail === 'Point Table';

            return tab.name === e.detail ? {...tab, activeClass: 'active'} : tab
        });
    }


}
