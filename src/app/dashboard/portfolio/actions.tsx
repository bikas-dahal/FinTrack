'use client'

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useDeletePortfolio } from "@/features/portfolio/api/use-delete-portfolio"
import { useOpenPortfolio } from "@/features/portfolio/hooks/use-open-portfolio"
import { useConfirm } from "@/hooks/use-confirm"
import { Edit, MoreHorizontal, Trash2Icon } from "lucide-react"

export const Actions = ({ id }: { id: string }) => {

    const [ConfirmDialog, confirm] = useConfirm(
        'Are you sure?',
        'This action cannot be undone',
    )

    const {onOpen} = useOpenPortfolio()
    const deleteMutation = useDeletePortfolio(id)

    const handleDelete = async () => {
        const ok = await confirm()
        if (ok) {
            deleteMutation.mutate()
        }
    }

    return (
        <>
            <ConfirmDialog />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="ghost">
                        <MoreHorizontal className="h-5 w-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        disabled={deleteMutation.isPending}
                        onClick={() => onOpen(id)}
                    >
                        <Edit className="h-5 w-5" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        disabled={deleteMutation.isPending}
                        onClick={handleDelete}
                    >
                        <Trash2Icon className="h-5 w-5" /> Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}