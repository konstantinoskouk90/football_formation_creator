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