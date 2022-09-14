function randomNumberInRange(min: number, max: number): number {
  // 👇️ get number between min (inclusive) and max (inclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getGeneratedCardNumbers() {
  const number = randomNumberInRange(1, 13);
  if (number > 11) {
    return 10;
  } else {
    return number;
  }
}

export default getGeneratedCardNumbers;