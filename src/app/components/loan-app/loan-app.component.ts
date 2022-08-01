import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';

import {LoanData} from '../tvamInterface';
import {LoanDataService} from '../loanData.service';
import {NgbdSortableHeader, SortEvent} from '../loanData.directive';
import { LOANDATA } from '../tvamData';
import { Router } from '@angular/router';

interface Interface {
  value: string;
}

@Component({
  selector: 'app-loan-app',
  templateUrl: './loan-app.component.html',
  styleUrls: ['./loan-app.component.css'],
  providers: [LoanDataService, DecimalPipe]
})
export class LoanAppComponent implements OnInit {
  loanData$: Observable<LoanData[]>;
  total$: Observable<number>;
  filteredData:any;
  startCount :any;
  endCount :any;
  popoverData:any;

  states: Interface[] = [
    {value: 'Andhra Pradesh'},
    {value: 'Tamilnadu'},
    {value: 'Karnataka'}
  ];

  districts: Interface[] = [
    {value: 'Tirupati'},
    {value: 'Bengaluru'},
    {value: 'Chennai'}
  ];

  status: Interface[] = [
    {value: 'Show All'},
    {value: 'New Application'},
    {value: 'Not Assigned'},
    {value: 'Assigned'},
    {value: 'Completed'}
  ];

  objs = [
    { state: 'Tamilnadu', district: 'Bengaluru', city:'mejistic' },
    { state: 'Andhra Pradesh', district: 'Tirupati', city:'srikalahasti' },
    { state: 'Andhra Pradesh', district: 'Nellore', city:'kovuru' },
    { state: 'Karnataka', district: 'Chennai', city:'redhills' }
  ];

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  constructor(
    public service: LoanDataService,
    private route:Router
    ) {
    this.loanData$ = service.countries$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
    this.loanData$.subscribe(res=>{
     this.filteredData = res;
     if(this.filteredData?.length !=0){
       this.startCount = this.filteredData[0].id;
       this.endCount = this.filteredData[this.filteredData?.length - 1]?.id;
     }
    });
    this.objs.sort((a,b)=>{
      if(a.state > b.state) return 1;
      if(a.state < b.state) return -1;
      if(a.district > b.district) return 1;
      if(a.district < b.district) return -1;
      if(a.city > b.city) return 1;
      if(a.city < b.city) return -1;
      return 0;
    });
    console.log(this.objs);

  }

  getPageSymbol(current: number) {
    return ['01', '02', '03', '04', '05', '06', '07'][current - 1];
  }

  onClickReferenceNo(data:any){
    this.route.navigate(['/web-portal/customer-details'],{queryParams:data})
  }

  popoverClick(data:any){
    this.popoverData = data;
  }

  onSort({column, direction}: any) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

}
