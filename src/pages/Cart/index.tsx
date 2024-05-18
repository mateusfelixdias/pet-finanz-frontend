import { ISale } from '@/types/Sale';
import CartItem from './steps/CardItem';
import toast from '@/components/ui/toast';
import { CartData } from '@/types/CartData';
import { createSale } from '@/services/sales';
import { useNavigate } from 'react-router-dom';
import usePetsContext from '@/context/PetsContext';
import currencyFormat from '@/utils/currencyFormat';

export default function Cart() {
  const navigate = useNavigate();
  const { cartData, setCartData } = usePetsContext();

  const { items = [], itemsTotal = 0, priceTotal = 0 } = cartData;

  const handlePurchaseSuccess = () => {
    toast('success', 'Compra finalizada com sucesso.');

    setCartData({} as CartData);

    navigate('/home');
  };

  const handleDataFinalizePurchase = (): ISale => {
    const currentDate = new Date();

    const salePrice = priceTotal;
    const saleDate = currentDate;
    const petBreeds = [...new Set(items.map(({ breed }) => breed))];

    const data = { petBreeds, saleDate, salePrice };
    return data;
  };

  const handleFinalizePurchase = async () => {
    try {
      const dataFinalizePurchase = handleDataFinalizePurchase();

      await createSale(dataFinalizePurchase);

      handlePurchaseSuccess();
    } catch (error) {
      toast('error', 'Não foi possível finalizar a compra. Tente novamente.');
      console.error(error);
    }
  };

  return (
    <div className="m-6 w-auto">
      <div className="flex justify-between items-center sm:flex-col sm:items-start sm:gap-6">
        <div className="flex flex-col gap-2">
          <strong className="font-semibold">Seu(s) pet(s)</strong>
          <span>
            Total ({itemsTotal} pet(s)) {currencyFormat(priceTotal)}
          </span>
        </div>

        <div className="flex flex-col bg-secondary w-64 p-4 rounded-md gap-2">
          <span className="font-semibold">Resumo da compra</span>

          <hr className="text-gray-200" />

          <span className="font-semibold">
            Total {currencyFormat(priceTotal)}
          </span>

          <button
            type="button"
            disabled={itemsTotal === 0}
            onClick={handleFinalizePurchase}
            className="bg-green-600 text-white font-semibold rounded-md h-10 mt-6 hover:bg-green-700 disabled:opacity-40 disabled:pointer-events-none"
          >
            Finalizar a compra
          </button>
        </div>
      </div>

      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
}
