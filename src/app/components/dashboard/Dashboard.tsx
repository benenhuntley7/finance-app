import { NewBarChart, NewLineChart } from "../LineChartTest";

function Dashboard() {
  return (
    <>
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-2 lg:text-left">
        <div>
          <NewBarChart />
        </div>
        <div>
          <NewLineChart />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
