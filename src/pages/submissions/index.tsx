/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { reportGenerate } from '@/Actions/Assignments/AssignmentsActions'
import { addSubmissionGrade, getAllSubmissions } from '@/Actions/Submissions/SubmissionsActions'
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
    console.log(data);
    
    setGrade(data?.grade ? data?.grade : '')
  }

  function handleGenerateReport(data: any) {
    const reqData = data?.map((item: any) => item.original)
    setLoading({ reportLoading: true })
    reportGenerate({
      payload: reqData,
    })
      .then(({ data }) => {
        console.log(data)
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

  function handleGradeSave() {
    setLoading({ gradeLoading: true })
    const data = {
      courseId: courseId,
      assignmentId: assignmentId,
      userId: drawerData?.user_id,
    }
    addSubmissionGrade(data, grade)
      .then(({ data: _res, status }) => {
        if (status === 200 && _res) {
            setLoading({ gradeLoading: false })
            setGradeModal(false)
            getSubmissions()
        }
      })
      .catch((err) => {
        setLoading({ gradeLoading: false })
        console.log(err)
      })
  }
  function handleGradeChange(e: any) {
    setGrade(e.target.value)
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
