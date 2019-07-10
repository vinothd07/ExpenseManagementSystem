import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  isCollapsed = false;
  UrlState = '/'
  constructor(private router:Router) { 
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.UrlState = e.url;
      
      }
    });
  }

  ngOnInit() {
  }

}
