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
  }
}

export const populateArray = () => {
  let arr = [];
  const eleven = ["GK", 'RB', 'CBR', "CBL", "LB", "MR", "CMR", "CML", "ML", "STR", "STL"];
  eleven.forEach(function(k, i) {
    arr.push({id: k, firstName: '', lastName: '', email: ''});
  });
  return arr;
}