'use client'

import { useGetPortfolios } from "@/features/portfolio/api/use-get-portfolios"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import qs from 'query-string'
import { useGetSummary } from "@/features/summary/api/use-get-summary"

export const PortfolioFilter = () => {

    const params = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    
    const {data: portfolios, isLoading: portfolioLoading} = useGetPortfolios()

    const {isLoading: summaryLoading} = useGetSummary()
    
    const portfolioId = params.get('portfolioId') || 'all'
    const from = params.get('from') || ''
    const to = params.get('to') || ''


    const onChange = (newValue: string) => {
        const query = {
            portfolioId: newValue,
            from,
            to
        }

        if (newValue === 'all') {
            query.portfolioId = ''
        }

        const url = qs.stringifyUrl({
            url: pathname,
            query,
        }, {
            skipEmptyString: true,
            skipNull: true,
        })

        router.push(url)
    }



    return (
        <Select
            value={portfolioId}
            onValueChange={onChange}
            disabled={portfolioLoading || summaryLoading}
        >
            <SelectTrigger className="lg:w-auto w-full h-9 px-3 rounded-md font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus:ring-transparent focus:ring-offset-0 outline-none focus:bg-white/30 transition">
                <SelectValue placeholder="Select a portfolio" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Portfolios</SelectItem>
                {portfolios?.map((portfolio) => (
                    <SelectItem key={portfolio.id} value={portfolio.id}>{portfolio.name}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}