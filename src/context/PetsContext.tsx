import { Pet } from '@/types/Pet';
import { getPets } from '@/services/pets';
import { CartData } from '@/types/CartData';
import {
  useState,
  ReactNode,
  useEffect,
  useContext,
  useCallback,
  createContext,
} from 'react';

interface Props {
  pets: Pet[];
  cartData: CartData;
  isLoading: boolean;
  searchResult: Pet[];
  isSearching: boolean;
  setPest: React.Dispatch<React.SetStateAction<Pet[]>>;
  setCartData: React.Dispatch<React.SetStateAction<CartData>>;
  setSearchResult: React.Dispatch<React.SetStateAction<Pet[]>>;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
}

const PestContext = createContext({} as Props);

export const PetsProvider = ({ children }: { children: ReactNode }) => {
  const [pets, setPest] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<Pet[]>([]);
  const [cartData, setCartData] = useState<CartData>({} as CartData);

  const handleGetPets = useCallback(async () => {
    try {
      setIsLoading(true);

      const pets = await getPets();
      setPest(pets);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    handleGetPets();
  }, []);

  return (
    <PestContext.Provider
      value={{
        pets,
        cartData,
        isLoading,
        isSearching,
        searchResult,
        setPest,
        setCartData,
        setIsSearching,
        setSearchResult,
      }}
    >
      {children}
    </PestContext.Provider>
  );
};

const usePetsContext = () => useContext(PestContext);

export default usePetsContext;
