import { Pet } from '@/types/Pet';
import { useNavigate } from 'react-router-dom';
import currencyFormat from '@/utils/currencyFormat';

export default function PetCard({ id, imageUrl, breed, price }: Pet) {
  const navigate = useNavigate();

  const handleNavigatePetDatails = () => {
    navigate(`/pet/${id}`);
  };

  return (
    <div
      id={id}
      role="button"
      onClick={handleNavigatePetDatails}
      className="flex flex-col bg-secondary w-full rounded-md gap-2 cursor-pointer"
    >
      <img alt={breed} src={imageUrl} className="w-full h-full rounded-t-md" />

      <span className="pl-2 pt-2">{breed}</span>

      <hr className="bg-gray-100" />

      <span className="pl-2 pb-2 font-semibold">{currencyFormat(price)}</span>
    </div>
  );
}
