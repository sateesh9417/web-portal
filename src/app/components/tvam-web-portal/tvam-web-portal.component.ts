import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-tvam-web-portal',
  templateUrl: './tvam-web-portal.component.html',
  styleUrls: ['./tvam-web-portal.component.css']
})
export class TvamWebPortalComponent implements OnInit,AfterViewInit {

  dropdown = true;
  isAgents = false;
  isLoanApp = false;
  isDashboard = false;

  constructor(
    private route: Router,
    private cdf: ChangeDetectorRef
  ) { }

  ngAfterViewInit() {
    this.onRouterChange();
    // nabar enable / disable function
    this.route.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
            this.onRouterChange();
        }
    });
    this.cdf.detectChanges();
}

  ngOnInit(): void {
  }

  onRouterChange(){
    if(this.route.url == '/web-portal'){
     this.isDashboard = true;
     this.isLoanApp = false;
     this.isAgents = false;
    }else if(this.route.url == '/web-portal/loan-app' || this.route.url.includes('/web-portal/customer-details')){
      this.isDashboard = false;
      this.isLoanApp = true;
      this.isAgents = false;
    }else if(this.route.url.includes('/web-portal/agents')){
      this.isDashboard = false;
      this.isLoanApp = false;
      this.isAgents = true;
    }
  }
  logout(){
    this.dropdown = !this.dropdown;
  }

}
