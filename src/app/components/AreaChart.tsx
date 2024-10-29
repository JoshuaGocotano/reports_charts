import { useState, useMemo } from "react";
import Chart from "react-apexcharts";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import SalesSampleData, { TimeFrame } from "../constants/SalesSampleData";

const CustomAreaChart = () => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("Monthly");
  const [year, setYear] = useState<"2024" | "2023">("2024");

  const handleYearChange = (selectedYear: "2024" | "2023") => {
    setYear(selectedYear);
  };

  const salesDataForYear = SalesSampleData.filter((data) =>
    data.date.endsWith(year)
  );

  // Helper function to get ISO week number
  const getISOWeek = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getUTCDay();
    date.setUTCDate(date.getUTCDate() + 4 - day);
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    return Math.ceil(((+date - +yearStart) / 86400000 + 1) / 7);
  };

  // Aggregate data into weeks
  const weeklyData = useMemo(() => {
    const weeks: { [key: number]: number } = {};

    salesDataForYear.forEach((data) => {
      const week = getISOWeek(data.date);
      weeks[week] = (weeks[week] || 0) + data.amount;
    });

    return Object.values(weeks);
  }, [salesDataForYear]);

  // Aggregate data into months
  const monthlyData = useMemo(() => {
    const months = Array.from({ length: 12 }, () => 0);

    salesDataForYear.forEach((data) => {
      const monthIndex = new Date(data.date).getMonth();
      months[monthIndex] += data.amount;
    });

    return months;
  }, [salesDataForYear]);

  // Aggregate data into quarters
  const quarterlyData = useMemo(() => {
    const quarters = Array.from({ length: 4 }, () => 0);

    monthlyData.forEach((amount, monthIndex) => {
      const quarterIndex = Math.floor(monthIndex / 3);
      quarters[quarterIndex] += amount;
    });

    return quarters;
  }, [monthlyData]);

  const dataSeries = useMemo(() => {
    if (timeFrame === "Weekly") {
      return [{ name: "Total Sales", data: weeklyData }];
    } else if (timeFrame === "Monthly") {
      return [{ name: "Total Sales", data: monthlyData }];
    } else {
      return [{ name: "Total Sales", data: quarterlyData }];
    }
  }, [timeFrame, weeklyData, monthlyData, quarterlyData]);

  const chartOptions = {
    chart: { type: "area", toolbar: { show: false }, offsetY: 10 },
    stroke: { curve: "straight" },
    colors: ["#77CDFF"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.9,
        opacityTo: 0.5,
        stops: [0, 75, 100],
      },
    },
    xaxis: {
      categories:
        timeFrame === "Weekly"
          ? Array.from({ length: weeklyData.length }, (_, i) => `Week ${i + 1}`)
          : timeFrame === "Monthly"
          ? Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`)
          : ["Q1", "Q2", "Q3", "Q4"],
    },
    dataLabels: { enabled: false },
    tooltip: { theme: "light" },
    markers: { size: 4, hover: { size: 8 } },
  };

  return (
    <div className="w-full h-full">
      <Chart
        options={chartOptions as ApexCharts.ApexOptions}
        series={dataSeries}
        type="area"
        height="100%"
        width="100%"
      />

      <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
        <Dropdown>
          <DropdownTrigger>
            <Button className="text-sm font-semibold py-2 px-3 rounded hover:bg-white hover:shadow-lg focus:bg-white focus:shadow-lg focus:ring-1 focus:ring-orange-400 transition duration-200">
              {year} ▾
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={new Set([year])}
            onSelectionChange={(key) =>
              handleYearChange(key as unknown as "2024" | "2023")
            }
          >
            <DropdownItem onClick={() => handleYearChange("2024")}>
              2024
            </DropdownItem>
            <DropdownItem onClick={() => handleYearChange("2023")}>
              2023
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <div className="bg-blue-50 absolute top-4 right-4 p-2 rounded">
        {(["Weekly", "Monthly", "Quarterly"] as TimeFrame[]).map((frame) => (
          <button
            key={frame}
            className={`text-xs py-2 px-3 rounded hover:bg-white hover:shadow-lg focus:bg-white focus:shadow-lg focus:ring-1 focus:ring-orange-400 transition duration-200 ${
              timeFrame === frame ? "bg-white shadow-lg" : ""
            }`}
            onClick={() => setTimeFrame(frame)}
          >
            {frame}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CustomAreaChart;
