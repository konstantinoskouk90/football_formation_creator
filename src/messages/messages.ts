export class squadUpdated {
  constructor(public player) { }
}

export class squadRemoved {
  constructor(public player) { }
}

export class lineupUpdated {
  constructor(public id, public changedValue, public optionSel) { }
}

export class lineupRemoved {
  constructor(public id) { }
}