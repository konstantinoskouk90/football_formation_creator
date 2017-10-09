import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { WebAPI } from '../../web-api/web-api';
import { IPlayer, IStarter } from '../../interfaces/interfaces';
import { addL, removeS, removeL, populateArray } from '../../helper/helper';
import { squadUpdated, lineupUpdated, lineupRemoved, squadRemoved } from '../../messages/messages';

@inject(EventAggregator, WebAPI)
export class Lineup {

  // Variable to bind select value to
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
      // Update local starters array based on unique id (email) used as a foreign key
      this.starters = removeL(this.starters, msg.player.id, "email");
      // Notify other components of player being removed from lineup
      this.ea.publish(new lineupRemoved(msg.player.id));
    });
  }

  created() {
    // Local players array
    this.players = [];
    // Local starters array
    this.starters = populateArray();
  }

  dropdownChanged(id, changedValue) {

    let optionSel;

    const select = document.getElementsByTagName("select");

    for (let i = 0; i < select.length; i++) {

      let selectAttr = select[i].getAttribute("id");

      if (select[i].value === changedValue) {

        if (selectAttr !== id) {
          // Remove value of previous select element
          select[i].value = '';
          // Remove a player from the global web api lineup array
          this.api.removeFromLineup(selectAttr);
          // Update local starters array accordingly based on unique id (position) used as a primary key
          this.starters = removeL(this.starters, selectAttr, "id");
          // Notify other components of player being removed from lineup
          this.ea.publish(new lineupRemoved(selectAttr));
        } else {
          // Store selected option unique id (email) to use as foreign key
          optionSel = select[i].options[select[i].selectedIndex].getAttribute("id");
        }
      }
    }

    // Add a player to the global web api lineup array
    this.api.addToLineup(id, changedValue, optionSel);
    // Make use of helper function addL to add a player to the local lineup array
    this.starters = addL(this.starters, id, changedValue, optionSel);
    // Notify other components of player being added to lineup
    this.ea.publish(new lineupUpdated(id, changedValue, optionSel));
  }
}