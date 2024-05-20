import ReactApexChart from 'react-apexcharts';

interface Props {
  title: string;
  colors: string[];
  seriesData: number[];
  categories: string[];
  titleHeader: string;
}

export default function PieChart({
  title,
  colors,
  seriesData,
  categories,
  titleHeader,
}: Props) {
  const series = seriesData;

  const options = {
    colors,
    dataLabels: { enabled: true },
    labels: categories,
    title: {
      text: title,
      align: 'left',
      style: { fontWeight: 600 },
    },
    chart: {
      type: 'pie',
      foreColor: 'gray',
      toolbar: { show: false },
    },
  } as ApexCharts.ApexOptions;

  return (
    <div className="flex flex-col gap-2 w-full mt-12">
      <h5 className="text-xl font-semibold">{titleHeader}</h5>

      <hr />

      <div className="w-full bg-secondary rounded-md">
        {series.length > 0 ? (
          <ReactApexChart
            dir="ltr"
            type="pie"
            width="99%"
            height="350"
            series={series}
            options={options}
            className="text-gray-600"
          />
        ) : (
          <p className="font-semibold text-center m-10">
            Oops, sem dados para exibir o gráfico ):
          </p>
        )}
      </div>
    </div>
  );
}
