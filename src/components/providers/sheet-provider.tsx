import { EditPortfolioSheet } from "@/features/portfolio/components/edit-portfolio-sheet"
import { NewPortfolioSheet } from "@/features/portfolio/components/new-portfolio-sheet"

export const SheetProvider = () => {
    return (
        <>
            <NewPortfolioSheet />
            <EditPortfolioSheet />
        </>
    )
}