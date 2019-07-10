import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Expense } from '../models/Expense';
import { Category } from '../models/category';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseService } from '../services/expense.service';
import { CategoryService } from '../services/category.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.scss']
})
export class EditExpenseComponent implements OnInit {
  ID;
  ExpenseForm: FormGroup;
  Expense: Expense = {
    Category: '',
    Item: '',
    Amount: 0,
    ExpenseDate: '',
    Active: true
  }
  CategoryList: Category[] = []
  constructor(public route: ActivatedRoute, private fb: FormBuilder, private expenseService: ExpenseService, private categoryservice:CategoryService,
    private alertService:AlertService, private router:Router) {

  }

  ngOnInit() {
    this.ID = this.route.snapshot.paramMap.get('id');
    this.GetCategory();
    this.GetExpenseByIndex(this.ID)
    this.ExpenseForm = this.fb.group({
      Category: [null, [Validators.required]],
      Item: [null, [Validators.required]],
      Amount: [null, [Validators.required]]
    });
  }

  GetCategory() {
    this.CategoryList = this.categoryservice.GetCategory() || [];
  }

  GetExpenseByIndex(index) {
    this.Expense = this.expenseService.GetExpenseByIndex(index);
  }

  UpdateExpense(){
    for (const i in this.ExpenseForm.controls) {
      this.ExpenseForm.controls[i].markAsDirty();
      this.ExpenseForm.controls[i].updateValueAndValidity();
    }
    if (this.ExpenseForm.valid) {
      this.expenseService.UpdateExpense(this.ID, this.Expense);
      this.alertService.success('Expense updated.!');
      this.router.navigate(['/expense'], { queryParams: { value: true } });
    }
  }

  formatterRupee = (value: Expense['Amount']) => `₹ ${value}`;
  parserRupee = (value: string) => value.replace('₹ ', '');

}
