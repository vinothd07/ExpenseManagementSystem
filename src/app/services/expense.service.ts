import { Injectable } from '@angular/core';
import { Expense } from '../models/Expense';
import { Init } from './init.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService extends Init {

  constructor() {
    super();
    this.load();
  }
  GetExpense() {
    return JSON.parse(localStorage.getItem('Expense'));
  }
  GetExpenseByIndex(index) {
    let expenses = JSON.parse(localStorage.getItem('Expense'));
    return expenses[index];  
  }
  AddExpense(Expense: Expense) {
    let expense = JSON.parse(localStorage.getItem('Expense')) || [];
    console.log(expense)
    expense.push(Expense);
    localStorage.setItem('Expense', JSON.stringify(expense));
  }
  UpdateExpense(index, Expense: Expense) {
    let expenses = JSON.parse(localStorage.getItem('Expense'));
    expenses[index].Category = Expense.Category;
    expenses[index].Item = Expense.Item;
    expenses[index].Amount = Expense.Amount;
    localStorage.setItem('Expense', JSON.stringify(expenses));
  }
  DeleteExpense(index, active = false) {
    let Expense = JSON.parse(localStorage.getItem('Expense'));
    Expense[index].Active = active;
    localStorage.setItem('Expense', JSON.stringify(Expense));
  }
  UndoExpense(index, active = true) {
    let Expense = JSON.parse(localStorage.getItem('Expense'));
    Expense[index].Active = active;
    localStorage.setItem('Expense', JSON.stringify(Expense));
  }
}
