import { DataCharts } from "./_components/data-chart"
import { DataGrid } from "./_components/data-grid"

const OverviewPage = () => {
  return (
    <main className="mx-4 pb-20">
      <div className="min-h-[50vh] max-w-[1200px] mx-auto  rounded-md -mt-20">
        <DataGrid />
        <DataCharts />
      </div>
    </main>
  )
}

export default OverviewPage
