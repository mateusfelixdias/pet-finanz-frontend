import { ISale } from '@/types/Sale';

export const handlePetBreedDistribution = (sales: ISale[]) => {
  let totalBreedSales = 0;
  const petBreedCounts: { [breed: string]: number } = {};

  sales.forEach(({ petBreeds }) => {
    petBreeds.forEach((breed) => {
      totalBreedSales += 1;
      petBreedCounts[breed] = (petBreedCounts[breed] || 0) + 1;
    });
  });

  const petBreedDistribution = Object.entries(petBreedCounts).map(
    ([breed, count]) => ({
      breed,
      percentage: (count / totalBreedSales) * 100,
    })
  );

  petBreedDistribution.sort((a, b) => b.percentage - a.percentage);

  const categories = petBreedDistribution.map((item) => item.breed);
  const data = petBreedDistribution.map((item) => {
    return parseFloat(item.percentage.toFixed(2));
  });

  return { data, categories };
};
