import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { WebAPI } from '../../web-api/web-api';
import { CreatePlayer } from './create-player';
import { squadUpdated } from '../../messages/messages';

@inject(EventAggregator, WebAPI)
export class Create {

  constructor(private ea: EventAggregator,
    private api: WebAPI,
    private id: string,
    private firstName: string,
    private lastName: string,
    private email: string,
    private phoneNumber: number
  ) { }

  // Add player to squad arrays - global and local - and send message to update other components
  createPlayer = () => {

    // Use the email as a unique identifier
    this.id = this.email;

    // Create a new player and add to the global web api squad array
    this.api.addToSquad(new CreatePlayer(this.id,
      this.firstName,
      this.lastName,
      this.email,
      this.phoneNumber))
      .then(player => {

        // Notify other components of player being added to squad
        this.ea.publish(new squadUpdated(player));

        // Reset input fields after successful addition
        this.firstName = undefined;
        this.lastName = undefined;
        this.email = undefined;
        this.phoneNumber = undefined;
      });
  }

  // Validate input field values
  get canCreate() {
    return this.firstName && this.lastName && this.email && this.phoneNumber;
  }
}