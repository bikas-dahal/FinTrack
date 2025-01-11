import { EditCategorySheet } from "@/features/categories/components/edit-category-sheet"
import { NewCategorySheet } from "@/features/categories/components/new-category-sheet"
import { EditPortfolioSheet } from "@/features/portfolio/components/edit-portfolio-sheet"
import { NewPortfolioSheet } from "@/features/portfolio/components/new-portfolio-sheet"
import { EditTransactionSheet } from "@/features/transactions/components/edit-transaction-sheet"
import { NewTransactionSheet } from "@/features/transactions/components/new-transaction-sheet"

export const SheetProvider = () => {
    return (
        <>
            <NewPortfolioSheet />
            <EditPortfolioSheet />
            <NewCategorySheet />
            <EditCategorySheet />
            <NewTransactionSheet />
            <EditTransactionSheet />
        </>
    )
}