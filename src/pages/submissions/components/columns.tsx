import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import moment from 'moment'

export const columns: ColumnDef<any>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'Assignment id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Assignment id' />
    ),
    cell: ({ row }) => (
      <div className='w-[80px]'>{row.original.assignment_id}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'Submission id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Submission id' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.original.id}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'Submission type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Submission type' />
    ),
    cell: ({ row }) => (
      <div className='w-[80px]'>{row.original.submission_type}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'Comments',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Comments' />
    ),
    cell: ({ row }) => (
      <div className='w-[80px]'>{row.original.submission_comments.length}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'grade',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='grade' />
    ),
    cell: ({ row }) => (
      <div className='w-[80px]'>
        {row.getValue('grade') ? row.getValue('grade') : 'N/A'}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'Submitted at',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Submitted at' />
    ),
    cell: ({ row }) => (
      <div className='w-[80px]'>
        {row.original.submitted_at ? moment(row.original.submitted_at).format('LTS'):"N/A"}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'Actions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Actions' />
    ),
    cell: ({ row }) => <DataTableRowActions row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
]
