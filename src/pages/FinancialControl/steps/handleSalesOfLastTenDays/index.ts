import { ISale } from '@/types/Sale';
import { formatDate } from '@/utils/formatDate';

export const handleSalesOfLastTenDays = (sales: ISale[]) => {
  const format = 'DD/MM';

  const lastTenDays = Array.from({ length: 10 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - ++index);

    return formatDate(date, format);
  });

  const salesCount = sales.reduce((count, { saleDate }) => {
    const formattedSaleDate = formatDate(saleDate, format);
    if (!lastTenDays.includes(formattedSaleDate)) return count;

    count[lastTenDays.indexOf(formattedSaleDate)] += 1;
    return count;
  }, Array(10).fill(0));

  const data = salesCount.reverse();
  const categories = lastTenDays.reverse();

  return { data, categories };
};
