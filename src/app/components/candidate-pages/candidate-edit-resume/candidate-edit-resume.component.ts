import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms'
import { slideRight, slideDownChunk, slideUp } from '../../shared/animations'
import { Resume } from 'src/app/models/candidates/resumse'
import { Experience } from 'src/app/models/candidates/experience'
import { Education } from 'src/app/models/candidates/education'
import { GeneralInformation } from 'src/app/models/candidates/general-info'
import { CandidateService } from '../candidate-services/candidate.service'

@Component({
  selector: 'app-candidate-edit-resume',
  templateUrl: './candidate-edit-resume.component.html',
  styleUrls: ['./candidate-edit-resume.component.scss'],
  animations: [slideRight(), slideDownChunk(), slideUp()],
})
export class CandidateEditResumeComponent implements OnInit {
  //In summary, this is just testing phase, using array to store
  //data and send it to the backend might enlarge the payload.
  //This will be developed more in the future
  state = 'out'
  stateUp = 'out'
  resumeForm: FormGroup
  eduContentArr = []
  expContentArr = []
  edu: Education[] = []
  exp: Experience[] = []
  profileArr: string[] = []
  generalInfo: GeneralInformation

  //this final value can be used for information, this is important
  resume: Resume

  constructor(
    private builder: FormBuilder,
    private candidateService: CandidateService
  ) {
    this.resume = new Resume()
  }

  ngOnInit() {
    setTimeout(() => (this.stateUp = 'in'), 30)
    this.initForm()
  }

  //form init. Its not a factory design or either a service.
  initForm() {
    this.resumeForm = this.builder.group({
      general: this.builder.group({
        title: ['Title'],
        address: ['Address'],
        phone: ['Phone Number'],
        email: ['Email'],
      }),
      profile: [''],

      experience: this.builder.group({
        compName: [''],
        loc: [''],
        position: [''],
        year: [''],
        content: [''],
      }),

      education: this.builder.group({
        uni: [''],
        loc: [''],
        field: [''],
        year: [''],
        content: [''],
      }),
    })
  }

  // //push this section info to the arr
  addProfileControl(str) {
    if (str) {
      this.profileArr.push(str)
      this.profile.setValue('')
    }
  }

  // //push this section info to the arr

  //FOR EXPERIENCE
  addExperience(comp: string, loc: string, pos: string, year: string) {
    if (comp && loc && pos && year && this.expContentArr.length > 0) {
      let experience: Experience = {
        compName: comp,
        loc: loc,
        pos: pos,
        year: year,
        content: this.expContentArr,
      }

      this.exp.push(experience)

      this.clearSearch([
        this.expCompName,
        this.expContent,
        this.expLoc,
        this.expPos,
        this.expYear,
      ])

      this.expContentArr = []
    }
  }

  addExpContent(value: string) {
    if (value) {
      this.expContentArr.push(value)
      this.expContent.setValue('')
    }
  }

  //FOR EDUCATION

  addEdu(uni: string, loc: string, field: string, year: string) {
    if (uni && loc && field && year && this.eduContentArr.length > 0) {
      let education: Education = {
        university: uni,
        loc: loc,
        study: field,
        year: year,
        content: this.eduContentArr,
      }

      this.edu.push(education)

      this.clearSearch([
        this.eduUni,
        this.eduLoc,
        this.eduField,
        this.eduYear,
        this.eduContent,
      ])

      this.eduContentArr = []
    }
  }

  addEduContent(value: string) {
    if (value) {
      this.eduContentArr.push(value)
      this.eduContent.setValue('')
    }
  }

  //Go back to previous changes
  redo(key) {
    switch (key) {
      case 'profile':
        {
          if (this.profileArr.length > 0) this.profileArr.pop()
        }
        break
      case 'exp':
        {
          if (this.exp.length > 0) this.exp.pop()
        }
        break
      case 'edu': {
        if (this.edu.length > 0) this.edu.pop()
      }
    }
  }

  //FOR GENERAL INFO
  addGeneralInfo() {
    if (
      this.title.value &&
      this.phone.value &&
      this.email.value &&
      this.address.value
    ) {
      this.generalInfo = {
        address: this.address.value,
        title: this.title.value,
        email: this.email.value,
        phone: this.phone.value,
      }
    }
  }

  //Press enter for more user-experience
  keyPressEnter(name: string, value: string) {
    switch (name) {
      case 'exp':
        this.addExpContent(value)
        break
      case 'edu':
        this.addEduContent(value)
        break
    }
  }

  //Clean search after click
  clearSearch(arr: AbstractControl[]) {
    arr.forEach(el => el.setValue(''))
  }

  //Experience section
  get experience() {
    return this.resumeForm.get('experience')
  }

  get expCompName() {
    return this.experience.get('compName')
  }

  get expLoc() {
    return this.experience.get('loc')
  }

  get expPos() {
    return this.experience.get('position')
  }

  get expYear() {
    return this.experience.get('year')
  }

  get expContent() {
    return this.experience.get('content')
  }

  //Edu section

  get education() {
    return this.resumeForm.get('education')
  }

  get eduUni() {
    return this.education.get('uni')
  }

  get eduLoc() {
    return this.education.get('loc')
  }

  get eduField() {
    return this.education.get('field')
  }

  get eduYear() {
    return this.education.get('year')
  }

  get eduContent() {
    return this.education.get('content')
  }

  //general section
  get general() {
    return this.resumeForm.get('general')
  }

  get title() {
    return this.general.get('title')
  }

  get address() {
    return this.general.get('address')
  }

  get phone() {
    return this.general.get('phone')
  }

  get email() {
    return this.general.get('email')
  }

  get profile() {
    return this.resumeForm.get('profile')
  }

  expandTile() {
    this.state = this.state === 'in' ? 'out' : 'in'
  }

  //Testing
  submit() {
    this.addGeneralInfo()
    if (
      this.generalInfo &&
      this.profileArr.length > 0 &&
      this.edu.length > 0 &&
      this.exp.length > 0
    ) {
      this.resume = {
        education: this.edu,
        experience: this.exp,
        generalInfo: this.generalInfo,
        profile: this.profileArr,
      }
      this.candidateService.genDocx(this.resume).subscribe(() => {
        window.alert('Resume has been sucessfully created!')
      })
    } else console.log('all fields must be filled')
  }
}
