import { Component, OnInit } from '@angular/core'
import { slideRight, slideUp } from '../../shared/animations'
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage'
import { Observable } from 'rxjs/Observable'
import { AngularFirestore } from '@angular/fire/firestore'
import { tap, finalize } from 'rxjs/operators'
import { DomSanitizer } from '@angular/platform-browser'
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

  // Main task
  task: AngularFireUploadTask

  // Progress monitoring
  percentage: Observable<number>

  snapshot: Observable<any>

  // Download URL
  downloadURL: any

  // State for dropzone CSS toggling
  isHovering: boolean

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    setTimeout(() => (this.stateUp = 'in'), 30)
  }

  expandTile() {
    this.state = this.state === 'in' ? 'out' : 'in'
  }
  toggleHover(event: boolean) {
    this.isHovering = event
  }

  startUpload(event: FileList) {
    // The File object
    const file = event.item(0)

    // Client-side validation example
    if (file.type.split('/')[0] !== 'application') {
      console.error('unsupported file type :( ')
      return
    }

    // The storage path
    const path = `resumes/${new Date().getTime()}_${file.name}`

    // Totally optional metadata
    const customMetadata = { app: 'My AngularFire-powered PWA!' }

    // The main task
    this.task = this.storage.upload(path, file, { customMetadata })

    // Progress monitoring
    this.percentage = this.task.percentageChanges()
    this.snapshot = this.task.snapshotChanges()

    // get notified when the download URL is available
    this.task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          const fileRef = this.storage.ref(path)
          this.downloadURL = fileRef.getDownloadURL()
        })
      )
      .subscribe()

    this.snapshot = this.task.snapshotChanges().pipe(
      tap(snap => {
        if (snap.bytesTransferred === snap.totalBytes) {
          // Update firestore on completion
          this.db.collection('resumes').add({ path, size: snap.totalBytes })
        }
      })
    )
  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return (
      snapshot.state === 'running' &&
      snapshot.bytesTransferred < snapshot.totalBytes
    )
  }
}
