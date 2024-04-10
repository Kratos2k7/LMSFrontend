import { http } from '@/Constant/apiUtils'

const getAllCourses = async () =>
  await http.get(`${import.meta.env.VITE_LMS_BACKEND_URL}assignments/courses`)
const getAllAssignments = async (courseId:any) =>
  await http.get(`${import.meta.env.VITE_LMS_BACKEND_URL}assignments/courses/${courseId}/assignments`)
const reportGenerate = async (data:any) =>
  await http.post(`${import.meta.env.VITE_LMS_BACKEND_URL}assignments/report-generate`,data)

export { getAllCourses,getAllAssignments,reportGenerate }
