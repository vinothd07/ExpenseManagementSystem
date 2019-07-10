import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense } from '../models/Expense';
import { ExpenseService } from '../services/expense.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {

  listOfExpenses: Expense[] = []
  constructor(public route: ActivatedRoute, private router: Router, private expenseService: ExpenseService, private alertService: AlertService) {
    this.route.queryParams.forEach(params => {
     this.GetExpense()
    });
  }

  ngOnInit() {
    console.log('expense component init')
    this.GetExpense();
  }
  ngOnChanges(){
    console.log('ngOnChange')
    this.GetExpense();
  }

  GetExpense() {
    this.listOfExpenses = this.expenseService.GetExpense() || [];
    console.log(this.listOfExpenses)
  }

  AddExpense() {
    this.router.navigateByUrl('/expense/add');
  }

  DeleteExpense(index) {
    this.expenseService.DeleteExpense(index, false)
    this.alertService.success('Expense removed.!');
    this.GetExpense();
  }

  cancelAction() {
    console.log('Action cancelled!')
  }

  RestoreExpense(index) {
    this.expenseService.UndoExpense(index, true)
    this.alertService.success('Expense restored.!');
    this.GetExpense();
  }


}
