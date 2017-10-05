import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { WebAPI } from '../../web-api/web-api';
import { squadUpdated } from '../../messages';

@inject(WebAPI, EventAggregator)
export class Squad {

  players: object[] = [];

  constructor(private api: WebAPI, private ea: EventAggregator) {
    ea.subscribe(squadUpdated, msg => {
      this.players.push(msg.player);
    });
  }

  removePlayer(player) {
    this.api.removeFromSquad(player).then(player => {
      this.players = this.api.getSquad();
    });
  }
}