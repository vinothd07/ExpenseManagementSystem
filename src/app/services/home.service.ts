import { Injectable } from '@angular/core';
import { Init } from './init.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService extends Init {

  constructor() {
    super();
    this.load();
  }

  Sum(array, key) {
    return array.reduce(function (r, a) {
      return r + a[key];
    }, 0);
  }
  SumByCategory(array, limit = 0) {
    let result = array.reduce(function (acc, val) {
      var o = acc.filter(function (obj) {
        return obj.name == val.Category;
      }).pop() || { name: val.Category, value: 0 };

      o.value += val.Amount;
      acc.push(o);
      return acc;
    }, []);

    // removing duplicates
    let finalresult = result.filter(function (itm, i, a) {
      return i == a.indexOf(itm);
    });
    let Limit = finalresult.filter(function (item) {
      return !!item;
    }).sort(function (a, b) {
      return parseInt(b.value) - parseInt(a.value);
    }).slice(0, limit);
    if (limit == 0) {
      return finalresult;
    }
    return Limit;


  }
  checkActiveStatus(status) {
    return status == true;
  }

  NormalSummary() {
    let expenses = JSON.parse(localStorage.getItem('Expense')) || [], budget = JSON.parse(localStorage.getItem('Budget'));
    expenses = expenses.filter(el => {
      return el.Active == true;
    });
    if (expenses.length > 0) {
      let totalExpenses = this.Sum(expenses, 'Amount');
      let resp = {
        Budget: budget.Amount,
        TotalExpense: totalExpenses
      };
      return resp;
    }
  }
  Top3Category() {
    let expenses = JSON.parse(localStorage.getItem('Expense')) || [];
    expenses = expenses.filter(el => {
      return el.Active == true;
    });
    if (expenses.length > 0) {
      let totalExpenses = this.SumByCategory(expenses, 5);
      return totalExpenses;
    }
  }
  CategoryWiseSummary() {
    let expenses = JSON.parse(localStorage.getItem('Expense')) || [];
    expenses = expenses.filter(el => {
      return el.Active == true;
    });
    if (expenses.length > 0) {
      let totalExpenses = this.SumByCategory(expenses, 0);
      return totalExpenses;
    }
  }



}
