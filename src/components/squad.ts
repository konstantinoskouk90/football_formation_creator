import { WebAPI } from '../data';
import { inject } from 'aurelia-framework';

@inject(WebAPI)
export class Squad {

  players;

  constructor(private api: WebAPI) { }

  created() {
    this.players = this.api.getSquad();
  }

  removePlayer(player) {
    this.api.removeFromSquad(player).then(player => {
      this.players = this.api.getSquad();
    });
  }
}