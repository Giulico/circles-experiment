export function randomIntFromInterval(min, max) {
  let cal = Math.random() * (max - min) + min;
  return parseFloat(cal);
}
