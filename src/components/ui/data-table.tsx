"use client";

import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	className?: string;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	className,
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className={cn("rounded-md border", className)}>
			<table className="w-full">
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id} className="border-b">
							{headerGroup.headers.map((header) => (
								<th
									key={header.id}
									className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
								>
									{header.isPlaceholder
										? null
										: flexRender(header.column.columnDef.header, header.getContext())}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<tr
								key={row.id}
								className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
							>
								{row.getVisibleCells().map((cell) => (
									<td key={cell.id} className="p-4 align-middle">
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))
					) : (
						<tr>
							<td colSpan={columns.length} className="h-24 text-center">
								No results.
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}
