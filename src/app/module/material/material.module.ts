import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import * as Material from '@angular/material'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Material.MatTableModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatCardModule,
    Material.MatButtonModule,
    Material.MatProgressSpinnerModule,
    Material.MatCheckboxModule,
    Material.MatRadioModule,
    Material.MatToolbarModule,
    Material.MatMenuModule,
    Material.MatDividerModule,
    Material.MatListModule,
    Material.MatIconModule,
    Material.MatGridListModule,
    Material.MatSelectModule,
    Material.MatDatepickerModule,
    Material.MatNativeDateModule,
    Material.MatDialogModule,
    Material.MatPaginatorModule,
    Material.MatSortModule,
    Material.MatStepperModule,
    Material.MatTabsModule,
  ],
  exports: [
    Material.MatTableModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatCardModule,
    Material.MatButtonModule,
    Material.MatProgressSpinnerModule,
    Material.MatCheckboxModule,
    Material.MatRadioModule,
    Material.MatToolbarModule,
    Material.MatMenuModule,
    Material.MatDividerModule,
    Material.MatListModule,
    Material.MatIconModule,
    Material.MatGridListModule,
    Material.MatSelectModule,
    Material.MatDatepickerModule,
    Material.MatNativeDateModule,
    Material.MatDialogModule,
    Material.MatPaginatorModule,
    Material.MatSortModule,
    Material.MatStepperModule,
    Material.MatTabsModule,
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
  ],
})
export class MaterialModule {}
