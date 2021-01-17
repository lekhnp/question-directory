import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { UserData } from '../../data/user-data';
import { LoadingService } from '../../services/loading.service';

const uuid = require('uuid/v4');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private dataService: DataService,
    private route: ActivatedRoute,
    private loader: LoadingService
  ) { 
    this.dataService.setViewState('');
  }

  loginForm: FormGroup;
  public submitted = false;
  usersObj:any;
  backgroundClasses = ['bg-theme-1', 'bg-theme-2', 'bg-theme-3', 'bg-theme-4'];
  randomNumber: number;

  ngOnInit() {
    this.initForm();
    this.loadUser();
    this.setRandomNumber();
  }

  // ngAfterViewChecked(){
  //   this.loader.hide();
  // }

  ngOnDestroy(){
    this.loader.show();
  }

  setRandomNumber() {
    this.randomNumber = Math.floor(Math.random() * 4);
    console.log("this.randomNumber: ", this.randomNumber);
  }

  hasError(formName: string, errorName: string){
    return this.loginForm.controls[formName].hasError(errorName);
  }

  // convenience getter for easy access to form fields
  get field() { return this.loginForm.controls; }

  onSubmit(){
    if(this.loginForm.invalid){ 
      return;
    }
    this.login();
  }

  login(){
    this.submitted = true;
    let formData = this.loginForm.value;
    this.dataService.setLocalStorageObj({ user: formData });
    if(formData.role == 'operator'){
      let activityId = uuid();
      this.dataService.setLocalStorageObj({activityId:activityId});
    }
    this.router.navigate(['/search']);
  }

  loadUser(){
    this.dataService.getData('elasticsearch/getusers').subscribe((res) => {
      this.loader.hide();
      if(res && res.Response.Code == 200) {
        this.usersObj = res.lstUsers;
      }
    })
  }

  initForm(){
    this.loginForm = this.formBuilder.group({
      userData: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]]
    });
  }

}
