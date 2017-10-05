import { WebAPI } from '../data';
import { inject } from 'aurelia-framework';

@inject(WebAPI)
export class Lineup {

  starters;
  players;
  changedVal;

  constructor(private api: WebAPI) { }

  created() {
    this.starters = this.api.getLineup();
    this.players = this.api.getSquad();
  }

  dropdownChanged(id, changedValue) {
    // for all selected values
    for (var i = 0; i < document.querySelectorAll("select").length; i++) {
      // if selected value somewhere else deselect
      if (document.querySelectorAll("select")[i].value === changedValue) {
        if (document.querySelectorAll("select")[i].getAttribute("id") !== id) {
          document.querySelectorAll("select")[i].value = '';
          this.api.removeFromLineup(document.querySelectorAll("select")[i].getAttribute("id"));
        }
      }
    }
    this.api.addToLineup(id, changedValue);
  }
}

//I HAVE TO UPDATE THE LINEUP ARRAY OF OBJECTS TO REFLECT THE DROPDOWN CHANGES