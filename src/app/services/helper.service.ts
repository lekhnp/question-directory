import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { QuestionFormComponent } from '../components/question-form/question-form.component';
import { ServiceRequestComponent } from '../components/service-request/service-request.component';
import { FeedbackFormComponent } from '../components/feedback-form/feedback-form.component';
import { AddCategoryFormComponent } from '../components/add-category-form/add-category-form.component';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(public dialog: MatDialog) {}

  openFormDialog(dialogData:any): any {
    const dialogRef = this.dialog.open(QuestionFormComponent, {
      width: '800px',
      backdropClass: 'dialogBg',
      disableClose: true,
      data: {
        formData: dialogData
      }
    });

    return dialogRef.afterClosed();
  }

  openServiceRequestForm(dialogData:any): any {
    const dialogRef = this.dialog.open(ServiceRequestComponent, {
      width: '800px',
      backdropClass: 'dialogBg',
      disableClose: true,
      data: {
        formData: dialogData
      }
    });

    return dialogRef.afterClosed();
  }

  openAddCategoryForm(dialogData:any): any {
    const dialogRef = this.dialog.open(AddCategoryFormComponent, {
      width: '500px',
      backdropClass: 'dialogBg',
      disableClose: true,
      data: {
        formData: dialogData
      }
    });

    return dialogRef.afterClosed();
  }

  openFeedbackForm(dialogData:any): any {
    const dialogRef = this.dialog.open(FeedbackFormComponent, {
      width: '500px',
      backdropClass: 'dialogBg',
      disableClose: true,
      data: {
        formData: dialogData
      }
    });

    return dialogRef.afterClosed();
  }
}
