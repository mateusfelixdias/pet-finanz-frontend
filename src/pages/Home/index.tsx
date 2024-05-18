import Loading from '@/components/ui/Loading';
import PetCard from '@/pages/Home/steps/PetCard';
import usePetsContext from '@/context/PetsContext';

export default function Home() {
  const { isSearching, isLoading, pets, searchResult } = usePetsContext();

  const resultPets = isSearching ? searchResult : pets;

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex items-center m-6 w-auto">
          <div className="grid grid-cols-4 m-auto gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {resultPets.map(({ id, breed, description, imageUrl, price }) => (
              <PetCard
                id={id}
                key={id}
                breed={breed}
                price={price}
                imageUrl={imageUrl}
                description={description}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
