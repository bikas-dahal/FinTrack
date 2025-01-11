import { useOpenPortfolio } from "@/features/portfolio/hooks/use-open-portfolio"

type Props = {
    portfolio: string 
    portfolioId: string 
}

export const PortfolioColumn = ({  portfolio, portfolioId }: Props) => {

    const {onOpen: onOpenPortfolio } = useOpenPortfolio()

    const onClick = () => {
        onOpenPortfolio(portfolioId)
    }

    return (
        <div onClick={onClick} className="flex items-center cursor-pointer hover:underline">
         {portfolio}
        </div>
    )
}