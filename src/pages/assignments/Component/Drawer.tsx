/* eslint-disable react-hooks/exhaustive-deps */
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent } from '@/components/ui/card'
import moment from 'moment'
import { Icons } from '@/components/loading'
import { Button } from '@/components/custom/button'

export function Drawers({
  setdrawer,
  drawer,
  loading,
  submissions,
  handleGenerateReport,
}: any) {
  return (
    <Sheet open={drawer} onOpenChange={setdrawer}>
      <SheetContent className='w-[900px] !max-w-[900px] sm:w-[6000px]'>
        <SheetHeader>
          <SheetTitle>Submissions Details</SheetTitle>
          <SheetDescription>
            View the details of the Submissions.
          </SheetDescription>
          <Card className='w-full'>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Assignment id</TableHead>
                    <TableHead>Submission id</TableHead>
                    <TableHead>Submission type</TableHead>
                    <TableHead>Comment Count</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Submitted at</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions && submissions.length > 0 ? (
                    submissions?.map((submission: any) =>
                      submission?.workflow_state === 'submitted' ? (
                        <TableRow key={submission?.id}>
                          <TableCell className='font-medium'>
                            {submission?.assignment_id}
                          </TableCell>
                          <TableCell>{submission?.id}</TableCell>
                          <TableCell>{submission?.submission_type}</TableCell>
                          <TableCell>
                            {submission?.submission_comments?.length}
                          </TableCell>
                          <TableCell>
                            {submission?.grade ? submission?.grade : 'N/A'}
                          </TableCell>
                          <TableCell>
                            {moment(submission?.submitted_at).format('LTS')}
                          </TableCell>
                          <TableCell>
                            <Button
                              size={'sm'}
                              loading={loading?.reportLoading}
                              onClick={() => {
                                handleGenerateReport(submission)
                              }}
                            >
                              Generate Report
                            </Button>
                          </TableCell>
                        </TableRow>
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className='text-center'>
                            {loading?.drawerSubmission ? (
                              <center>
                                <Icons.spinner className='h-5 w-5 animate-spin ' />
                              </center>
                            ) : (
                              'No data found'
                            )}
                          </TableCell>
                        </TableRow>
                      )
                    )
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className='text-center'>
                        {loading?.drawerSubmission ? (
                          <center>
                            <Icons.spinner className='h-5 w-5 animate-spin ' />
                          </center>
                        ) : (
                          'No data found'
                        )}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </SheetHeader>
        <div className='grid gap-4 py-4'></div>
      </SheetContent>
    </Sheet>
  )
}
