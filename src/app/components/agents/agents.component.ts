import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';

import {Agent} from '../tvamInterface';
import {CountryService} from '../agentData.service';
import {NgbdSortableHeader, SortEvent} from '../agentData.directive';
import { AGENTS } from '../tvamData';

interface Interface {
  value: string;
}

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css'],
  providers: [CountryService, DecimalPipe]
})
export class AgentsComponent implements OnInit {
  agentsData$: Observable<Agent[]>;
  total$: Observable<number>;
  filteredData:Array<any> = [];
  startCount :any;
  endCount :any;
  filteredDatawithState:Array<any> = [];
  state:any;
  district:any;
  allData = AGENTS;

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

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  constructor(public service: CountryService) {
    this.agentsData$ = service.agents$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
    this.agentsData$.subscribe(res=>{
      if(res?.length !=0){
        this.filteredData = res;
        this.startCount = this.filteredData[0].id;
        this.endCount = this.filteredData[this.filteredData?.length - 1]?.id;
      }
     });
    //  console.log(this.actualData);
  }
onSelectState(data:any){
  this.state = data?.value ? data?.value : '';
  this.onSelectFilter();
}
onSelectDistrict(data:any){
  this.district = data?.value ? data?.value : '';
  this.onSelectFilter();
}

onSelectFilter(){
  this.filteredDatawithState = [];
  this.allData?.forEach((ele:any)=>{
    var constantState = ele.state?.toLowerCase();
    var changingState = this.state?.toLowerCase();
    var constantDistrict = ele.district?.toLowerCase();
    var changingDistrict = this.district?.toLowerCase();
    if(constantState === changingState){
      this.filteredDatawithState.push(ele);
    }
    if(constantDistrict === changingDistrict){
      this.filteredDatawithState.push(ele);
    }
  })
  console.log(this.filteredDatawithState);
}

  getPageSymbol(current: number) {
    return ['01', '02', '03', '04', '05', '06', '07'][current - 1];
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
