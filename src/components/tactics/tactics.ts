import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { WebAPI } from '../../web-api/web-api';
import { lineupUpdated, lineupRemoved } from '../../messages';

interface Starter {
  id: string,
  firstName: string,
  lastName: string
}

@inject(WebAPI, EventAggregator)
export class Tactics {

  starters: Starter[] = [];

  constructor(private api: WebAPI, private ea: EventAggregator) {
    ea.subscribe(lineupUpdated, msg => {
      let instance = { id: msg.id, firstName: msg.changedValue.split(" ")[0], lastName: msg.changedValue.split(" ")[1] };
      this.starters.push(instance);
    });
    ea.subscribe(lineupRemoved, msg => {
      let instance = { id: msg.id, firstName: '', lastName: '' };
      let found = this.starters.filter(x => x.id == msg.id)[0];
      if (found) {
        let index = this.starters.indexOf(found);
        if (index > -1) {
          this.starters.splice(index, 1);
          this.starters.splice(index, 0, instance);
        }
      }
    });
  }
}