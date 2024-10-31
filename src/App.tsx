import CustomAreaChart from "./app/components/AreaChart";
import CustomBarChart from "./app/components/BarChart";

export default function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-3 md:px-8 xl:px-10 py-44">
      <div className="grid grid-cols-[2fr,1fr] w-full gap-5 max-w-[1400px]">
        <GridItem title="Total Sales">
          <CustomAreaChart />
        </GridItem>

        <GridItem title="Profit">
          <CustomBarChart />
        </GridItem>
      </div>
    </main>
  );
}

function GridItem({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between p-6 border border-gray-300 bg-white shadow-lg rounded-md h-[400px] transition-transform transform hover:scale-105">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="flex-1 w-full h-full">{children}</div>
    </div>
  );
}
