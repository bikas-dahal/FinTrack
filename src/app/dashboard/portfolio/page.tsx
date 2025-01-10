'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useNewPortfolio } from '@/features/portfolio/hooks/use-new-portfolio'
import { Loader2Icon, PlusCircleIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import React from 'react'
import { columns } from './columns'
import { DataTable } from '@/components/data-table'
import {  useGetPortfolios } from '@/features/portfolio/api/use-get-portfolios'
import { Skeleton } from '@/components/ui/skeleton'
import { useBulkDeletePortfolios } from '@/features/portfolio/api/use-bulk-delete'

const PortfolioPage = () => {

    const session = useSession()
    if (!session) {
        return redirect('/login')
    }

    const portfolioQuery = useGetPortfolios()
    const deletePortfolio = useBulkDeletePortfolios()

    const portfolios = portfolioQuery.data || []

    const isDisabled = portfolioQuery.isLoading || portfolioQuery.isFetching || deletePortfolio.isPending

    const { onOpen} = useNewPortfolio()

    if (portfolioQuery.isLoading)  {
        return (
            <div className='max-w-screen-xl mx-auto w-full pb-10'>
                <Card className='border-none drop-shadow-sm'>
                    <CardHeader>
                        <Skeleton className='h-8 w-48' />
                    </CardHeader>
                    <CardContent className='h-[500px] w-full flex items-center justify-center'>
                        <Loader2Icon className='animate-spin size-6 text-slate-400' />
                    </CardContent>
                </Card>
            </div>
        )
    }

  return (
    <div className=''>
        <Card className='border-none drop-shadow-sm'>
            <CardHeader className='gap-y-2 text-center md:flex-row md:items-center md:justify-between'>
                <CardTitle className='text-xl line-clamp-1'>
                    Portfolio
                </CardTitle>
                <Button onClick={() => onOpen()} variant='secondary' size={'sm'} className='flex gap-x-2'>
                    <PlusCircleIcon size={24} />
                    Add New
                </Button>
            </CardHeader>
            <CardContent>
                <DataTable 
                    filterKey='name' 
                    columns={columns} 
                    data={portfolios} 
                    onDelete={(row) => {
                        const ids = row.map(r => r.original.id)
                        deletePortfolio.mutate({ids})
                    }}
                    disabled={isDisabled}
                />
            </CardContent>
        </Card>
    </div>
  )
}

export default PortfolioPage