import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatChipInputEvent } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.component.html',
  styleUrls: ['./service-request.component.scss']
})
export class ServiceRequestComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ServiceRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) {}
  
  form: FormGroup;
  public submitted = false;

  ngOnInit() {
    this.initFormGroup();
  }

  initFormGroup(){
    this.form = this.formBuilder.group({
      issue: ['', [Validators.required]],
      description: [''], 
      priority: [''],
      assignTo: ['']
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

    this.createRequest();
  }

  createRequest(){
    //this.form.setValue({...this.form.value, KeywordList: this.keywords });
    let formData = this.form.value;
    this.dialogRef.close();
    alert("Your service request has been submitted.");
  }
  
  cancel(): void {
    this.dialogRef.close();
  }

}
