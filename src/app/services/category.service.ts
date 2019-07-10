import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { Init } from './init.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends Init{

  constructor() { 
    super();
    this.load();
  }

  GetCategory() {
    return JSON.parse(localStorage.getItem('Category'));
  }
  AddCategory(Category: Category) {
    let category = JSON.parse(localStorage.getItem('Category')) || [];
    category.push(Category);
    localStorage.setItem('Category', JSON.stringify(category));
  }
 
  DeleteCategory(index, active=false) {
    let category = JSON.parse(localStorage.getItem('Category'));
    category[index].Active = active;
    localStorage.setItem('Category', JSON.stringify(category));
  }
  UndoCategory(index, active=true) {
    let category = JSON.parse(localStorage.getItem('Category'));
    category[index].Active = active;
    localStorage.setItem('Category', JSON.stringify(category));
  }
}
