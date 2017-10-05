import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { WebAPI } from '../../web-api/web-api';
import { squadUpdated, squadRemoved } from '../../messages';

interface Player {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: number
}

@inject(WebAPI, EventAggregator)
export class Squad {

  players: Player[] = [];

  constructor(private api: WebAPI, private ea: EventAggregator) {

    ea.subscribe(squadUpdated, msg => {
      this.players.push(msg.player);
    });
  }

  removePlayer(player) {
    this.api.removeFromSquad(player).then(player => {
      console.log(player);
      let instance = JSON.parse(JSON.stringify(player));
      let found = this.players.filter(x => x.id == player.id)[0];
      if (found) {
        let index = this.players.indexOf(found);
        if (index !== -1) {
          this.players.splice(index, 1);
        }
      }
      this.ea.publish(new squadRemoved(player));
    });
  }
}