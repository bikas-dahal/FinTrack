'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2Icon, PlusCircleIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import React from 'react'
import { columns } from './columns'   
import { DataTable } from '@/components/data-table'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetTransactions } from '@/features/transactions/api/use-get-transactions'
import { useBulkDeleteTransactions } from '@/features/transactions/api/use-bulk-delete-transactions'
import { useNewTransaction } from '@/features/transactions/hooks/use-new-transaction'

const TransactoinsPage = () => {

    const session = useSession()
    if (!session) {
        return redirect('/login')
    }

    const transactionQuery = useGetTransactions()
    const deleteTransaction = useBulkDeleteTransactions()

    const transactions = transactionQuery.data || []


    const isDisabled = transactionQuery.isLoading || transactionQuery.isFetching || deleteTransaction.isPending

    const { onOpen} = useNewTransaction()

    if (transactionQuery.isLoading)  {
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
                    Transactions History
                </CardTitle>
                <Button onClick={() => onOpen()} variant='secondary' size={'sm'} className='flex gap-x-2'>
                    <PlusCircleIcon size={24} />
                    Add New
                </Button>
            </CardHeader>
            <CardContent>
                <DataTable 
                    filterKey='payee' 
                    columns={columns} 
                    data={transactions} 
                    onDelete={(row) => {
                        const ids = row.map(r => r.original.id)
                        deleteTransaction.mutate({ids})
                    }}
                    disabled={isDisabled}
                />
            </CardContent>
        </Card>
    </div>
  )
}

export default TransactoinsPage