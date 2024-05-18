import { ISale } from '@/types/Sale';
import { formatDate } from '@/utils/formatDate';

export const handleProfitOfLastTenDays = (sales: ISale[]) => {
  const format = 'DD/MM';

  const lastTenDays = Array.from({ length: 10 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - ++index);

    return formatDate(date, format);
  });

  const profit = lastTenDays.map((formattedDate) => {
    return sales
      .filter((sale) => formatDate(sale.saleDate, format) === formattedDate)
      .reduce((totalProfit, sale) => totalProfit + sale.salePrice, 0);
  });

  const data = profit.reverse();
  const categories = lastTenDays.reverse();

  return { data, categories };
};
