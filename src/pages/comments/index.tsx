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
import {
  addSubmissionComment,
  addSubmissionGrade,
  deleteSubmissionComment,
  editSubmissionComment,
  getAllSubmissions,
  uploadFileSubmissionComment,
  uploadSubmissionsFile,
} from '@/Actions/Submissions/SubmissionsActions'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import moment from 'moment'
import Modals from './Component/Modal'
import Drawers from './Component/Drawer'
import axios from 'axios'
import { Icons } from '@/components/loading'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/custom/button'
export default function Dashboard() {
  const CourseID = localStorage.getItem('courseId')
  const AssignmentId = localStorage.getItem('assignmentId')
  const [submissions, setSubmissions] = useState([])
  const [values, setValues] = useState<any>({
    courseId: CourseID ? CourseID : '',
    assignmentId: AssignmentId ? AssignmentId : '',
  })
  const [drawerData, setDrawerData] = useState<any>({})
  const [commentData, setCommentData] = useState<any>({})
  const [comment, setComment] = useState<any>('')
  const [grade, setGrade] = useState<any>('')
  const [modal, setModal] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const [gradeModal, setGradeModal] = useState(false)
  const [commentEditModal, setCommentEditModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState<any>({})
  const [file, setFile] = useState<any>(null)

  useEffect(() => {
    getAllSubmission()
  }, [])

  function getAllSubmission(courseId?: any, assignmentId?: any) {
    setLoading({ tableSubmission: true })
    getAllSubmissions({
      courseId: courseId ? courseId : CourseID ? CourseID : '1',
      assignmentId: assignmentId
        ? assignmentId
        : AssignmentId
          ? AssignmentId
          : '1',
    })
      .then(({ data: res }) => {
        setSubmissions(res)
        setLoading({ tableSubmission: false })
      })
      .catch((err) => {
        setLoading({ tableSubmission: false })
        console.log(err)
      })
  }

  function handleModal() {
    setModal(true)
  }

  function handleChange(e: any) {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  async function handleSubmit() {
    setLoading({ idAssignLoader: true })
    localStorage.setItem('courseId', values?.courseId)
    localStorage.setItem('assignmentId', values?.assignmentId)
    getAllSubmissions({
      courseId: values?.courseId ? values?.courseId : CourseID ? CourseID : '1',
      assignmentId: values?.assignmentId
        ? values?.assignmentId
        : AssignmentId
          ? AssignmentId
          : '1',
    })
      .then(({ data: res }) => {
        setSubmissions(res)
        setLoading({ idAssignLoader: false })
        setModal(false)
      })
      .catch((err) => {
        setLoading({ idAssignLoader: false })
        console.log(err)
      })
  }

  function handleDrawer(data: any) {
    setDrawer(true)
    setDrawerData(data)
  }

  function handleEditComment(comment?: any, edit?: any) {
    if (edit) {
      setCommentData(comment)
      setIsEdit(true)
      setComment(comment?.comment ? comment?.comment : '')
    } else {
      setIsEdit(false)
      setComment('')
    }
    setCommentEditModal(true)
  }

  function handleCommentChange(e: any) {
    setComment(e.target.value)
  }

  function handleCommentSave() {
    setLoading({ commentSave: true })

    if (isEdit) {
      const data = {
        courseId: values?.courseId,
        assignmentId: values?.assignmentId,
        userId: drawerData?.user_id,
        commentId: commentData?.id,
      }
      editSubmissionComment(data, comment)
        .then(({ data: _res, status }) => {
          if (status === 200) {
            getAllSubmissions({
              courseId: values?.courseId ? values?.courseId : '1',
              assignmentId: values?.assignmentId ? values?.assignmentId : '1',
            })
              .then(({ data: res }) => {
                setSubmissions(res)
                setLoading({ commentSave: false })
                setCommentEditModal(false)
                setDrawer(false)
              })
              .catch((err) => {
                setLoading({ commentSave: false })
                console.log(err)
              })
          }
        })
        .catch((err) => {
          setLoading({ commentSave: false })
          console.log(err)
        })
    } else {
      const data = {
        courseId: values?.courseId,
        assignmentId: values?.assignmentId,
        userId: drawerData?.user_id,
      }
      addSubmissionComment(data, comment)
        .then(({ data: _res, status }) => {
          if (status === 200) {
            getAllSubmissions({
              courseId: values?.courseId ? values?.courseId : '1',
              assignmentId: values?.assignmentId ? values?.assignmentId : '1',
            })
              .then(({ data: res }) => {
                setSubmissions(res)
                setLoading({ commentSave: false })
                setCommentEditModal(false)
                setDrawer(false)
              })
              .catch((err) => {
                setLoading({ commentSave: false })
                console.log(err)
              })
          }
        })
        .catch((err) => {
          setLoading({ commentSave: false })
          console.log(err)
        })
    }
  }
  function handleCommentDelete(comments: any) {
    const data = {
      courseId: values?.courseId,
      assignmentId: values?.assignmentId,
      submissionId: drawerData?.id,
      commentId: comments?.id,
    }
    deleteSubmissionComment(data)
      .then(({ data: _res, status }) => {
        if (status === 200) {
          getAllSubmissions({
            courseId: values?.courseId ? values?.courseId : '1',
            assignmentId: values?.assignmentId ? values?.assignmentId : '1',
          })
            .then(({ data: res }) => {
              setSubmissions(res)
              setCommentEditModal(false)
              setDrawer(false)
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleFileChange(e: any) {
    setFile(e.target.files[0])
  }

  function onSubmit() {
    setLoading({ fileLoaders: true })
    const payload = {
      name: file?.name,
      size: file?.size,
      content_type: file?.type,
    }
    uploadSubmissionsFile(
      {
        courseId: values?.courseId,
        assignmentId: values?.assignmentId,
        userId: drawerData?.user_id,
      },
      payload
    )
      .then(({ data: res, status }) => {
        if (status === 200) {
          return res
        }
      })
      .then((res) => {
        const formData = new FormData()
        for (const key in res?.upload_params) {
          if (res?.upload_params.hasOwnProperty(key)) {
            formData.append(key, res?.upload_params[key])
          }
        }
        formData.append('file', file)
        axios
          .post(res?.upload_url, formData)
          .then((res) => {
            uploadFileSubmissionComment(
              {
                courseId: values?.courseId,
                assignmentId: values?.assignmentId,
                userId: drawerData?.user_id,
              },
              res?.data?.id
            ).then(({ data: _res, status }) => {
              if (status === 200) {
                getAllSubmissions({
                  courseId: values?.courseId ? values?.courseId : '1',
                  assignmentId: values?.assignmentId
                    ? values?.assignmentId
                    : '1',
                })
                  .then(({ data: res }) => {
                    setLoading({ fileLoaders: false })

                    setSubmissions(res)
                    setCommentEditModal(false)
                    setDrawer(false)
                  })
                  .catch((err) => {
                    setLoading({ fileLoaders: false })
                    console.log(err)
                  })
              }
            })
          })
          .catch((err) => {
            setLoading({ fileLoaders: false })
            console.log(err)
          })
      })
      .catch((err) => {
        setLoading({ fileLoaders: false })
        console.log(err)
      })
  }

  function handleGradeModal(data: any) {
    setGradeModal(true)
    setDrawerData(data)
    setGrade(data?.grade ? data?.grade : '')
  }

  function handleGradeChange(e: any) {
    setGrade(e.target.value)
  }

  function handleGradeSave() {
    setLoading({ gradeLoading: true })
    const data = {
      courseId: values?.courseId,
      assignmentId: values?.assignmentId,
      userId: drawerData?.user_id,
    }
    addSubmissionGrade(data, grade)
      .then(({ data: _res, status }) => {
        if (status === 200) {
          getAllSubmissions({
            courseId: values?.courseId ? values?.courseId : '1',
            assignmentId: values?.assignmentId ? values?.assignmentId : '1',
          })
            .then(({ data: res }) => {
              setSubmissions(res)
              setLoading({ gradeLoading: false })
              setGradeModal(false)
            })
            .catch((err) => {
              setLoading({ gradeLoading: false })
              console.log(err)
            })
        }
      })
      .catch((err) => {
        setLoading({ gradeLoading: false })
        console.log(err)
      })
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
                <CardTitle>Submissions</CardTitle>
                <CardDescription>
                  All the submissions are listed below.
                </CardDescription>
              </CardHeader>
            </div>
            <div>
              <CardHeader className='float-right'>
                <Button className='w-[100px]' onClick={handleModal}>
                  Assign Ids
                </Button>
              </CardHeader>
            </div>
          </div>
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
                  submissions?.map((submission: any) => (
                    <TableRow key={submission?.id} className='cursor-pointer'>
                      <TableCell
                        className='font-medium'
                        onClick={() => handleDrawer(submission)}
                      >
                        {submission?.assignment_id}
                      </TableCell>
                      <TableCell onClick={() => handleDrawer(submission)}>
                        {submission?.id}
                      </TableCell>
                      <TableCell onClick={() => handleDrawer(submission)}>
                        {submission?.submission_type}
                      </TableCell>
                      <TableCell onClick={() => handleDrawer(submission)}>
                        {submission?.submission_comments?.length}
                      </TableCell>
                      <TableCell onClick={() => handleDrawer(submission)}>
                        {submission?.grade ? submission?.grade : 'N/A'}
                      </TableCell>
                      <TableCell onClick={() => handleDrawer(submission)}>
                        {moment(submission?.submitted_at).format('LTS')}
                      </TableCell>
                      {submission?.grade ? (
                        <TableCell className='font-bold'>
                          Grade Entered
                        </TableCell>
                      ) : (
                        <TableCell>
                          <Button onClick={() => handleGradeModal(submission)}>
                            Enter Grade
                          </Button>
                        </TableCell>
                      )}
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
        <Modals
          modal={modal}
          setModal={setModal}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
        />
        <Drawers
          drawer={drawer}
          setDrawer={setDrawer}
          handleEditComment={handleEditComment}
          drawerData={drawerData}
          comment={comment}
          handleCommentDelete={handleCommentDelete}
          commentEditModal={commentEditModal}
          setCommentEditModal={setCommentEditModal}
          handleCommentChange={handleCommentChange}
          handleCommentSave={handleCommentSave}
          handleFileChange={handleFileChange}
          onSubmit={onSubmit}
          loading={loading}
        />
        <Dialog open={gradeModal} onOpenChange={setGradeModal}>
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
        </Dialog>
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
