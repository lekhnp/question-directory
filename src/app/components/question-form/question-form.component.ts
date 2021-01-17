import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatChipInputEvent } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { LoadingService } from '../../services/loading.service';

export interface Keyword {
  keyText: string;
}

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<QuestionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private loader: LoadingService
  ) {}

  answerEditorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '70px',
    maxHeight: '260px',
  };
  
  form: FormGroup;
  public submitted = false;
  private context = {
    create: 'elasticsearch/insert',
    updateMap: 'elasticsearch/updatequestionmapping'
  }

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  keywords: Keyword[] = [];

  ngOnInit() {
    this.initFormGroup();
  }

  initFormGroup(){
    this.form = this.formBuilder.group({
      QuestionText: ['', [Validators.required]],
      Answer: [''],
      KeywordList: [[]],
      Category: [this.data.formData.currentCategory.CategoryName],
      SubCategory: [''],
      UpdatedDate: [],
      Weightage: ['', [Validators.min(1), Validators.max(100)]],
      HitCount: [0],
      RelatedQuestions: [[]]
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.keywords.push({ keyText: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(keyword: Keyword): void {
    const index = this.keywords.indexOf(keyword);

    if (index >= 0) {
      this.keywords.splice(index, 1);
    }
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

    this.createQuestion();
  }

  createQuestion(){
    this.loader.show();
    //this.form.setValue({...this.form.value, KeywordList: this.keywords });
    let formData = this.form.value;
    formData.KeywordList = this.keywords;
    
    if(this.field.Category.value){
      formData.Category = {
        CategoryId: this.data.formData.currentCategory.CategoryId,
        CategoryName: this.data.formData.currentCategory.CategoryName,
      };
    } else {
      formData.Category = {
        CategoryId: '',
        CategoryName: '',
      };
    }
    
    if(this.field.SubCategory.value){
      formData.SubCategory = {
        SubCategoryId: '1',
        SubCategoryName: this.field.SubCategory.value,
      };
    } else {
      formData.SubCategory = {
        SubCategoryId: '',
        SubCategoryName: '',
      };
    }

    if(this.data.formData.ParentQuestionId){
      formData.ParentQuestion = {
        ParentQuestionId: this.data.formData.ParentQuestionId,
        ParentQuestionText: this.data.formData.ParentQuestionText
      }
    }

    if(this.data.formData.ParentQuestionLevel){
      formData.QuestionLevel = +this.data.formData.ParentQuestionLevel+1;
    } else {
      formData.QuestionLevel = 1;
    }

    this.dataService.saveData(this.context.create,formData).subscribe((res) => {
      if(res && res.Response.Code == 200){
        if(this.data.formData.ParentQuestionId){
          let dataMap = {
            ParentQuestionId: this.data.formData.ParentQuestionId,
            RelatedQuestions: {...formData},
          }
          dataMap.RelatedQuestions.QuestionId = res.QuestionId;
          this.dataService.saveData(this.context.updateMap,dataMap).subscribe((mapResp) => {
            this.loader.hide();
            if(mapResp.Code) {
              this.router.navigate(['/details',this.data.formData.ParentQuestionId]);
              this.dataService.setSubQuesStatus();
              alert("Document created successfully.");
              this.dialogRef.close();
            }
          });
        } else {
          this.loader.hide();
          this.router.navigate(['/details',res.QuestionId]);
          alert("Document created successfully.");
          this.dialogRef.close();
        }
        this.dataService.setMostViewedStatus();
        this.dataService.setQuestionCount();
      }
    });
  }
  
  cancel(): void {
    this.dialogRef.close();
  }

}
