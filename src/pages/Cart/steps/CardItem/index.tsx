import { Pet } from '@/types/Pet';
import { Trash } from 'phosphor-react';
import currencyFormat from '@/utils/currencyFormat';
import usePetsContext from '@/context/PetsContext';

interface Props {
  item: Pet;
}

export default function CartItem({ item }: Props) {
  const { cartData, setCartData } = usePetsContext();

  const handleRemoveItemCart = () => {
    const removedItem = cartData.items.filter(({ id }) => id !== item.id);
    setCartData((prevState) => ({
      ...prevState,
      items: removedItem,
      itemsTotal: prevState.itemsTotal - 1,
      priceTotal: prevState.priceTotal - item.price,
    }));
  };

  return (
    <div className="flex w-full my-6 sm:flex-col md:flex-col">
      <img
        src={item.imageUrl}
        alt={item.imageUrl}
        className="rounded-l-md w-[16rem] sm:w-full md:w-full sm:rounded-md md:rounded-md"
      />

      <div className="flex flex-col justify-between gap-6 bg-secondary rounded-r-md w-full h-auto px-6 py-2 sm:rounded-md md:rounded-md">
        <div className="w-full flex justify-between items-center">
          <span className="text-xl">{item.breed}</span>

          <button type="button" onClick={handleRemoveItemCart}>
            <Trash className="text-red-500" size={24} />
          </button>
        </div>

        <span>{item.description}</span>

        <div className="flex justify-between items-center">
          <span className="text-center">1 Pet</span>

          <span className="font-semibold">{currencyFormat(item.price)}</span>
        </div>
      </div>
    </div>
  );
}
