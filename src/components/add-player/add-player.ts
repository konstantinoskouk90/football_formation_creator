import { inject } from 'aurelia-framework';
import { WebAPI } from '../../data';
import { Player } from './player';

@inject(WebAPI)
export class AddPlayer {

  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  players;
  
  constructor(private api: WebAPI) { }

  createPlayer = () => {
    // Push to player to squad array
    this.api.addPlayer(new Player(this.firstName, this.lastName, this.email, this.phoneNumber));
    // Empty fields
    this.firstName = ''; this.lastName = ''; this.email = ''; this.phoneNumber = '';
  }

  get canCreate() {
    // Check if all fields contain a value
    return this.firstName && this.lastName && this.email && this.phoneNumber;
  }
}