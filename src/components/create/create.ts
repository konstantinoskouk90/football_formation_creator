import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { WebAPI } from '../../web-api/web-api';
import { CreatePlayer } from './create-player';
import { squadUpdated } from '../../messages';

interface Player {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
}

@inject(WebAPI, EventAggregator)
export class Create {

  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;

  player: Player;
  
  constructor(private api: WebAPI, private ea: EventAggregator) { }

  createPlayer = () => {

    // Use the email as a unique identifier
    this.id = this.email;
    
    // Add player to squad array and send message
    this.api.addPlayer(new CreatePlayer(this.id, this.firstName, this.lastName, this.email, this.phoneNumber)).then(player => {
      this.player = <Player>player;
      this.ea.publish(new squadUpdated(this.player));
    });

    // Reset input fields
    this.firstName = undefined;
    this.lastName = undefined;
    this.email = undefined;
    this.phoneNumber = undefined;
  }

  // Validate input field values
  get canCreate() {
    return this.firstName && this.lastName && this.email && this.phoneNumber;
  }
}