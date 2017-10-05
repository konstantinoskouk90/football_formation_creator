let latency = 0;

export let squad = [];

export let lineup = [
  {
    id: 'GK',
    firstName: '',
    lastName: ''
  },
  {
    id: 'RB',
    firstName: '',
    lastName: ''
  },
  {
    id: 'CBR',
    firstName: '',
    lastName: ''
  },
  {
    id: 'CBL',
    firstName: '',
    lastName: ''
  },
  {
    id: 'LB',
    firstName: '',
    lastName: ''
  },
  {
    id: 'MR',
    firstName: '',
    lastName: ''
  },
  {
    id: 'CMR',
    firstName: '',
    lastName: ''
  },
  {
    id: 'CML',
    firstName: '',
    lastName: ''
  },
  {
    id: 'ML',
    firstName: '',
    lastName: ''
  },
  {
    id: 'STR',
    firstName: '',
    lastName: ''
  },
  {
    id: 'STL',
    firstName: '',
    lastName: ''
  }
];

export class WebAPI {

  isRequesting = false;

  addToLineup(id, changedVal) {
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let instance = { id: id, firstName: changedVal.split(" ")[0], lastName: changedVal.split(" ")[1] };
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
        let instance = { id: id, firstName: '', lastName: '' };
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

  savePlayer(player) {
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
  }
}