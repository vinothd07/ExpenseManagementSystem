import { Budget } from '../models/budget';

export class Init {
    load() {
        if (localStorage.getItem('Budget') === null || localStorage.getItem('Budget') == undefined) {
            console.log('No Budget Found... Creating...');
            let Budget: Budget = {
                Amount: 0
            };
            localStorage.setItem('Budget', JSON.stringify(Budget));
            return
        } else {
            console.log('Found Budget...');
        }

        if (localStorage.getItem('Category') === null || localStorage.getItem('Category') == undefined) {
            console.log('No Category Found... Creating...');
            let Category = [];

            localStorage.setItem('Category', JSON.stringify(Category));
            return
        } else {
            console.log('Found Category...');
        }

        if (localStorage.getItem('Expense') === null || localStorage.getItem('Expense') == undefined) {
            console.log('No Expense Found... Creating...');
            let Expense = [];

            localStorage.setItem('Expense', JSON.stringify(Expense));
            return
        } else {
            console.log('Found Expense...');
        }
    }
}