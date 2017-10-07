import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { WebAPI } from '../../web-api/web-api';
import { IPlayer, IStarter } from '../../interfaces/interfaces';
import { removeS } from '../../helper/helper';
import { lineup } from '../../settings/data';
import { squadUpdated, lineupUpdated, lineupRemoved, squadRemoved } from '../../messages/messages';

@inject(EventAggregator, WebAPI)
export class Lineup {

  changedVal;

  constructor(private ea: EventAggregator,
    private api: WebAPI,
    private players: IPlayer[],
    private starters: IStarter[]
  ) {

    // Listen for squadUpdated messages from other components
    ea.subscribe(squadUpdated, msg => {
      // Update local players array accordingly
      this.players.push(msg.player);
    });

    // Listen for squadRemoved messages from other components
    ea.subscribe(squadRemoved, msg => {
      // Update local players array accordingly
      this.players = removeS(this.players, msg.player);
      // Notify other components of player being removed from lineup
      this.ea.publish(new lineupRemoved(msg.player.id));
      let instance = { id: msg.player.id, firstName: '', lastName: '', email: '' };
      let found = this.starters.filter(x => x.id == msg.player.id)[0];
      if (found) {
        let index = this.starters.indexOf(found);
        if (index !== -1) {
          this.starters.splice(index, 1, instance);
          console.log(this.starters);
        }
      }
    });
  }

  // Initialize arrays
  created() {
    // Local players array
    this.players = [];
    // Local starters array
    this.starters = lineup;
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
          let instance = { id: document.querySelectorAll("select")[i].getAttribute("id"), firstName: '', lastName: '', email: '' };
          let found = this.starters.filter(x => x.id == document.querySelectorAll("select")[i].getAttribute("id"))[0];
          if (found) {
            let index = this.starters.indexOf(found);
            if (index !== -1) {
              this.starters.splice(index, 1, instance);
              console.log(this.starters);
            }
          }
        }
      }
    }
    this.api.addToLineup(id, changedValue);
    this.ea.publish(new lineupUpdated(id, changedValue));
    let instance = { id: id, firstName: changedValue.split(" ")[0], lastName: changedValue.split(" ")[1], email: changedValue.split(" ")[2] };
    let found = this.starters.filter(x => x.id == id)[0];
    if (found) {
      let index = this.starters.indexOf(found);
      this.starters[index] = instance;
    }
    console.log(this.starters);
  }
}