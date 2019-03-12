export interface Job {
  _id: string
  userId: string
  jobId: number
  jobStatus: string
  jobPostDate: Date
  jobEndDate: Date
  jobPosition: number
  jobDescription: string
  jobActivate: boolean
}
