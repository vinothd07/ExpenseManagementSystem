import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ExpenseComponent } from './expense/expense.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { EditExpenseComponent } from './edit-expense/edit-expense.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'expense', component: ExpenseComponent,
    children: [
      {
        path: 'add',
        component: AddExpenseComponent
      },
      {
        path: 'edit/:id',
        component: EditExpenseComponent
      }
    ]
  },
  {
    path: 'settings', component: SettingsComponent
  },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
