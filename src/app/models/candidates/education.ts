export interface Education {
  university: string
  loc: string
  study: string
  year: string
  content: string[]
}

export class Education implements Education {
  university: string
  loc: string
  study: string
  year: string
  content: string[] = []
}
