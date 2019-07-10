import { Injectable } from '@angular/core';
import { Budget } from '../models/budget';
import { Init } from './init.service';

@Injectable({
  providedIn: 'root'
})
export class BudgetService extends Init {

  constructor() {
    super();
    this.load();
  }

  GetBudget() {
    return JSON.parse(localStorage.getItem('Budget'));
  }

  UpdateBudget(Budget: Budget) {
    localStorage.setItem('Budget', JSON.stringify(Budget));
  }
}
