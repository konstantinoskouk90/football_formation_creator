import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { WebAPI } from '../../web-api/web-api';
import { IPlayer } from '../../interfaces/interfaces';
import { removeS } from '../../helpers/helpers';
import { squadUpdated, squadRemoved } from '../../messages/messages';

@inject(EventAggregator, WebAPI)
export class Squad {

  constructor(private ea: EventAggregator, private api: WebAPI, private players: IPlayer[]) {

    // Listen for squadUpdated messages from other components
    ea.subscribe(squadUpdated, msg => {
      // Update local players array accordingly
      this.players.push(msg.player);
    });
  }

  // Initialize local players array
  created() {
    this.players = [];
  }

  // Remove a player from the squad arrays - global and local - and send message to update other components
  removePlayer(player) {
    
    // Remove a player from the global web api squad array
    this.api.removeFromSquad(player).then(player => {
      
      // Make use of helper function removeS to remove a player from the local squad array
      this.players = removeS(this.players, player);
      
      // Notify other components of player being removed from squad
      this.ea.publish(new squadRemoved(player));
    });
  }
}