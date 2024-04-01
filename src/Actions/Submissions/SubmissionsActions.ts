import { http } from '@/Constant/apiUtils'

const getAllSubmissions = async (data: any) =>
  await http.post(
    `${
      import.meta.env.VITE_LMS_BACKEND_URL
    }submissions/${data.courseId}/${data.assignmentId}?token=${localStorage.getItem(
      'token'
    )}`
  )
const uploadSubmissionsFile = async (data: any, payload: any) => {
  Object.assign(payload, {
    token: localStorage.getItem('token'),
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
    }submissions/${data.courseId}/${data.assignmentId}/${data.userId}?token=${localStorage.getItem(
      'token'
    )}&comment=${payload}`
  )
const addSubmissionGrade = async (data: any, payload: any) =>
  await http.put(
    `${
      import.meta.env.VITE_LMS_BACKEND_URL
    }submissions/${data.courseId}/${data.assignmentId}/${data.userId}/grade?token=${localStorage.getItem(
      'token'
    )}&grade=${payload}`
  )
const editSubmissionComment = async (data: any, payload: any) =>
  await http.put(
    `${
      import.meta.env.VITE_LMS_BACKEND_URL
    }submissions/${data.courseId}/${data.assignmentId}/${data.userId}/${data.commentId}?token=${localStorage.getItem(
      'token'
    )}&comment=${payload}`
  )
const uploadFileSubmissionComment = async (data: any, payload: any) =>
  await http.put(
    `${
      import.meta.env.VITE_LMS_BACKEND_URL
    }submissions/${data.courseId}/${data.assignmentId}/${data.userId}/upload?token=${localStorage.getItem(
      'token'
    )}&comment=${payload}`
  )
const deleteSubmissionComment = async (data: any) =>
  await http.delete(
    `${
      import.meta.env.VITE_LMS_BACKEND_URL
    }submissions/${data.courseId}/${data.assignmentId}/${data.submissionId}/${data.commentId}?token=${localStorage.getItem(
      'token'
    )}`
  )

export {
  getAllSubmissions,
  addSubmissionComment,
  deleteSubmissionComment,
  editSubmissionComment,
  uploadSubmissionsFile,
  uploadFileSubmissionComment,
  addSubmissionGrade
}
