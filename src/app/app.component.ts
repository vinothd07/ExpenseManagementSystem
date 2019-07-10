import { Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ExpenseManagementSystem';
  isCollapsed = false;
  triggerTemplate: TemplateRef<void> | null = null;
  @ViewChild('trigger') customTrigger: TemplateRef<void>;


  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }
}
