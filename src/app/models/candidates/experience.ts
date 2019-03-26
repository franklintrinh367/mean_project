export interface Experience {
  compName: string
  loc: string
  pos: string
  year: string
  content: string[]
}

export class Experience implements Experience {
  compName: string
  loc: string
  pos: string
  year: string
  content: string[] = []
}
