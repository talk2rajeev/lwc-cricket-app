import { LightningElement, api, track } from 'lwc';
import { setStore, getFromStore } from '../../../services/storage';

const over = [1,2,3,4,'ot',6,0,'wd','nb',0];

export default class StartMatch extends LightningElement {
    teams = [];
    playerName='';
    selectedTeamForMatch = [];
    start_toss = false;
    chooseBowler = false;
    toss_winner;
    battingTeam;
    filedingTeam;
    startBowling=false;
    bowlingTimer;
    timer;

    inning = 1;
    NoOfOvers=10;
    curOver=0.0;


    

    connectedCallback() {
        this.teams = getFromStore('teams') || [];
        this.selectedTeamForMatch = getFromStore('selectedTeamForMatch') || [];
        this.filedingTeam = getFromStore('filedingTeam');
        this.battingTeam = getFromStore('battingTeam');

        console.log(this.teams);
    }

    get teamSelected() {
        this.selectedTeamForMatch.length === 2;
    }

    get startingToss() {
        if(this.selectedTeamForMatch.length === 2) {
            this.start_toss = true;
            return true;
        }
        return false;
    }

    // get battingTeam() {
    //     if(this.inning === 1) {
    //         this.battingTeam = this.teams.find(t => t.name === this.toss_winner);
    //     }
    //     this.battingTeam = this.teams.find(t => t.name !== this.toss_winner);
    //     this.setBattingTeamToStore(battingTeam);
    //     return battingTeam;
    // }

    // get filedingTeam() {
    //     let filedingTeam;
    //     if(this.inning === 2) {
    //         filedingTeam = this.teams.find(t => t.name !== this.toss_winner);
    //     }
    //     this.setFieldingTeamToStore(filedingTeam);
    //     filedingTeam = this.teams.find(t => t.name === this.toss_winner);
    // }

    get showTeam() {
        return this.battingTeam && this.filedingTeam;
    }

    setBattingTeamToStore(battingTeam) {
        setStore('battingTeam', JSON.stringify(battingTeam));
    }

    setFieldingTeamToStore(fieldingTeam) {
        setStore('fieldingTeam', JSON.stringify(fieldingTeam));
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
        setStore('selectedTeamForMatch', JSON.stringify(this.selectedTeamForMatch));
        console.log(this.selectedTeamForMatch)
    }

    randomlySelectWinner() {
        this.toss_winner = Math.floor(Math.random() *10) % 2 === 0 ? this.selectedTeamForMatch[0] : this.selectedTeamForMatch[1];
        this.battingTeam = this.teams.find(t => t.name === this.toss_winner);
        this.filedingTeam = this.teams.find(t => t.name !== this.toss_winner);
        this.setBattingTeamToStore(this.battingTeam);
        this.setFieldingTeamToStore(this.filedingTeam);
        alert(this.toss_winner+' Won the toss and will bat first');
        this.chooseBowler = true;
    }

    closeChooseBowlerDialog() {
        this.chooseBowler = false;

    }

    onBowlerChange(e) {
        const bowler = e.target.value;
        this.startAnimation();
    }

    startAnimation() {
        this.bowlingTimer = 1;
        this.timer = setInterval(()=>{
            console.log('entereed startAnimation');
            if(this.bowlingTimer < 4) {
                console.log('timer incremented ', this.bowlingTimer);
                this.bowlingTimer+=1;
            } 
            if(this.bowlingTimer === 3) {
                console.log('End Animation');
                this.endAnimation();
            }
        }, 1000);
    }

    endAnimation() {
        clearInterval(this.timer);
    }

    showTimer() {
        return this.bowlingTimer ? true : false;
    }
}
