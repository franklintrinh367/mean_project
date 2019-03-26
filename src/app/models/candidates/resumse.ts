import { Education } from './education'
import { Experience } from './experience'
import { GeneralInformation } from './general-info'

export interface Resume {
  generalInfo: GeneralInformation
  profile: string[]
  education: Education[]
  experience: Experience[]
}

export class Resume implements Resume {
  generalInfo: GeneralInformation
  profile: string[] = []
  education: Education[] = []
  experience: Experience[] = []
}
