import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {Agent} from './tvamInterface';
import {AGENTS} from './tvamData';
import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {SortColumn, SortDirection} from './agentData.directive';

interface SearchResult {
  agents: Agent[];
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

function sort(agents: Agent[], column: SortColumn, direction: string): Agent[] {
  if (direction === '' || column === '') {
    return agents;
  } else {
    return [...agents].sort((a:any, b:any) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(agent: Agent, term: string, pipe: PipeTransform) {
  return agent.agentName.toLowerCase().includes(term.toLowerCase())
    || agent.phoneNo.toLowerCase().includes(term.toLowerCase())
    || agent.agentId.toLowerCase().includes(term.toLowerCase())
    || agent.district.toLowerCase().includes(term.toLowerCase())
    || agent.state.toLowerCase().includes(term.toLowerCase())
    || agent.referrer.toLowerCase().includes(term.toLowerCase())
    || agent.assignedApp.toLowerCase().includes(term.toLowerCase());
}

@Injectable({providedIn: 'root'})
export class CountryService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _countries$ = new BehaviorSubject<Agent[]>([]);
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
      this._countries$.next(result.agents);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get agents$() { return this._countries$.asObservable(); }
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
    let agents = sort(AGENTS, sortColumn, sortDirection);

    // 2. filter
    agents = agents.filter(country => matches(country, searchTerm, this.pipe));
    let total = agents.length;

    // 3. paginate
    agents = agents.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({agents, total});
  }
}
