import * as React from 'react'
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { DataTablePagination } from '../components/data-table-pagination'
import { Icons } from '@/components/loading'
import { Button } from '@/components/custom/button'
import { Input } from '@/components/ui/input'

export function DataTable({ columns, data, handleReports,loading,handleDrawer }: any) {
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })
  return (
    <div className='space-y-4'>
      <Card className='w-full'>
        <div className='grid grid-cols-6 '>
          <div className='col-span-4'>
            <CardHeader>
              <CardTitle>Submissions Details</CardTitle>
              <CardDescription>
                View the details of the Submissions.
              </CardDescription>
            </CardHeader>
          </div>
          <div className=''>
            <CardHeader>
            <Input type="text" placeholder="Assessment Tag" className='w-full' />
            </CardHeader>
          </div>
          <div className='text-right'>
            <CardHeader>
              <CardTitle>
                <Button
                loading={loading?.reportLoading}
                  onClick={() =>
                    handleReports(
                      table.getFilteredSelectedRowModel().rows.length > 0
                        ? table.getFilteredSelectedRowModel().rows
                        : table.getRowModel().rows
                    )
                  }
                >
                  Bulk Generate Report
                </Button>
              </CardTitle>
            </CardHeader>
            
          </div>
        </div>
        <CardContent>
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                      onClick={(e) => handleDrawer(e,row.original)}
                      className='cursor-pointer'
                    >
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className='h-24 text-center'
                    >
                      <center>
                        <Icons.spinner className='h-5 w-5 animate-spin ' />
                      </center>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <br />
          <DataTablePagination table={table} />
        </CardContent>
      </Card>
    </div>
  )
}
