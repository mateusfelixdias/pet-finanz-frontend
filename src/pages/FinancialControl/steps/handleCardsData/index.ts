import { ISale } from '@/types/Sale';
import { Money } from 'phosphor-react';
import { CardData } from '@/types/CardData';
import { formatDate } from '@/utils/formatDate';
import currencyFormat from '@/utils/currencyFormat';

const getYearAndMonth = (date: Date | string) => {
  const year = new Date(date).getFullYear();
  const month = new Date(date).getMonth() + 1;

  return { year, month };
};

export const handleCardsData = (sales: ISale[]): CardData[] => {
  const currentDate = new Date();
  const { year: currentYear, month: currentMonth } =
    getYearAndMonth(currentDate);

  const { totalSalesOfTheMonth, totalMonthBilling } = sales.reduce(
    (acc, { saleDate, salePrice }) => {
      const { year, month } = getYearAndMonth(saleDate);

      if (year === currentYear && month === currentMonth) {
        acc.totalSalesOfTheMonth++;
        acc.totalMonthBilling += salePrice;
      }

      return acc;
    },
    { totalSalesOfTheMonth: 0, totalMonthBilling: 0 }
  );

  const { salesToday, todayBilling } = sales.reduce(
    (acc, { saleDate, salePrice }) => {
      if (formatDate(new Date()) === formatDate(saleDate)) {
        acc.salesToday++;
        acc.todayBilling += salePrice;
      }

      return acc;
    },
    { salesToday: 0, todayBilling: 0 }
  );

  const cardData = [
    {
      name: 'Compras Totais de Hoje',
      total: salesToday,
      Icon: Money,
    },
    {
      name: 'Gastos Totais de Hoje',
      total: currencyFormat(todayBilling),
      Icon: Money,
    },
    {
      name: 'Total de Compras do Mês',
      total: totalSalesOfTheMonth,
      Icon: Money,
    },
    {
      name: 'Gastos Totais do Mês',
      total: currencyFormat(totalMonthBilling),
      Icon: Money,
    },
  ];

  return cardData;
};
