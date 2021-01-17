import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category-form',
  templateUrl: './add-category-form.component.html',
  styleUrls: ['./add-category-form.component.scss']
})
export class AddCategoryFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddCategoryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}
  
  form: FormGroup;
  public submitted = false;

  ngOnInit() {
    this.initFormGroup();
  }

  initFormGroup(){
    this.form = this.formBuilder.group({
      CategoryName: ['', [Validators.required]]
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

    this.addCategory();
  }

  addCategory(){
    let formData = this.form.value;
    formData.CategoryId = this.data.formData.CategoryId;
    this.dataService.saveData('elasticsearch/addcategory', formData).subscribe((res) => {
      if(res && res.Code == 200) {
        this.dialogRef.close();
        this._snackBar.open("Category added successfully.", "Ok", {
          duration: 4000,
        });
      }
    });
  }
  
  cancel(): void {
    this.dialogRef.close("close");
  }

}
