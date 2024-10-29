import { useState } from "react";
import Chart from "react-apexcharts";

const CustomBarChart = () => {
  const [week, setWeek] = useState<"This Week" | "Last Week">("This Week");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleWeekChange = (selectedWeek: "This Week" | "Last Week") => {
    setWeek(selectedWeek);
    setIsDropdownOpen(false); // Close the dropdown after selecting
  };

  // Define the data sets for this week and previous week
  const dataSets = {
    "This Week": [
      {
        name: "Revenue",
        data: [5400, 4900, 7000, 3908, 3100, 6200, 8100],
      },
      {
        name: "Profit",
        data: [2000, 3000, 3500, 2780, 1800, 2500, 3000],
      },
    ],
    "Last Week": [
      {
        name: "Revenue",
        data: [3200, 4100, 6200, 5000, 7100, 5700, 7700],
      },
      {
        name: "Profit",
        data: [1500, 2500, 3200, 2700, 2800, 3000, 3500],
      },
    ],
  };

  const chartOptions = {
    chart: {
      type: "bar",
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "35%",
      },
    },
    xaxis: {
      categories: ["M", "T", "W", "T", "F", "S", "S"],
    },
    colors: ["#024CAA", "#77CDFF"],
    tooltip: {
      shared: true,
      intersect: false,
    },
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <div className="w-full h-full">
      <Chart
        options={chartOptions as ApexCharts.ApexOptions}
        series={dataSets[week]} // Use the data for the selected week
        type="bar"
        height="100%"
        width="100%"
      />

      {/* Dropdown for week selection */}
      <div className="absolute top-5 right-7">
        <button
          onClick={toggleDropdown}
          className="bg-blue-50 text-xs py-2 px-3 rounded hover:bg-white hover:shadow-lg focus:bg-white focus:shadow-lg focus:ring-1 focus:ring-orange-400 transition duration-200"
        >
          {week} ▾
        </button>

        {isDropdownOpen && (
          <div className="absolute bg-blue-50 mt-2 p-2 rounded shadow-lg">
            {["This Week", "Last Week"].map((weekOption) => (
              <button
                key={weekOption}
                className={`block text-xs py-2 px-3 w-full text-left rounded hover:bg-white hover:shadow-lg focus:bg-white focus:shadow-lg focus:ring-1 focus:ring-orange-400 transition duration-200 ${
                  week === weekOption ? "bg-white shadow-lg" : ""
                }`}
                onClick={() =>
                  handleWeekChange(weekOption as "This Week" | "Last Week")
                }
              >
                {weekOption}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomBarChart;
