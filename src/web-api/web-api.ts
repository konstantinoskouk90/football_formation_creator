let latency = 0;

export let squad = [];

export let lineup = [
  {
    id: 'GK',
    firstName: '',
    lastName: '',
    email: ''
  },
  {
    id: 'RB',
    firstName: '',
    lastName: '',
    email: ''
  },
  {
    id: 'CBR',
    firstName: '',
    lastName: '',
    email: ''
  },
  {
    id: 'CBL',
    firstName: '',
    lastName: '',
    email: ''
  },
  {
    id: 'LB',
    firstName: '',
    lastName: '',
    email: ''
  },
  {
    id: 'MR',
    firstName: '',
    lastName: '',
    email: ''
  },
  {
    id: 'CMR',
    firstName: '',
    lastName: '',
    email: ''
  },
  {
    id: 'CML',
    firstName: '',
    lastName: '',
    email: ''
  },
  {
    id: 'ML',
    firstName: '',
    lastName: '',
    email: ''
  },
  {
    id: 'STR',
    firstName: '',
    lastName: '',
    email: ''
  },
  {
    id: 'STL',
    firstName: '',
    lastName: '',
    email: ''
  }
];

export class WebAPI {

  isRequesting = false;

  addToLineup(id, changedVal) {
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let instance = { id: id, firstName: changedVal.split(" ")[0], lastName: changedVal.split(" ")[1], email: changedVal.split(" ")[2] };
        let found = lineup.filter(x => x.id == id)[0];
        if (found) {
          let index = lineup.indexOf(found);
          lineup[index] = instance;
        }
        resolve(instance);
        this.isRequesting = false;
      }, latency);
    });
  }

  removeFromLineup(id) {
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let instance = { id: id, firstName: '', lastName: '', email: '' };
        let found = lineup.filter(x => x.id == id)[0];
        if (found) {
          let index = lineup.indexOf(found);
          if (index !== -1) {
            lineup[index] = instance;
          }
        }
        resolve(instance);
        this.isRequesting = false;
      }, latency);
    });
  }

  getLineup() {
    return lineup;
  }

  getSquad() {
    return squad;
  }

  removeFromSquad(player) {
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let instance = JSON.parse(JSON.stringify(player));
        let found = squad.filter(x => x.id == player.id)[0];
        if (found) {
          let index = squad.indexOf(found);
          if (index !== -1) {
            squad.splice(index, 1);
          }
        }
        resolve(instance);
        this.isRequesting = false;
      }, latency);
    });
  }

  addPlayer(player) {
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let instance = JSON.parse(JSON.stringify(player));
        squad.push(instance);
        resolve(instance);
        this.isRequesting = false;
      }, latency);
    });
  }

  /*savePlayer(player) {
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let instance = JSON.parse(JSON.stringify(player));
        let found = lineup.filter(x => x.id == player.id)[0];

        if (found) {
          let index = lineup.indexOf(found);
          lineup[index] = instance;
        }
        resolve(instance);
        this.isRequesting = false;
      }, latency);
    });
  }*/
}