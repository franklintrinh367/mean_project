import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms'
import { slideRight, slideDownChunk } from '../../shared/animations'

@Component({
  selector: 'app-candidate-edit-resume',
  templateUrl: './candidate-edit-resume.component.html',
  styleUrls: ['./candidate-edit-resume.component.scss'],
  animations: [slideRight(), slideDownChunk()],
})
export class CandidateEditResumeComponent implements OnInit {
  //In summary, this is just testing phase, using array to store
  //data and send it to the backend might enlarge the payload.
  //This will be developed more in the future
  state = 'out'
  resumeForm: FormGroup
  profileArr = []
  info = ''
  //These values are produced after user submit the form
  //These values should be used in the backend to retreive information
  experienceArr = []
  expContentArr = []
  eduArr = []
  eduContentArr = []

  constructor(private builder: FormBuilder) {}

  ngOnInit() {
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

  //push this section info to the arr
  addProfileControl(str) {
    if (str) {
      this.profileArr.push(str)
      this.profile.setValue('')
    }
  }

  //push this section info to the arr
  addExperience(comp: string, loc: string, pos: string, year: string) {
    if (comp && loc && pos && year && this.expContentArr.length > 0) {
      let store = {
        comp: comp,
        loc: loc,
        pos: pos,
        year: year,
        content: this.expContentArr,
      }
      this.experienceArr.push(store)
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

  addEdu(uni: string, loc: string, field: string, year: string) {
    if (uni && loc && field && year && this.eduContentArr.length > 0) {
      let store = {
        uni: uni,
        loc: loc,
        year: year,
        field: field,
        content: this.eduContentArr,
      }
      this.eduArr.push(store)
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
}
