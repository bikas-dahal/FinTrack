'use client'

import { useNewPortfolio } from "@/features/portfolio/hooks/use-new-portfolio"

export const Dashboard = () => {

    const { onOpen } = useNewPortfolio()


    return (
        <div>
            <button onClick={onOpen}>New Portfolio</button>
        </div>
    )
}