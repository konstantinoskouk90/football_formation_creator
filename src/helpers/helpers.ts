export const removeS = (players, player) => {
  let found = players.filter(x => x.id == player.id)[0];
  if (found) {
    let index = players.indexOf(found);
    if (index !== -1) {
      players.splice(index, 1);
      return players;
    }
  }
}

export const addL = (starters, starter, changedVal, option) => {
  let instance = { id: starter, firstName: changedVal.split(" ")[0], lastName: changedVal.split(" ")[1], email: option },
    found = starters.filter(x => x.id == starter)[0];
  if (found) {
    let index = starters.indexOf(found);
    starters[index] = instance;
    return starters;
  }
}

export const removeL = (starters, starter, attribute) => {
  let instance = { id: '', firstName: '', lastName: '', email: '' },
    found = starters.filter(x => x[attribute] == starter)[0];
  if (found) {
    if (attribute === "id") {
      instance.id = starter;
    } else {
      instance.id = found.id;
    }
    let index = starters.indexOf(found);
    if (index !== -1) {
      starters.splice(index, 1, instance);
      return starters;
    }
  } else {
    return starters;
  }
}

export const populateArray = () => {
  let arr = [];
  const eleven = ["GK", 'RB', 'CBR', "CBL", "LB", "MR", "CMR", "CML", "ML", "STR", "STL"];
  eleven.forEach(function (k, i) {
    arr.push({ id: k, firstName: '', lastName: '', email: '' });
  });
  return arr;
}

export const getGoal = (starters) => {
  let arr = [];
  const goal = [starters[0]];
  goal.forEach(function (k, i) {
    arr.push(k);
  });
  return arr;
}

export const getDefence = (starters) => {
  let arr = [];
  const defence = [starters[4], starters[3], starters[2], starters[1]];
  defence.forEach(function (k, i) {
    arr.push(k);
  });
  return arr;
}

export const getMidfield = (starters) => {
  let arr = [];
  const midfield = [starters[8], starters[7], starters[6], starters[5]];
  midfield.forEach(function (k, i) {
    arr.push(k);
  });
  return arr;
}

export const getAttack = (starters) => {
  let arr = [];
  const attack = [starters[10], starters[9]];
  attack.forEach(function (k, i) {
    arr.push(k);
  });
  return arr;
}