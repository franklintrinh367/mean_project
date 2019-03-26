import { Component, OnInit } from '@angular/core'
import { slideRight, slideUp } from '../../shared/animations'

@Component({
  selector: 'app-candidate-upload-resume',
  templateUrl: './candidate-upload-resume.component.html',
  styleUrls: ['./candidate-upload-resume.component.scss'],
  animations: [slideRight(), slideUp()],
})
export class CandidateUploadResumeComponent implements OnInit {
  state = 'out'
  stateUp = 'out'
  template = [
    {
      src: 'assets/resume-templates/template-1.jpg',
      alt: 'template-1',
      url: '#',
    },
    {
      src: 'assets/resume-templates/template-2.png',
      alt: 'template-2',
      url: '/candidates/candidate_edit_resume',
    },
  ]
  constructor() {}

  ngOnInit() {
    setTimeout(() => (this.stateUp = 'in'), 30)
  }

  expandTile() {
    this.state = this.state === 'in' ? 'out' : 'in'
  }
}
