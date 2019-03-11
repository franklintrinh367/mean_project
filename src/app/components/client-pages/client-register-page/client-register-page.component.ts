import { Component, OnInit } from '@angular/core'
import { ClientService } from '../../../services/client/client.service'
import { FormGroup } from '@angular/forms'

@Component({
  selector: 'app-client-register-page',
  templateUrl: './client-register-page.component.html',
  styleUrls: ['./client-register-page.component.scss'],
})
export class ClientRegisterPageComponent implements OnInit {
  constructor(private service: ClientService) {}

  ngOnInit() {}
  /*
  onClose() {
    this.service.form.reset()
    this.service.initializeFormGroup()
    this.dialogRef.close()
  }
  */
}
