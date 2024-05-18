import { api } from '../api';
import { Pet } from '@/types/Pet';

const getPets = async () => {
  try {
    const { data }: { data: Pet[] } = await api.get('/pets');
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export { getPets };
