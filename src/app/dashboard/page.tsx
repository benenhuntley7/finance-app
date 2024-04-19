import { NewBarChart, NewLineChart } from "../components/LineChartTest";

function Dashboard() {
  return (
    <>
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-2 lg:text-left">
        <div>
          <NewBarChart />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
