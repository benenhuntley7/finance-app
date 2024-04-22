import { NewBarChart } from "../components/charts/LineChartTest";
import { NewPieChart } from "../components/charts/pieCharts";
function Dashboard() {
  return (
    <>
      <div className="w-full">
        <div className="flex align-center justify-center">
          <NewPieChart />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
