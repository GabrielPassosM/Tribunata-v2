export function sortPlayers(players, category) {
  if (category === 'none') return players;
  
  return [...players].sort((a, b) => {
    return b[category] - a[category];
  });
}