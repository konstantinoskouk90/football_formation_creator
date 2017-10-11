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
    private homeNumber: number,
    private mobileNumber: number,
    private dateOfBirth: Date,
    private position: string,
    private footedness: string,
    private emailValidate: boolean
  ) { }

  created() {
    this.emailValidate = true;
  }

  // Add player to squad arrays - global and local - and send message to update other components
  createPlayer = () => {

    // Check to see that email is unique
    if (!this.emailExists(this.email)) {

      this.emailValidate = true;

      // Use the email as a unique identifier
      this.id = this.email;

      // Create a new player and add to the global web api squad array
      this.api.addToSquad(new CreatePlayer(this.id,
        this.firstName,
        this.lastName,
        this.email,
        this.homeNumber,
        this.mobileNumber,
        this.dateOfBirth,
        this.position,
        this.footedness))
        .then(player => {

          // Notify other components of player being added to squad
          this.ea.publish(new squadUpdated(player));

          // Reset input fields after successful addition
          this.firstName = undefined;
          this.lastName = undefined;
          this.email = undefined;
          this.homeNumber = undefined;
          this.mobileNumber = undefined;
          this.dateOfBirth = undefined;
          this.position = undefined;
          this.footedness = undefined;
        });
    } else {
      this.emailValidate = false;
    }
  }

  // Validate input field values
  get canCreate() {
    return this.firstName && this.lastName && this.email;
  }

  // Check email address is unique by calling api function
  emailExists = (e) => {
    return this.api.emailValidation(e);
  }
}