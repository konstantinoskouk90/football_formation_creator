export class squadUpdated {
  constructor(public player) { }
}

export class lineupUpdated {
  constructor(public id, public changedValue) { }
}

export class lineupRemoved {
  constructor(public id, public changedValue) { }
}