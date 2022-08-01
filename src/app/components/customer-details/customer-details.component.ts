import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface Customer {
  name: string;
  phoneNo: string;
}

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  isAssign = false;
  isEdit = true;
  isRead = false;
  search =  new FormControl('');
  customerData: any;
  selectedCustomer:any;
  options:Customer[] = [
    { phoneNo:"8903663663",name:"Chandra Rai" },
    { phoneNo:"8902122663",name:"Vikas Gouda" },
    { phoneNo:"9036636122",name:"Varma DK" },
    { phoneNo:"8903663663",name:"Siva SK" },
    { phoneNo:"8998883663",name:"Mahesh PK" },
    { phoneNo:"9701222178",name:"Chandra Rai" }
  ];
  filteredOptions!: Observable<Customer[]>;
  constructor(
    private activedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
   this.activedRoute.queryParams.subscribe(data=>{
    this.customerData = data;
      console.log(this.customerData);
   })


    this.filteredOptions = this.search.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }
  displayFn(user: Customer): string {
    return user && user.name ? user.name : '';
  }
  private _filter(value: string): Customer[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option =>
      option.name.toLowerCase().includes(filterValue) ||
      option.phoneNo.toLowerCase().includes(filterValue)
      );
  }

  updateMySelection(option:any,event:any){
    if(event.isUserInput){
      this.selectedCustomer = option;
    }
  }

  assignTo(){
   this.isAssign = true;
   this.isEdit = false;
   this.isRead = true;
   setTimeout(()=>{
    document.getElementById('assign')?.click();
   },1000)
  }

}
