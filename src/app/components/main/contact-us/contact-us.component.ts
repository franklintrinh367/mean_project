import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Feedback } from 'src/app/models/others/feedback'
import { UserService } from 'src/app/services/main/user.service'
import { slideUp } from '../../shared/animations'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
  animations: [slideUp()],
})
export class ContactUsComponent implements OnInit, OnDestroy {
  feedbackForm: FormGroup
  feedback: Feedback
  subscripts: Subscription
  modes = ['Email', 'Phone']
  constructor(private builder: FormBuilder, private userService: UserService) {}
  state = 'out'
  ngOnInit() {
    setTimeout(() => (this.state = 'in'), 30)
    this.feedbackForm = this.builder.group({
      name: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '[\\w\\.]+@[a-zA-Z\\d]+\\.[a-zA-Z\\d]+\\.?[a-zA-Z\\d]+'
          ),
        ],
      ],
      preferedMode: [''],

      phone: ['', [Validators.pattern('^\\d{3}[-]?\\d{3}[-]?\\d{4}$')]],

      comment: ['', Validators.required],
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
    this.feedback = {
      name: this.name.value,
      email: this.email.value,
      phone: this.phone.value,
      preferedMode: this.preferedMode.value,
      comment: this.comment.value,
    }
    this.subscripts = this.userService.submit(this.feedback).subscribe()
  }

  ngOnDestroy() {
    if (this.subscripts) this.subscripts.unsubscribe()
  }
}
