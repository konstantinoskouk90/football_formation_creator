import { squad } from '../data';

export class Squad {

  players;

  created() {
    this.players = squad;
  }
}