export default function getRandomInt(min: number, max: number): number {
  const parsedMin = Math.ceil(min);
  const parsedMax = Math.floor(max);
  return Math.floor(Math.random() * (parsedMax - parsedMin + 1)) + parsedMin;
}
