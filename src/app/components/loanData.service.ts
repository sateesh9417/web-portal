import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {LoanData} from './tvamInterface';
import {LOANDATA} from './tvamData';
import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {SortColumn, SortDirection} from './loanData.directive';

interface SearchResult {
  loanAppData: LoanData[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(loanAppData: LoanData[], column: SortColumn, direction: string): LoanData[] {
  if (direction === '' || column === '') {
    return loanAppData;
  } else {
    return [...loanAppData].sort((a:any, b:any) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(data: LoanData, term: string, pipe: PipeTransform) {
  return data.customerName.toLowerCase().includes(term.toLowerCase())
  || pipe.transform(data.loanAmount).includes(term)
  || data.referenceNo.toLowerCase().includes(term.toLowerCase())
  || data.phoneNo.toLowerCase().includes(term.toLowerCase())
  || data.referrer.toLowerCase().includes(term.toLowerCase())
  || data.assignedTo.toLowerCase().includes(term.toLowerCase())
  || data.bank.toLowerCase().includes(term.toLowerCase());
}

@Injectable({providedIn: 'root'})
export class LoanDataService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _countries$ = new BehaviorSubject<LoanData[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 5,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private pipe: DecimalPipe) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._countries$.next(result.loanAppData);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get countries$() { return this._countries$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let loanAppData = sort(LOANDATA, sortColumn, sortDirection);

    // 2. filter
    loanAppData = loanAppData.filter(loanData => matches(loanData, searchTerm, this.pipe));
    const total = loanAppData.length;

    // 3. paginate
    loanAppData = loanAppData.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({loanAppData, total});
  }
}
