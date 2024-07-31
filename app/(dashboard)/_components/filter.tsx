import { AccountFilter } from "./account-filter"
import { DateFilter } from "./date-filter"

export const Filter = () => {
    return (
        <div className="flex lg:flex-row flex-col items-center gap-4 w-full">
            <AccountFilter />
            <DateFilter />
        </div>
    )
}

