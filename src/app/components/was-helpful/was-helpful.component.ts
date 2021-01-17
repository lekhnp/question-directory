import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../services/loading.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-was-helpful',
  templateUrl: './was-helpful.component.html',
  styleUrls: ['./was-helpful.component.scss']
})
export class WasHelpfulComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private loader: LoadingService,
    private _snackBar: MatSnackBar
  ) { }

  @Input() currentQuestion: string;
  user = this.dataService.getSessionObj().user;
  activityId = this.dataService.getSessionObj().activityId;
  form: FormGroup;
  public submitted = false;

  ngOnInit() {
    this.initFormGroup();
  }

  initFormGroup(){
    this.form = this.formBuilder.group({
      Rating: [''],
      isSuggestion: []
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
    // if(formData.Rating == 0){
    //   this.loader.show();
    // }
    formData.UserId = this.user.userData.UserId;
    formData.ActivityId = this.activityId;
    delete formData.isSuggestion;
    formData.ActivityText = this.formatActivityText();
    if(rating) {
      formData.Rating = rating; 
    }
    this.dataService.saveData('feedback/insert', formData).subscribe((res) => {
      if(this.submitted) {
        this.router.navigate(['/search']);
        this._snackBar.open("Thanks for your message. we will get back to you soon.", "Close", {
          duration: 4000,
        });
        //this.form.reset();
      } else {
        this.dataService.setLocalStorageObj({activityId:""});
        this.router.navigate(['/search']); 
        this._snackBar.open("Thanks for your feedback.", "Close", {
          duration: 4000,
        });
      }
    });
  }

  formatActivityText(){
    let breadcrumbs = ['Home'];
    this.dataService.breadcrumbData.subscribe((data) => {
      let list = data.map((obj) => {
        return obj.questionText;
      });
      breadcrumbs = breadcrumbs.concat(list);
    });
    breadcrumbs.push(this.currentQuestion);
    return breadcrumbs.join(' #@ ');
  }

  sendImprovement(){
    if(this.field.isSuggestion.value) {
      setTimeout(() => {
        this.router.navigate(['/search']); 
        this._snackBar.open("Thanks for your contribution in improving the Q&A content, Our team will reach out to you soon.", "Close", {
          duration: 4000,
        });
      }, 500);
      
    }
  }

}
