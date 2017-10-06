import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { WebAPI } from '../../web-api/web-api';
import { squadUpdated, squadRemoved, lineupUpdated, lineupRemoved } from '../../messages';

@inject(WebAPI, EventAggregator)
export class Tactics {

  starters = [
    {
      id: 'GK',
      firstName: '',
      lastName: '',
      email: ''
    }, {
      id: 'RB',
      firstName: '',
      lastName: '',
      email: ''
    }, {
      id: 'CBR',
      firstName: '',
      lastName: '',
      email: ''
    }, {
      id: 'CBL',
      firstName: '',
      lastName: '',
      email: ''
    }, {
      id: 'LB',
      firstName: '',
      lastName: '',
      email: ''
    }, {
      id: 'MR',
      firstName: '',
      lastName: '',
      email: ''
    }, {
      id: 'CMR',
      firstName: '',
      lastName: '',
      email: ''
    }, {
      id: 'CML',
      firstName: '',
      lastName: '',
      email: ''
    }, {
      id: 'ML',
      firstName: '',
      lastName: '',
      email: ''
    }, {
      id: 'STR',
      firstName: '',
      lastName: '',
      email: ''
    }, {
      id: 'STL',
      firstName: '',
      lastName: '',
      email: ''
    }
  ];

  constructor(private api: WebAPI, private ea: EventAggregator) {
    ea.subscribe(lineupUpdated, msg => {
      let instance = { id: msg.id, firstName: msg.changedValue.split(" ")[0], lastName: msg.changedValue.split(" ")[1], email: msg.changedValue.split(" ")[2] };
      let found = this.starters.filter(x => x.id == msg.id)[0];
      if (found) {
        let index = this.starters.indexOf(found);
        if (index > -1) {
          this.starters.splice(index, 1, instance);
        }
      }
    });
    ea.subscribe(lineupRemoved, msg => {
      let instance = { id: msg.id, firstName: '', lastName: '', email: '' };
      let found = this.starters.filter(x => x.id == msg.id)[0];
      if (found) {
        let index = this.starters.indexOf(found);
        if (index > -1) {
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
}