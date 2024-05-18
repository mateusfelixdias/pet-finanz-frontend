import { api } from '../api';
import { ISale } from '@/types/Sale';

const createSale = async (data: ISale) => {
  try {
    await api.post('/sales', data);
  } catch (error) {
    throw error;
  }
};

const getSales = async () => {
  try {
    const { data }: { data: ISale[] } = await api.get('/sales');
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export { createSale, getSales };
