/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { reportGenerate } from '@/Actions/Assignments/AssignmentsActions'
import { addSubmissionComment, addSubmissionGrade, deleteSubmissionComment, editSubmissionComment, getAllSubmissions, uploadFileSubmissionComment, uploadSubmissionsFile } from '@/Actions/Submissions/SubmissionsActions'
import { useLocation } from 'react-router-dom'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { TopNav } from '@/components/top-nav'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/custom/button'
import Modals from '../comments/Component/Modal'
import Drawers from '../comments/Component/Drawer'
import axios from 'axios'

function Submissions() {
  const location = useLocation()
  const {
    state: { courseId, assignmentId },
  } = location
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState<any>({})
  const [drawerData, setDrawerData] = useState<any>({})
    const [gradeModal, setGradeModal] = useState(false)
    const [grade, setGrade] = useState('')
    const [commentData, setCommentData] = useState<any>({})
    const [comment, setComment] = useState<any>('')
    const [modal, setModal] = useState(false)
    const [drawer, setDrawer] = useState(false)
    const [commentEditModal, setCommentEditModal] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [file, setFile] = useState<any>(null)
    const [values, setValues] = useState<any>({
      courseId:  '',
      assignmentId: '',
    })
    function handleChange(e: any) {
      setValues({ ...values, [e.target.name]: e.target.value })
    }
  
    async function handleSubmit() {
      setLoading({ idAssignLoader: true })
      localStorage.setItem('courseId', values?.courseId)
      localStorage.setItem('assignmentId', values?.assignmentId)
      getAllSubmissions({
        courseId: courseId ? courseId : '1',
        assignmentId: drawerData?.assignment_id
          ? drawerData?.assignment_id
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
  
    function handleDrawer(e: { target: any },data: any) {
      if (e.target.role !== 'menuitem' && e.target.role !== 'checkbox') {
        setDrawer(true)
        setDrawerData(data)
      }
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
      console.log(drawerData);
      
      if (isEdit) {
        const data = {
          courseId: courseId,
          assignmentId: drawerData?.assignment_id,
          userId: drawerData?.user_id,
          commentId: commentData?.id,
        }
        editSubmissionComment(data, comment)
          .then(({ data: _res, status }) => {
            if (status === 200) {
              getAllSubmissions({
                courseId: courseId ? courseId : '1',
                assignmentId: drawerData?.assignment_id ? drawerData?.assignment_id : '1',
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
          courseId: courseId,
          assignmentId: drawerData?.assignment_id,
          userId: drawerData?.user_id,
        }
        addSubmissionComment(data, comment)
          .then(({ data: _res, status }) => {
            if (status === 200) {
              getAllSubmissions({
                courseId: courseId ? courseId : '1',
                assignmentId: drawerData?.assignment_id ? drawerData?.assignment_id : '1',
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
        courseId: courseId,
        assignmentId: drawerData?.assignment_id,
        submissionId: drawerData?.id,
        commentId: comments?.id,
      }
      deleteSubmissionComment(data)
        .then(({ data: _res, status }) => {
          if (status === 200) {
            getAllSubmissions({
              courseId: courseId ? courseId : '1',
              assignmentId: drawerData?.assignment_id ? drawerData?.assignment_id : '1',
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
          courseId: courseId,
          assignmentId: drawerData?.assignment_id,
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
                  courseId: courseId,
                  assignmentId: drawerData?.assignment_id,
                  userId: drawerData?.user_id,
                },
                res?.data?.id
              ).then(({ data: _res, status }) => {
                if (status === 200) {
                  getAllSubmissions({
                    courseId: courseId ? courseId : '1',
                    assignmentId: drawerData?.assignment_id
                      ? drawerData?.assignment_id
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
  
    function handleGradeChange(e: any) {
      setGrade(e.target.value)
    }
  
    function handleGradeSave() {
      setLoading({ gradeLoading: true })
      const data = {
        courseId: courseId,
        assignmentId: drawerData?.assignment_id,
        userId: drawerData?.user_id,
      }
      addSubmissionGrade(data, grade)
        .then(({ data: _res, status }) => {
          if (status === 200) {
            getAllSubmissions({
              courseId: courseId ? courseId : '1',
              assignmentId: drawerData?.assignment_id ? drawerData?.assignment_id : '1',
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

  useEffect(() => {
    getSubmissions()
  }, [])

  function getSubmissions() {
    setLoading({ drawerSubmission: true })
    getAllSubmissions({
      courseId: courseId,
      assignmentId: assignmentId,
    })
      .then(({ data: res }) => {
        const data = res.map((item: any) => {
          return {
            ...item,
            handleGenerateReport: handleGenerateReport,
            handleGradeSubmission: handleGradeSubmission,
          }
        })
        setSubmissions(data)
        setLoading({ drawerSubmission: false })
      })
      .catch((err) => {
        setLoading({ drawerSubmission: false })
        console.log(err)
      })
  }

  function handleGradeSubmission(data: any) {
    setGradeModal(true)
    setDrawerData(data)
    setGrade(data?.grade ? data?.grade : '')
  }

  function handleGenerateReport(data: any) {
    const reqData = data?.map((item: any) => item.original)
    setLoading({ reportLoading: true })
    reportGenerate({
      payload: reqData,
    })
      .then(({ data }) => {
        setLoading({ reportLoading: false })

        data.generatedFiles.forEach(
          (fileContent: { data: Iterable<number> }) => {
            const arrayBuffer = new Uint8Array(fileContent.data)
            const blob = new Blob([arrayBuffer], { type: 'application/pdf' })
            const blobUrl = URL.createObjectURL(blob)
            window.open(blobUrl, '_blank')
          }
        )
      })
      .catch((err) => {
        setLoading({ reportLoading: false })
        console.log(err)
      })
  }
  return (
    <div>
      <Layout>
        <LayoutHeader>
          <TopNav links={topNav} />
          <div className='ml-auto flex items-center space-x-4'>
            <ThemeSwitch />
            <UserNav />
          </div>
        </LayoutHeader>

        <LayoutBody className='space-y-4 py-0'>
          <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
            <DataTable
              data={submissions}
              columns={columns}
              handleReports={handleGenerateReport}
              loading={loading}
              handleDrawer={handleDrawer}
            />
          </div>
        </LayoutBody>
      </Layout>
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
    </div>
  )
}
const topNav = [
  {
    title: 'Overview',
    href: 'dashboard/overview',
    isActive: true,
  },
]
export default Submissions
