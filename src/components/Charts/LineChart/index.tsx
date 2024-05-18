import ReactApexChart from 'react-apexcharts';

interface Props {
  title: string;
  colors: string[];
  serieName: string;
  seriesData: number[];
  titleHeader: string;
  categories: string[];
}

export default function LineChart({
  title,
  colors,
  seriesData,
  serieName,
  categories,
  titleHeader,
}: Props) {
  const series = [{ name: serieName, data: seriesData }];

  const options = {
    colors,
    markers: { size: 4 },
    stroke: { curve: 'straight' },
    dataLabels: { enabled: false },
    title: {
      text: title,
      align: 'left',
      style: { fontWeight: 600 },
    },
    chart: {
      height: 350,
      type: 'line',
      foreColor: 'gray',
      zoom: { enabled: false },
      toolbar: { show: false },
    },
    xaxis: { categories },
    yaxis: {
      labels: {
        formatter: function (value: string) {
          return parseInt(value);
        },
      },
    },
  } as unknown as ApexCharts.ApexOptions;

  return (
    <div className="flex flex-col gap-2 w-full mt-12">
      <h5 className="text-xl font-semibold">{titleHeader}</h5>

      <hr />

      <div className="w-full bg-secondary rounded-md">
        <ReactApexChart
          dir="ltr"
          width="99%"
          type="line"
          height="350"
          series={series}
          options={options}
          className="text-gray-600"
        />
      </div>
    </div>
  );
}
