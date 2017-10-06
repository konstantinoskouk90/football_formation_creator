import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { WebAPI } from '../../web-api/web-api';
import { squadUpdated, lineupUpdated, lineupRemoved, squadRemoved } from '../../messages';

interface Player {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: number
}

@inject(WebAPI, EventAggregator)
export class Lineup {

  players: Player[] = [];
  starters;
  changedVal;

  constructor(private api: WebAPI, private ea: EventAggregator) {
    ea.subscribe(squadUpdated, msg => {
      this.players.push(msg.player);
    });
    ea.subscribe(squadRemoved, msg => {
      let instance = JSON.parse(JSON.stringify(msg.player));
      let found = this.players.filter(x => x.id == msg.player.id)[0];
      if (found) {
        let index = this.players.indexOf(found);
        if (index !== -1) {
          this.players.splice(index, 1);
          this.ea.publish(new lineupRemoved(msg.player.id));
        }
      }
    });
  }

  created() {
    this.starters = this.api.getLineup();
  }

  dropdownChanged(id, changedValue) {
    // for all selected values
    for (var i = 0; i < document.querySelectorAll("select").length; i++) {
      // if selected value somewhere else deselect
      if (document.querySelectorAll("select")[i].value === changedValue) {
        if (document.querySelectorAll("select")[i].getAttribute("id") !== id) {
          document.querySelectorAll("select")[i].value = '';
          this.api.removeFromLineup(document.querySelectorAll("select")[i].getAttribute("id"));
          this.ea.publish(new lineupRemoved(document.querySelectorAll("select")[i].getAttribute("id")));
        }
      }
    }
    this.api.addToLineup(id, changedValue);
    this.ea.publish(new lineupUpdated(id, changedValue));
  }
}

//I HAVE TO UPDATE THE LINEUP ARRAY OF OBJECTS TO REFLECT THE DROPDOWN CHANGES