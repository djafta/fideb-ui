'use client'
import { DataTable, schema } from "@/components/data-table";
import { use } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Badge } from "@/components/ui/badge";
import { z } from "zod";
import { useDiscounts } from "@/hooks/use-discounts";

export default function Page({ params }: { params: Promise<{ situation: string }> }) {
    const { situation } = use(params);
    const { discounts } = useDiscounts(0, 100, situation);

    const customColumns: ColumnDef<z.infer<typeof schema>>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <div className="flex items-center justify-center">
                    <Checkbox
                        checked={
                            table.getIsAllPageRowsSelected() ||
                            (table.getIsSomePageRowsSelected() && "indeterminate")
                        }
                        onCheckedChange={ (value: CheckedState) => table.toggleAllPageRowsSelected(!!value) }
                        aria-label="Select all"
                    />
                </div>
            ),
            cell: ({ row }) => (
                <div className="flex items-center justify-center">
                    <Checkbox
                        checked={ row.getIsSelected() }
                        onCheckedChange={ (value: CheckedState) => row.toggleSelected(!!value) }
                        aria-label="Select row"
                    />
                </div>
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "branch",
            header: "Balcão",
            cell: ({ row }) => (
                <div className="w-32">
                    <Badge variant="outline" className="px-1.5 text-muted-foreground">
                        { row.original.branch }
                    </Badge>
                </div>
            ),
            enableHiding: false,
        },
        {
            accessorKey: "manager",
            header: "Gestor",
            cell: ({ row }) => (
                <div className="w-32">
                    <Badge variant="outline" className="px-1.5 text-muted-foreground">
                        { row.original.manager }
                    </Badge>
                </div>
            ),
        },
    ];

    return (
        <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <DataTable columns={ customColumns } data={ discounts }/>
            </div>
        </div>
    )
}
