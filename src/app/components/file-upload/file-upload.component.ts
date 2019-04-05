import { Component, OnInit } from '@angular/core'
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage'
import { Observable } from 'rxjs/Observable'
import { AngularFirestore } from '@angular/fire/firestore'
import { tap, finalize } from 'rxjs/operators'
import { AuthenticateService } from 'src/app/services/authenticate.service'

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
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
    private db: AngularFirestore
  ) {}

  toggleHover(event: boolean) {
    this.isHovering = event
  }

  startUpload(event: FileList) {
    // The File object
    const file = event.item(0)

    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ')
      return
    }

    // The storage path
    const path = `photos/${new Date().getTime()}_${file.name}`

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
          this.db.collection('photos').add({ path, size: snap.totalBytes })
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
