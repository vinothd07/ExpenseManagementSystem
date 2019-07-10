import { Component, OnInit } from '@angular/core';
import { Expense } from '../models/Expense';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
import { ExpenseService } from '../services/expense.service';
import { AlertService } from '../services/alert.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit {
  CurrentDate: string = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
  ExpenseForm: FormGroup;
  Expense: Expense = {
    Category: '',
    Item: '',
    Amount: 0,
    ExpenseDate: this.CurrentDate,
    Active: true
  }
  CategoryList: Category[] = []

  formatterRupee = (value: Expense['Amount']) => `₹ ${value}`;
  parserRupee = (value: string) => value.replace('₹ ', '');

  constructor(private fb: FormBuilder, private categoryservice: CategoryService, private expenseService: ExpenseService, private alertService: AlertService,
    private datePipe: DatePipe, private router: Router) { }

  ngOnInit() {
    this.GetCategory();
    this.ExpenseForm = this.fb.group({
      Category: ['', [Validators.required]],
      Item: ['', [Validators.required]],
      Amount: [0, [Validators.required]]
    });
  }

  GetCategory() {
    this.CategoryList = this.categoryservice.GetCategory() || [];
  }

  AddExpense() {
    for (const i in this.ExpenseForm.controls) {
      this.ExpenseForm.controls[i].markAsDirty();
      this.ExpenseForm.controls[i].updateValueAndValidity();
    }
    if (this.ExpenseForm.valid) {
      this.expenseService.AddExpense(this.Expense);
      this.alertService.success('New expense added.!');
      this.ExpenseForm.reset();
      this.router.navigate(['/expense'], { queryParams: { value: true } });
    }
  }

}
