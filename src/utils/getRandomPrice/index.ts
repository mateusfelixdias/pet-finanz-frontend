export const getRandomPrice = () => {
  const min = 100;
  const max = 1000;

  const randomPrice = Math.random() * (max - min) + min;

  return parseFloat(randomPrice.toFixed(2));
};
