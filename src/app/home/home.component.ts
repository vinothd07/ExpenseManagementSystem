import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  TotalBudget = '-';
  TotalExpense = '-';
  NormalSummary: any = []
  BudgetSummary: any[] = [
    {
      "name": "Budget",
      "value": 1000000
    },
    {
      "name": "Expense",
      "value": 900000
    },
    ,
    {
      "name": "Balance",
      "value": 100000
    }
  ];
  Top3Category: any[] = [{
    "name": "Budget",
    "value": 1000000
  },
  {
    "name": "Expense",
    "value": 900000
  },
  {
    "name": "Germany",
    "value": 8940000
  }]
  CategoryWiseSummary: any[] = []

  // Chart options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = '';
  showYAxisLabel = true;
  yAxisLabel = '';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#A10B28']
  };

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.GetNormalSummary();
    this.GetTop3Category();
    this.GetBudgetSummary();
    this.getCategoryWiseSummary();
  }

  GetNormalSummary() {
    let summary = this.homeService.NormalSummary();
    this.TotalBudget = 'Rs ' + summary.Budget;
    this.TotalExpense = 'Rs ' + summary.TotalExpense;
    this.NormalSummary = [{
      "name": "Balance Budget",
      "value": (summary.Budget - summary.TotalExpense)
    },
    {
      "name": "Total Expense",
      "value": summary.TotalExpense
    }]
  }
  GetTop3Category() {
    this.Top3Category = [];
    let summary = this.homeService.Top3Category();
    this.Top3Category = summary;
    console.log(this.Top3Category)
  }

  GetBudgetSummary() {
    let summary = this.homeService.NormalSummary();
    this.BudgetSummary = [{
      "name": "Total Budget",
      "value": summary.Budget
    },
    {
      "name": "Total Expense",
      "value": summary.TotalExpense
    },
    {
      "name": "Balance",
      "value": (summary.Budget - summary.TotalExpense)
    }]
  }

  getCategoryWiseSummary() {
    let summary = this.homeService.CategoryWiseSummary();
    console.log(summary)
    this.CategoryWiseSummary = summary;
  }


}
