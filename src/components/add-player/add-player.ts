import { inject } from 'aurelia-framework';
import { Player } from './player';
import { squad } from '../../data';

export class AddPlayer {

  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;

  createPlayer = () => {
    // Push to player to squad array
    squad.push(new Player(this.firstName, this.lastName, this.email, this.phoneNumber));
    // Empty fields
    this.firstName = ''; this.lastName = ''; this.email = ''; this.phoneNumber = '';
  }

  get canCreate() {
    // Check if all fields contain a value
    return this.firstName && this.lastName && this.email && this.phoneNumber;
  }
}