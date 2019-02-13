import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {
  private feedbackForm: FormGroup
  private modes = ['Email', 'Phone']
  constructor(private builder: FormBuilder) {}

  ngOnInit() {
    this.feedbackForm = this.builder.group({
      name: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '[\\w]+@[a-zA-Z\\d]+\\.[a-zA-Z\\d]+\\.?[a-zA-Z\\d]+'
          ),
        ],
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('^\\d{3}[-]?\\d{3}[-]?\\d{4}$'),
        ],
      ],
      preferedMode: ['', [Validators.required]],
      comment: ['', [Validators.required]],
    })
  }

  get name() {
    return this.feedbackForm.get('name')
  }
  get email() {
    return this.feedbackForm.get('email')
  }
  get phone() {
    return this.feedbackForm.get('phone')
  }
  get preferedMode() {
    return this.feedbackForm.get('preferedMode')
  }
  get comment() {
    return this.feedbackForm.get('comment')
  }

  submit() {
    console.log(this.preferedMode.value)
  }
}
