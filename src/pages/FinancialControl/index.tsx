import Card from './steps/Card';
import { ISale } from '@/types/Sale';
import { getSales } from '@/services/sales';
import { CardData } from '@/types/CardData';
import Loading from '@/components/ui/Loading';
import PieChart from '@/components/Charts/PieChart';
import { useEffect, useMemo, useState } from 'react';
import LineChart from '@/components/Charts/LineChart';
import { handleCardsData } from './steps/handleCardsData';
import { handleSalesOfLastTenDays } from './steps/handleSalesOfLastTenDays';
import { handleProfitOfLastTenDays } from './steps/handleProfitOfLastTenDays';
import { handlePetBreedDistribution } from './steps/handlePetBreedDistribution';

export default function FinancialControl() {
  const [isLoading, setIsLoading] = useState(false);

  const [sales, setSales] = useState<ISale[]>([]);
  const [cardData, setCardData] = useState<CardData[]>([]);

  const handleGetSales = async () => {
    try {
      setIsLoading(true);

      const sales = await getSales();

      setSales(sales);

      const cardData = handleCardsData(sales);
      setCardData(cardData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => await handleGetSales())();
  }, []);

  const dataSalesOdLastTenDays = useMemo(
    () => handleSalesOfLastTenDays(sales),
    [sales]
  );

  const dataProfitOfLastTenDays = useMemo(
    () => handleProfitOfLastTenDays(sales),
    [sales]
  );

  const dataPetBreedDistribution = useMemo(
    () => handlePetBreedDistribution(sales),
    [sales]
  );

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col items-center m-6 w-auto">
          <div className="grid grid-cols-4 gap-8 m-auto w-full sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
            {cardData.map(({ Icon, name, total }) => (
              <Card Icon={Icon} name={name} total={total} key={name} />
            ))}
          </div>

          <div className="w-full">
            <LineChart
              serieName="Compra(s)"
              colors={['#13c56b']}
              title="Total de compras"
              seriesData={dataSalesOdLastTenDays.data}
              categories={dataSalesOdLastTenDays.categories}
              titleHeader="Total de compras dos últimos 10 dias"
            />

            <LineChart
              colors={['#4CB140']}
              title="Total de gastos"
              serieName="Total em R$"
              seriesData={dataProfitOfLastTenDays.data}
              categories={dataProfitOfLastTenDays.categories}
              titleHeader="Total de gastos dos últimos 10 dias"
            />

            <PieChart
              title="Distribuição de compras"
              seriesData={dataPetBreedDistribution.data}
              titleHeader="Distribuição de compras por raça"
              categories={dataPetBreedDistribution.categories}
              colors={[
                '#06C',
                '#8BC1F7',
                '#519DE9',
                '#004B95',
                '#002F5D',
                '#BDE2B9',
                '#7CC674',
                '#4CB140',
                '#13c56b',
                '#38812F',
                '#23511E',
              ]}
            />
          </div>
        </div>
      )}
    </>
  );
}
