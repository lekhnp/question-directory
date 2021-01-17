import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FeedbackFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) {}
  
  user = this.dataService.getSessionObj().user;
  activityId = this.dataService.getSessionObj().activityId;
  form: FormGroup;
  public submitted = false;

  ngOnInit() {
    this.initFormGroup();
  }

  initFormGroup(){
    this.form = this.formBuilder.group({
      Rating: ['', [Validators.required]],
      Comment: [''],
    });
  }

  hasError(formName: string, errorName: string){
    return this.form.controls[formName].hasError(errorName);
  }

  // convenience getter for easy access to form fields
  get field() { return this.form.controls; }

  onSubmit(){
    if(this.form.invalid){
      return;
    }
    this.submitted = true;

    this.sendFeedback();
  }

  sendFeedback(rating?:any){
    let formData = this.form.value;
    formData.UserId = this.user.userData.UserId;
    formData.ActivityId = this.activityId;
    if(rating) {
      formData.Rating = rating;
    }
    this.dataService.saveData('feedback/insert', formData).subscribe((res) => {
      if(!rating) {
        alert("Your feedback has been submitted.");
        this.dialogRef.close();
      }
    });
  }
  
  cancel(): void {
    this.sendFeedback(2);
    this.dialogRef.close();
  }

}
