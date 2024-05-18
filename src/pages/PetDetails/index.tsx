import { Pet } from '@/types/Pet';
import { useEffect, useState } from 'react';
import Loading from '@/components/ui/Loading';
import usePetsContext from '@/context/PetsContext';
import currencyFormat from '@/utils/currencyFormat';
import { useNavigate, useParams } from 'react-router-dom';

const PetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pet, setPet] = useState({} as Pet);

  const { isLoading, pets, setCartData } = usePetsContext();

  const handleNavigateToCart = () => navigate('/cart');

  const handleAddItemToCart = () => {
    const newItem = {
      id: pet.id,
      breed: pet.breed,
      price: pet.price,
      imageUrl: pet.imageUrl,
      description: pet.description,
    };

    setCartData((prevState) => ({
      ...prevState,
      itemsTotal: (prevState.itemsTotal || 0) + 1,
      priceTotal: (prevState.priceTotal || 0) + pet.price,
      items: prevState.items ? [...prevState.items, newItem] : [newItem],
    }));
  };

  const handleUpdateCartAndNavigate = () => {
    handleAddItemToCart();
    handleNavigateToCart();
  };

  useEffect(() => {
    const pet = pets.find((pet) => pet.id === id);
    setPet(pet!);
  }, [id, pets]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex m-6 w-auto gap-5 sm:flex-col md:flex-col lg:flex-col">
          <img
            alt={pet.imageUrl}
            src={pet.imageUrl}
            className="w-[30rem] h-auto rounded-md sm:w-full md:w-full lg:w-full"
          />

          <div className="flex flex-col h-auto justify-between sm:gap-12 md:gap-12 lg:gap-12">
            <div className="flex flex-col gap-1">
              <span className="text-2xl">{pet.breed}</span>

              <span className="font-semibold">{currencyFormat(pet.price)}</span>
            </div>

            <div className="flex flex-col gap-1">
              <span>DESCRIÇÃO</span>
              <span>{pet.description}</span>
            </div>

            <button
              type="button"
              onClick={handleUpdateCartAndNavigate}
              className="bg-green-600 text-white font-semibold rounded-md h-8 hover:bg-green-700 sm:text-sm"
            >
              Adicionar no carrinho
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PetDetails;
