import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Budget } from '../models/budget';
import { Category } from '../models/category';
import { BudgetService } from '../services/budget.service';
import { AlertService } from '../services/alert.service';
import { CategoryService } from '../services/category.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  BudgetForm: FormGroup;
  CategoryForm: FormGroup;
  nzTabPosition: string = 'left';
  CurrentDate: string = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
  selectedIndex = 0;
  Budget: Budget = {
    Amount: 0
  };
  Category: Category = {
    Name: '',
    CreatedAt: this.CurrentDate,
    Active: true
  };

  listOfCategories: Category[] = [];

  formatterRupee = (value: number) => `₹ ${value}`;
  parserRupee = (value: string) => value.replace('₹ ', '');

  log(args: any[]): void {
    console.log(args);
  }

  constructor(private fb: FormBuilder, private budgetService: BudgetService, private alertService: AlertService, private categoryservice: CategoryService,
    private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.BudgetForm = this.fb.group({
      BudgetAmount: [null, [Validators.required]]
    });
    this.CategoryForm = this.fb.group({
      CategoryName: [null, [Validators.required]]
    });
    this.GetBudget();
    this.GetCategory();
  }

  GetBudget() {
    this.Budget = this.budgetService.GetBudget() || this.Budget;
    console.log(this.Budget);
  }

  UpdateBudget() {
    for (const i in this.BudgetForm.controls) {
      this.BudgetForm.controls[i].markAsDirty();
      this.BudgetForm.controls[i].updateValueAndValidity();
    }
    if (this.BudgetForm.valid) {
      this.budgetService.UpdateBudget(this.Budget);
      this.alertService.success('Budget amount updated.!');
    } else {
      this.alertService.error('Enter the budget amount.!');
    }
  }



  GetCategory() {
    this.listOfCategories = this.categoryservice.GetCategory() || [];
    console.log(this.listOfCategories);
  }

  addCategory() {
    for (const i in this.CategoryForm.controls) {
      this.CategoryForm.controls[i].markAsDirty();
      this.CategoryForm.controls[i].updateValueAndValidity();
    }
    if (this.CategoryForm.valid) {
      this.categoryservice.AddCategory(this.Category);
      this.alertService.success('New Category Added.!');
      this.CategoryForm.reset();
      this.GetCategory();
    } else {
      this.alertService.error('Enter the Category name.!');
    }
  }

  DeleteCategory(index) {
    this.categoryservice.DeleteCategory(index, false)
    this.alertService.success(this.listOfCategories[index].Name + ' Category removed.!');
    this.GetCategory();
  }

  cancelAction() {
    console.log('Action cancelled!')
  }

  UndoCategory(index) {
    this.categoryservice.UndoCategory(index, true)
    this.alertService.success(this.listOfCategories[index].Name + ' Category restored.!');
    this.GetCategory();
  }

}
