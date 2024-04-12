/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import ThemeSwitch from '@/components/theme-switch'
import { TopNav } from '@/components/top-nav'
import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useEffect, useState } from 'react'
import moment from 'moment'
import { Icons } from '@/components/loading'
import { Button } from '@/components/custom/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  getAllAssignments,
  getAllCourses,
} from '@/Actions/Assignments/AssignmentsActions'
import { useNavigate } from 'react-router-dom'
export default function Dashboard() {
  const navigate = useNavigate()
  const [assignments, setAssignments] = useState([])
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState<any>({})

  useEffect(() => {
    getAllAssignment()
  }, [])

  function getAllAssignment() {
    setLoading({ tableSubmission: true })
    getAllCourses().then(({ data: res }) => {
      setCourses(res)
      setLoading({ tableSubmission: false })
    })
  }

  function handleChange(e: any) {
    getAllAssignments(e)
      .then(({ data: res }) => {
        console.log(res)
        setAssignments(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleDrawer(data: any) {
    navigate('/submissions', {
      state: { courseId: data.course_id, assignmentId: data.id },
    })
    /* setSubmissions([])
    setLoading({ drawerSubmission: true })
    setDrawerData(data)
    setdrawer(true)
    getAllSubmissions({
      courseId: data.course_id,
      assignmentId: data.id,
    })
      .then(({ data: res }) => {
        setSubmissions(res)
        setLoading({ drawerSubmission: false })
      })
      .catch((err) => {
        setLoading({ drawerSubmission: false })
        console.log(err)
      }) */
  }

  return (
    <Layout>
      <LayoutHeader>
        <TopNav links={topNav} />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </LayoutHeader>

      <LayoutBody className='space-y-4 py-0'>
        <Card className='w-full'>
          <div className='grid grid-cols-2'>
            <div>
              <CardHeader>
                <CardTitle>Assignments</CardTitle>
                <CardDescription>
                  All the Assignments are listed below.
                </CardDescription>
              </CardHeader>
            </div>
            <div>
              <CardHeader className='float-right'>
                <Select onValueChange={handleChange}>
                  <SelectTrigger className='w-[300px]'>
                    <SelectValue placeholder='Select a course' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {courses && courses.length > 0
                        ? courses?.map((course: any) => {
                            return (
                              <SelectItem key={course?.id} value={course?.id}>
                                {course?.name}
                              </SelectItem>
                            )
                          })
                        : null}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </CardHeader>
            </div>
          </div>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Assignment id</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Grading Type</TableHead>
                  <TableHead>Created at</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignments && assignments.length > 0 ? (
                  assignments?.map((submission: any) => (
                    <TableRow
                      key={submission?.id}
                      className='cursor-pointer'
                      onClick={() => handleDrawer(submission)}
                    >
                      <TableCell className='font-medium'>
                        {submission?.id}
                      </TableCell>
                      <TableCell>{submission?.name}</TableCell>
                      <TableCell>{submission?.workflow_state}</TableCell>
                      <TableCell>{submission?.grading_type}</TableCell>
                      <TableCell>
                        {moment(submission?.created_at).format('LTS')}
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => {
                            // setGradeModal(true)
                          }}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className='text-center'>
                      {loading?.tableSubmission ? (
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
        {/* <Dialog open={gradeModal} onOpenChange={setGradeModal}>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Add Grade</DialogTitle>
              <DialogDescription>
                Add Grade for this Submission. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='comment' className='text-right'>
                  Grade
                </Label>
                <Input
                  id='grade'
                  name='grade'
                  className='col-span-3'
                  value={grade}
                  onChange={handleGradeChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type='submit'
                onClick={handleGradeSave}
                loading={loading?.gradeLoading}
              >
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog> */}
      </LayoutBody>
    </Layout>
  )
}

const topNav = [
  {
    title: 'Overview',
    href: 'dashboard/overview',
    isActive: true,
  },
]
