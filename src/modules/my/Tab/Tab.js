import { LightningElement, api } from 'lwc';

export default class Tab extends LightningElement { 
    @api tabs;

    tabChange(e) {
        console.log('>>>>',e.target.dataset.tab)
        //this.template.querySelector('.tab').forEach(el => el.className = (el.dataset.tab === e.target.dataset.tab) ?  'active' : '');
        const tabChangeEvent = new CustomEvent('tabchange', {
            detail: e.target.dataset.tab
        })
        this.dispatchEvent(tabChangeEvent)
    }
}
