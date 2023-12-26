export function getRandomColor() {
  const letters = '0123456789ABCDEF';
  return '#' + [...Array(6)].map(() => letters[Math.floor(Math.random() * 16)]).join('');
}
