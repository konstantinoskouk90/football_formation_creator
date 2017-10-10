import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { WebAPI } from '../../web-api/web-api';
import { IStarter } from '../../interfaces/interfaces';
import { populateArray } from '../../helpers/helpers';
import { squadRemoved, lineupUpdated, lineupRemoved } from '../../messages/messages';

@inject(EventAggregator, WebAPI)
export class Tactics {

  constructor(private ea: EventAggregator, private api: WebAPI, private starters: IStarter[], private goal) {

    ea.subscribe(lineupUpdated, msg => {
      let instance = { id: msg.id, firstName: msg.changedValue.split(" ")[0], lastName: msg.changedValue.split(" ")[1], email: msg.optionSel };
      let found = this.starters.filter(x => x.id == msg.id)[0];
      if (found) {
        let index = this.starters.indexOf(found);
        if (index !== -1) {
          this.starters.splice(index, 1, instance);
        }
      }
    });

    ea.subscribe(lineupRemoved, msg => {
      let instance = { id: msg.id, firstName: '', lastName: '', email: '' };
      let found = this.starters.filter(x => x.id == msg.id)[0];
      if (found) {
        let index = this.starters.indexOf(found);
        if (index !== -1) {
          this.starters.splice(index, 1, instance);
        }
      }
    });

    ea.subscribe(squadRemoved, msg => {
      let instance = JSON.parse(JSON.stringify(msg.player));
      let found = this.starters.filter(x => x.email == msg.player.id)[0];
      if (found) {
        let index = this.starters.indexOf(found);
        if (index !== -1) {
          this.starters.splice(index, 1, { id: found.id, firstName: '', lastName: '', email: '' });
        }
      }
    });
  }

  created() {
    // Local starters array
    this.starters = populateArray();
    this.goal = [];
  }
}