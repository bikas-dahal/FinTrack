import { PortfolioFilter } from "./account-filter"
import { DateFilter } from "./date-filter"

export const Filters = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center m-2 gap-y-2 lg:gap-x-4">
            {/* <PortfolioFilter /> */}
            <DateFilter />
        </div>
    )
}