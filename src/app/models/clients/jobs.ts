export interface Job {
  _id: string
  userId: number
  compId: number
  jobId: number
  jobStatus: string
  jobPostDate: Date
  jobEndDate: Date
  jobPositions: number
  jobDescription: string
  jobActivate: boolean
}
