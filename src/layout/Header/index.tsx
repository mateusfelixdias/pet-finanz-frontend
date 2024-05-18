import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import usePetsContext from '@/context/PetsContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, List, MagnifyingGlass } from 'phosphor-react';

interface Props {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export default function Header({ isSidebarOpen, onToggleSidebar }: Props) {
  const location = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');

  const { pets, setIsSearching, setSearchResult } = usePetsContext();

  const handleChange = (value: string) => {
    setSearch(value);

    if (value.length > 0) return;

    setSearchResult([]);
    setIsSearching(false);
  };

  const handleSearch = () => {
    const lowercaseSearch = search.trim().toLowerCase();

    const searchResults = pets.filter(
      (pet) =>
        pet.breed.toLowerCase().includes(lowercaseSearch) ||
        pet.price.toString().toLowerCase().includes(lowercaseSearch)
    );

    setIsSearching(true);
    setSearchResult(searchResults);

    const isScreenHome = location.pathname === '/home';
    if (!isScreenHome) navigate('/home');
  };

  return (
    <header className="flex justify-between items-center w-full h-20 bg-secondary px-3">
      <button type="button" onClick={onToggleSidebar}>
        {isSidebarOpen ? <List size={24} /> : <ArrowRight size={24} />}
      </button>

      <div className="flex justify-start items-center border border-gray-200 w-1/2 h-10 pl-6 rounded-full">
        <button
          type="button"
          className="border-none"
          onClick={handleSearch}
          disabled={search.trim().length === 0}
        >
          <MagnifyingGlass size={18} />
        </button>

        <Input
          id="search"
          type="search"
          value={search}
          placeholder="Pesquisar por raça, preço do pet..."
          className="w-full rounded-full outline-none border-none"
          onChange={({ target: { value } }) => handleChange(value)}
        />
      </div>
    </header>
  );
}
