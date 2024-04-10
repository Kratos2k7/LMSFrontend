import { http } from '@/Constant/apiUtils'

const getAllSubmissions = async (data: any) =>
  await http.post(
    `${
      import.meta.env.VITE_LMS_BACKEND_URL
    }submissions/${data.courseId}/${data.assignmentId}?token=${import.meta.env.VITE_TOKEN}`
  )
const uploadSubmissionsFile = async (data: any, payload: any) => {
  Object.assign(payload, {
    token: import.meta.env.VITE_TOKEN,
  })
  return await http.post(
    `${
      import.meta.env.VITE_LMS_BACKEND_URL
    }submissions/${data.courseId}/${data.assignmentId}/${data.userId}/files`,
    payload
  )
}
const addSubmissionComment = async (data: any, payload: any) =>
  await http.put(
    `${
      import.meta.env.VITE_LMS_BACKEND_URL
    }submissions/${data.courseId}/${data.assignmentId}/${data.userId}?token=${import.meta.env.VITE_TOKEN}&comment=${payload}`
  )
const addSubmissionGrade = async (data: any, payload: any) =>
  await http.put(
    `${
      import.meta.env.VITE_LMS_BACKEND_URL
    }submissions/${data.courseId}/${data.assignmentId}/${data.userId}/grade?token=${import.meta.env.VITE_TOKEN}&grade=${payload}`
  )
const editSubmissionComment = async (data: any, payload: any) =>
  await http.put(
    `${
      import.meta.env.VITE_LMS_BACKEND_URL
    }submissions/${data.courseId}/${data.assignmentId}/${data.userId}/${data.commentId}?token=${import.meta.env.VITE_TOKEN}&comment=${payload}`
  )
const uploadFileSubmissionComment = async (data: any, payload: any) =>
  await http.put(
    `${
      import.meta.env.VITE_LMS_BACKEND_URL
    }submissions/${data.courseId}/${data.assignmentId}/${data.userId}/upload?token=${import.meta.env.VITE_TOKEN}&comment=${payload}`
  )
const deleteSubmissionComment = async (data: any) =>
  await http.delete(
    `${
      import.meta.env.VITE_LMS_BACKEND_URL
    }submissions/${data.courseId}/${data.assignmentId}/${data.submissionId}/${data.commentId}?token=${import.meta.env.VITE_TOKEN}`
  )

export {
  getAllSubmissions,
  addSubmissionComment,
  deleteSubmissionComment,
  editSubmissionComment,
  uploadSubmissionsFile,
  uploadFileSubmissionComment,
  addSubmissionGrade,
}
